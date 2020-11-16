import functools

import pymongo
from flask import Flask, jsonify, request
from flask_login import LoginManager, current_user, login_required, login_user, \
    logout_user
from flask_socketio import SocketIO, disconnect

from ..usecases import administrator_filter_helpers, \
    customize_user_profile_helpers, friend_handler_helpers, \
    handle_report_helpers, handle_session_info_helpers, login_register_helpers, \
    match_helpers, message_handle_helper, preload_data_helpers

login_manager = LoginManager()
app = Flask(__name__)
app.config["SECRET_KEY"] = 'my secret'

login_manager.init_app(app)

socketio = SocketIO(app, manage_session=False,  cors_allowed_origins="*")


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
        profile_picture=request.get_json()["profile_picture"]
        )


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


@app.route('/load_from_db/profile_picture')
def get_profile_picture():
    return jsonify(preload_data_helpers.get_profile_picture())


@app.route("/")
@login_required
def index():
    return "your email is " + current_user.get_email()


@login_manager.unauthorized_handler
def unauthorized():
    return "user is not logged in", 401


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return "logout"


@app.route('/login', methods=['POST'])
def login():
    user_email = request.get_json()["email"]
    if not login_register_helpers.email_already_existed(user_email):
        return "Email does not exists", 412
    if not handle_report_helpers.check_user_in_black_list_by_email(user_email):
        return "This account has been locked", 412
    if login_register_helpers.verify_password_by_email(email=user_email,
                                                       password=
                                                       request.get_json()[
                                                           "password"]):
        login_user(login_register_helpers.get_user_by_email(email=user_email))
        return jsonify(current_user.get_json())
    else:
        return "Incorrect Password", 412


@app.route('/current_user')
@login_required
def get_current_user():
    return current_user.get_json()


@app.route('/current_user/profile/text', methods=['POST'])
def change_current_user_profile_text():
    my_json = request.get_json()
    my_id = current_user.get_id()
    my_functions = [customize_user_profile_helpers.set_cancer_types_by_user_id,
                    customize_user_profile_helpers.set_sexual_orientation_by_user_id,
                    customize_user_profile_helpers.set_gender_by_user_id,
                    customize_user_profile_helpers.set_purpose_by_user_id,
                    customize_user_profile_helpers.set_date_of_birth_by_user_id,
                    customize_user_profile_helpers.set_medications_by_user_id,
                    customize_user_profile_helpers.set_treatments_by_user_id,
                    customize_user_profile_helpers.set_short_intro_by_user_id,
                    customize_user_profile_helpers.set_username_by_user_id]

    my_new_profile_fields = [my_json["cancer"],
                             my_json["sex_orientation"],
                             my_json["gender"],
                             my_json["purpose"],
                             my_json["date_of_birth"],
                             my_json["medications"],
                             my_json["treatments"],
                             my_json["short_intro"],
                             my_json["username"]]
    for func, field in zip(my_functions, my_new_profile_fields):
        func(my_id, field)
    # customize_user_profile_helpers \
    #     .set_sexual_orientation_by_user_id(user_id=my_id,
    #                                        sex_orientation=my_json["sex_orientation"])
    return login_register_helpers.get_user_by_user_id(my_id).get_json()


@app.route('/current_user/profile/picture', methods=['POST'])
def change_current_user_picture():
    picture = open(str(request.get_json()["picture"]), 'rb')
    print(current_user.get_id())
    customize_user_profile_helpers \
        .set_picture_by_user_id(user_id=current_user.get_id(), picture=picture)
    return "Success"


@app.route('/signup', methods=['POST'])
def signup():
    try:
        my_json = request.get_json()
        if login_register_helpers.email_already_existed(
                my_json["email"]):
            return "Email already exists.", 412
        else:
            login_register_helpers.create_new_user(
                username=my_json["username"],
                email=my_json["email"],
                password=my_json["password"],
                date_of_birth=my_json["date_of_birth"],
                gender=my_json['gender'],
                cancer=my_json['cancer'],
                purpose=my_json['purpose'],
                sex_orientation=my_json['sex_orientation']
            )
            login_user(
                login_register_helpers.get_user_by_email(my_json["email"]))
            return current_user.get_json()
    except pymongo.errors.AutoReconnect as e:
        print("Try again maybe?", e)


@app.route('/chat/new_message', methods=['POST'])
def create_new_msg():
    my_json = request.get_json()
    return message_handle_helper.create_new_text_msg(
        sender_uid=my_json["sender"],
        receiver_uid=my_json["receiver"],
        text=my_json["text"])


@app.route('/chat/unread_message', methods=['GET'])
def get_unread_msg_by_receiver():
    return message_handle_helper.get_unread_msg_by_receiver(
        request.get_json()["receiver"])


@app.route('/chat/update_message', methods=['POST'])
def mark_as_read():
    my_json = request.get_json()
    return message_handle_helper.mark_as_read_by_sender_receiver(
        sender_uid=my_json['sender'],

        receiver_uid=my_json['receiver'])


@app.route('/admin')
@login_required
@admin_only
def get_admin_only_page():
    return "Yes you are admin"


