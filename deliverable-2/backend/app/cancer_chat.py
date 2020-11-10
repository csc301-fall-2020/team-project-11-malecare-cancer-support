from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask import Flask, request, jsonify
from ..usecases import login_register_helpers, preload_data_helpers, message_handle_helper


login_manager = LoginManager()
app = Flask(__name__)
app.config["SECRET_KEY"] = 'my secret'

login_manager.init_app(app)


# this is only for initializing empty database,
# data can be found under backend/app/database_preload_backup/
@app.route('/load_to_db', methods=['POST'])
def load_to_db():
    return preload_data_helpers \
        .load_to_cancer_type_db(cancer_type_lst=request.get_json()["cancer_types"],
                                treatment_lst=request.get_json()["treatment_types"],
                                sexual_orientation_lst=request.get_json()["sexual_orientations"],
                                gender_lst=request.get_json()["genders"],
                                medication_lst=request.get_json()["medications"]
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


@app.route("/")
@login_required
def index():
    return "your email is " + current_user.get_email()


@login_manager.unauthorized_handler
def unauthorized():
    return "user is not logged in"


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return "logout"


@app.route('/login', methods=['POST'])
def login():
    user_email = request.get_json()["email"]
    if not login_register_helpers.email_already_existed(user_email):
        return "Email does not exists"
    if login_register_helpers.verify_password_by_email(email=user_email,
                                                       password=request.get_json()["password"]):
        login_user(login_register_helpers.get_user_by_email(email=user_email))
        return "Login successfully"
    else:
        return "Incorrect Password"


@app.route('/signup', methods=['POST'])
def signup():
    if login_register_helpers.email_already_existed(request.get_json()["email"]):
        return "Email already exists."
    else:
        return login_register_helpers.create_new_user(email=request.get_json()["email"],
                                                      password=request.get_json()["password"])


@app.route('/chat/new_message', methods=['POST'])
def create_new_msg():
    my_json = request.get_json()
    return message_handle_helper.create_new_text_msg(sender_uid=my_json["sender"],
                                                     receiver_uid=my_json["receiver"],
                                                     text=my_json["text"])


@app.route('/chat/unread_message', methods=['GET'])
def get_unread_msg_by_receiver():
    return message_handle_helper.get_unread_msg_by_receiver(request.get_json()["receiver"])


@app.route('/chat/update_message', methods=['POST'])
def mark_as_read():
    my_json = request.get_json()
    return message_handle_helper.mark_as_read_by_sender_receiver(sender_uid=my_json['sender'],
                                                                 receiver_uid=my_json['receiver'])


if __name__ == '__main__':
    app.run(debug=True)
