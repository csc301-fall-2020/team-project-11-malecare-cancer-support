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
from .login_page import login_page
from ..usecases import delete_helpers, handle_session_info_helpers, \
    login_register_helpers, \
    message_handle_helper, preload_data_helpers, \
    reset_password_helpers

from ..util import helpers
from .login_page import login_page
from .preload_data import preload_data
from .chat_page import chat_page
from .admin_message_page import admin_page
from .current_user_page import current_user_page
from .friend_request_page import friend_request_page
from .match_page import match_page
from .register_page import register_page
from .admin_report_page import report_page

from .account_page import account_page

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
app.register_blueprint(preload_data)
app.register_blueprint(admin_page)
app.register_blueprint(chat_page)
app.register_blueprint(current_user_page)
app.register_blueprint(friend_request_page)
app.register_blueprint(match_page)
app.register_blueprint(register_page)
app.register_blueprint(report_page)
from .socket_listener import socket_listener as socket_blueprint
app.register_blueprint(socket_blueprint)
app.register_blueprint(account_page)



# decorator for limiting access of admin-only api
def admin_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_administrator():
            return "Need to be admin", 401
        return f(*args, **kwargs)

    return wrapped





@app.route("/")
def index():
    return render_template('index.html')


@app.route("/<path:path>")
def serve(path):
    return render_template('index.html')


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




# @app.route('/delete_self', methods=['POST'])
# @login_required
# def delete_self():
#     uid = current_user.get_id()
#     result = delete_helpers.delete_user_by_uid(uid)
#     return result


# @app.route('/reset_password/email', methods=['POST'])
# def email():
#     user_email = request.get_json()['email']
#     if not login_register_helpers.email_already_existed(user_email):
#         return "Email not found. ", 412
#     user_id = login_register_helpers.get_user_id_by_user_email(user_email)
#     token = reset_password_helpers.get_token_by_user_id(user_id,
#                                                         app.config.get(
#                                                             'SECRET_KEY')).decode(
#         'utf-8')
#     url = app.config.get('ROUTE_URL') + '/changePassword/' + token
#     try:
#         reset_password_helpers.send_email(app.config.get("MAIL"),
#                                           user_email,
#                                           app.config.get('API_KEY'),
#                                           url)
#         return "Reset password email sent. ", 200
#     except Exception:
#         return "Something wrong. ", 412
#
#
# @app.route('/reset_password/verify', methods=['POST'])
# def verify_token():
#     token = request.get_json()['token']
#     user_id = (reset_password_helpers.verify_token(token, app.config.get(
#         'SECRET_KEY')))
#     if user_id is None:
#         return "Not a valid token", 412
#     login_user(login_register_helpers.get_user_by_user_id(user_id))
#     return "Verify successfully", 200
#
#
# @login_required
# @app.route('/reset_password/set', methods=['POST'])
# def set_password():
#     new_password = request.get_json()['password']
#     try:
#         reset_password_helpers.set_password(current_user.get_id(), new_password)
#         return "Password reset successfully. ", 200
#     except Exception as e:
#         print(e)
#         return "Something wrong happened. ", 412


if __name__ == '__main__':
    # app.run(debug=True)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