@socketio.on('receive_msg')
@authenticated_only
def receive_msg(input_json):
    msg = input_json["msg"]
    receiver = input_json["receiver_uid"]
    sender = input_json["sender_uid"]
    session_id = handle_session_info_helpers.get_session_id_by_user_id(receiver)
    message_handle_helper.create_new_text_msg(sender, receiver, msg)
    socketio.emit('chat', "receiver need to read", room=session_id)


@socketio.on('save_session')
# @authenticated_only
def save_session(input_json):
    user_id = input_json["user_id"]
    session_id = request.sid
    print(input_json)
    result = handle_session_info_helpers.save_session_id_to_user_id(user_id,
                                                                    session_id)
    socketio.emit('save_session', result)


@socketio.on('admin_send_msg')
@admin_only
@authenticated_only
def admin_send_msg(input_json):
    msg = input_json["msg"]
    treatments = input_json["treatments"]
    cancer_types = input_json["cancer_types"]
    medications = input_json["medications"]
    sex = input_json["sex"]
    age_min = input_json["age_min"]
    age_max = input_json["age_max"]
    session_info = administrator_filter_helpers.filter_users(treatments,
                                                             cancer_types,
                                                             medications,
                                                             sex, age_min,
                                                             age_max)
    for uid in session_info:
        message_handle_helper.create_new_text_msg(current_user.get_id(), uid, msg)
        socketio.emit('admin_send_msg', "send to all filter users",
                      room=session_info[uid])


# @app.route('/friend_requests/add', methods=['POST'])
# @login_required
# def new_friend_request():
#     _friend_request_helper(request.get_json(), friend_handler_helpers.create_new_friend_request)
#     return "added", 200


@socketio.on('new_friend_request')
@authenticated_only
def new_friend_request(payload):
    receiver_id = payload['receiver']
    session_id = handle_session_info_helpers.get_session_id_by_user_id(
        receiver_id)
    _friend_request_helper(payload,
                           friend_handler_helpers.create_new_friend_request)
    socketio.emit('get_friend_request', room=session_id)


# @app.route('/friend_requests/accept', methods=['POST'])
# @login_required
# def accept_friend_request():
#     _friend_request_helper(request.get_json(), friend_handler_helpers.accept_friend_request)
#     return "accepted", 200
@socketio.on('accept_friend_request')
@authenticated_only
def accept_friend_request(payload):
    sender_id = payload['sender']
    session_id = handle_session_info_helpers.get_session_id_by_user_id(
        sender_id)
    _friend_request_helper(payload,
                           friend_handler_helpers.accept_friend_request)
    socketio.emit('friend_request_accepted', room=session_id)


@app.route('/friend_requests/decline', methods=['POST'])
@login_required
def decline_friend_request():
    _friend_request_helper(request.get_json(),
                           friend_handler_helpers.decline_friend_request)
    return "declined", 200


@app.route('/friend_requests')
@login_required
def get_undecided_requests():
    return friend_handler_helpers.get_all_undecided_friend_requests_by_receiver_uid(
        request.get_json()["receiver"])


def _friend_request_helper(user_dict, func):
    func(user_dict["sender"],
         user_dict["receiver"])


@app.route('/match')
@login_required
def find_matches():
    my_json = request.get_json()

    return match_helpers.find_match(
        sex_orientation_lst=my_json["sex_orientation"],
        gender_lst=my_json["gender"],
        purpose_lst=my_json["purpose"],
        cancer_type_lst=current_user.get_json()['cancer'],
        current_uid=current_user.get_id())


@app.route('/report/history')
@login_required
def get_all_undecided_report_history():
    return handle_report_helpers.get_all_undecided_report()


@app.route('/report/accept', methods=['POST'])
@login_required
def accept_report():
    my_json = request.get_json()
    report_id = my_json["report_id"]
    return handle_report_helpers.accept_report(report_id)


@app.route('/report/decline', methods=['POST'])
@login_required
def decline_report():
    my_json = request.get_json()
    report_id = my_json["report_id"]
    return handle_report_helpers.decline_report(report_id)


@app.route('/new_report', methods=['POST'])
@login_required
def new_report():
    my_json = request.get_json()
    reported_uid = my_json["reported_uid"]
    report_detail = my_json["report_detail"]
    reporter_uid = current_user.get_id()
    return handle_report_helpers.create_new_report(reporter_uid,
                                                   reported_uid,
                                                   report_detail)


@app.route('/report/black_list')
@login_required
def get_all_black_list():
    return handle_report_helpers.get_all_black_list()


@app.route('/report/check_reported_user', methods=['POST'])
@login_required
def get_reported_user_message():
    my_json = request.get_json()
    reported_uid = my_json["reported_uid"]
    reporter_uid = my_json["reporter_uid"]
    return message_handle_helper.get_message_by_sender_and_receiver_id(
        reported_uid, reporter_uid)


@app.route('/admin_sign_up', methods=["POST"])
def create_admin():
    my_json = request.get_json()
    login_register_helpers.create_admin(email=my_json["email"],
                                        password=my_json["password"])
    return "Create admin successfully"

@socketio.on('index')
def index():
    print("123123")

if __name__ == '__main__':
    # app.run(debug=True)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
