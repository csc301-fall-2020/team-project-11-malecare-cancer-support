# import functools
import functools
import sys

# import pymongo
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_login import LoginManager, current_user, login_required, login_user, \
    logout_user
from flask_socketio import SocketIO, disconnect

from .config import Configuration
from ..usecases import administrator_filter_helpers, \
    customize_user_profile_helpers, delete_helpers, friend_handler_helpers, \
    handle_report_helpers, handle_session_info_helpers, login_register_helpers, \
    match_helpers, message_handle_helper, preload_data_helpers, \
    reset_password_helpers

from ..util import helpers
from .login_page import login_page
login_manager = LoginManager()

app = Flask(__name__, static_folder='../../frontend/build/static',
            template_folder='../../frontend/build/')
# app.config["SECRET_KEY"] = 'my secret'
app.config.from_object(Configuration)
login_manager.init_app(app)
CORS(app)
socketio = SocketIO(app, manage_session=False, cors_allowed_origins="*")

SOCKET_ERROR_MSG = "Something was wrong."
SOCKET_ON_SUCCESS_MSG = "Successfully sent"

app.register_blueprint(login_page)

# decorator for limiting access of admin-only api
def admin_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_administrator():
            return "Need to be admin", 401
        return f(*args, **kwargs)

    return wrapped


def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            disconnect()
        else:
            return f(*args, **kwargs)

    return wrapped


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/<path:path>")
def serve(path):
    return render_template('index.html')


# this is only for initializing empty database,
# data can be found under backend/app/database_preload_backup/
@app.route('/load_to_db', methods=['POST'])
def load_to_db():
    return preload_data_helpers \
        .load_to_cancer_type_db(
        cancer_type_lst=request.get_json()["cancer_types"],
        treatment_lst=request.get_json()["treatment_types"],
        sexual_orientation_lst=request.get_json()["sexual_orientations"],
        gender_lst=request.get_json()["genders"],
        medication_lst=request.get_json()["medications"],
    )


@app.route('/add_none_to_medication_and_treatment', methods=['POST'])
def add_none_to_medication_and_treatment():
    preload_data_helpers.add_none_to_all_users_medication_and_treatment()
    return "Update Successfully"


@app.route('/load_from_db/cancer_types')
def get_cancer_types():
    return jsonify(preload_data_helpers.get_cancer_types())


@app.route('/load_from_db/treatment_types')
def get_treatment_types():
    return jsonify(preload_data_helpers.get_treatment_types())


@app.route('/load_from_db/genders')
def get_genders():
    return jsonify(preload_data_helpers.get_genders())


@app.route('/load_from_db/sexual_orientations')
def get_sexual_orientations():
    return jsonify(preload_data_helpers.get_sexual_orientations())


@app.route('/load_from_db/medications')
def get_medications():
    return jsonify(preload_data_helpers.get_medications())


@login_manager.user_loader
def load_user(user_id):
    return login_register_helpers.get_user_by_user_id(user_id)


@app.route('/get_user', methods=['POST'])
@login_required
def get_user_by_id():
    my_json = request.get_json()
    user_id = my_json["user_id"]
    return login_register_helpers.get_user_by_user_id(user_id).get_json()


@login_manager.unauthorized_handler
def unauthorized():
    return "user is not logged in", 401


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return "logout"



@socketio.on('receive_msg')
@authenticated_only
def receive_msg(input_json):
    print(input_json)
    msg = input_json["msg"]
    receiver = input_json["receiver_uid"]
    sender = input_json["sender_uid"]
    session_id = handle_session_info_helpers.get_session_id_by_user_id(receiver)
    message_handle_helper.create_new_text_msg(sender, receiver, msg)
    socketio.emit('chat', "receiver need to read", room=session_id)


# @socketio.on('save_session')
# @authenticated_only
# def save_session():
#     user_id = current_user.get_id()
#     session_id = request.sid
#     result = handle_session_info_helpers.save_session_id_to_user_id(user_id,
#                                                                     session_id)
#     socketio.emit('save_session', result)

@socketio.on('connect')
@authenticated_only
def socket_connect():
    print("connect")
    user_id = current_user.get_id()
    session_id = request.sid
    handle_session_info_helpers.save_session_id_to_user_id(user_id, session_id)



def print_error():
    e = sys.exc_info()
    for i in e:
        print(i)






@app.route('/delete_self', methods=['POST'])
@login_required
def delete_self():
    uid = current_user.get_id()
    result = delete_helpers.delete_user_by_uid(uid)
    return result


@app.route('/reset_password/email', methods=['POST'])
def email():
    user_email = request.get_json()['email']
    if not login_register_helpers.email_already_existed(user_email):
        return "Email not found. ", 412
    user_id = login_register_helpers.get_user_id_by_user_email(user_email)
    token = reset_password_helpers.get_token_by_user_id(user_id,
                                                        app.config.get(
                                                            'SECRET_KEY')).decode(
        'utf-8')
    url = app.config.get('ROUTE_URL') + '/changePassword/' + token
    try:
        reset_password_helpers.send_email(app.config.get("MAIL"),
                                          user_email,
                                          app.config.get('API_KEY'),
                                          url)
        return "Reset password email sent. ", 200
    except Exception:
        return "Something wrong. ", 412


@app.route('/reset_password/verify', methods=['POST'])
def verify_token():
    token = request.get_json()['token']
    user_id = (reset_password_helpers.verify_token(token, app.config.get(
        'SECRET_KEY')))
    if user_id is None:
        return "Not a valid token", 412
    login_user(login_register_helpers.get_user_by_user_id(user_id))
    return "Verify successfully", 200


@login_required
@app.route('/reset_password/set', methods=['POST'])
def set_password():
    new_password = request.get_json()['password']
    try:
        reset_password_helpers.set_password(current_user.get_id(), new_password)
        return "Password reset successfully. ", 200
    except Exception as e:
        print(e)
        return "Something wrong happened. ", 412


if __name__ == '__main__':
    # app.run(debug=True)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
