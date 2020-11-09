import json
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask import Flask, request
from flask_mongoengine import MongoEngine

from .usecases.login_register_helpers import *

login_manager = LoginManager()
app = Flask(__name__)
# app.config['MONGODB_SETTINGS'] = {
#     "db": "malecare-dev",
#     'host': 'localhost',
#     'port': 27017
# }
app.config["SECRET_KEY"] = 'my secret'
# db = MongoEngine()
# db.init_app(app)
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return get_user_by_user_id(user_id)


@app.route("/")
@login_required
def index():
    return "your email is " + current_user.get_email()


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return "logout"


@app.route('/login', methods=['POST'])
def login():
    user_email = request.get_json()["email"]
    if not email_already_existed(user_email):
        return "Email does not exists"
    if verify_password_by_email(email=user_email,
                                password=request.get_json()["password"]):
        login_user(get_user_by_email(email=user_email))
        return "Login successfully"
    else:
        return "Incorrect Password"


@app.route('/signup', methods=['POST'])
def signup():
    if email_already_existed(request.get_json()["email"]):
        return "Email already exists."
    else:
        return create_new_user(email=request.get_json()["email"],
                               password=request.get_json()["password"])


if __name__ == '__main__':
    app.run(debug=True)
