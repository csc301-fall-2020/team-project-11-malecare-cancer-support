from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask import Flask, request
from ..usecases import login_register_helpers
from ..usecases import cancer_types_helpers

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


# this is only for initializing empty database,
# data can be found under backend/app/database_backup/
@app.route('/load_to_db/cancer_types', methods=['POST'])
def load_cancer_types():
    return cancer_types_helpers \
        .load_to_cancer_type_db(request.get_json()["cancer_types"])


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


if __name__ == '__main__':
    app.run(debug=True)
