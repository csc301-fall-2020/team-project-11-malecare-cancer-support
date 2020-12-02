from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user
import pymongo

from ..usecases import handle_report_helpers, login_register_helpers

login_page = Blueprint('login_page', __name__,
                       static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')


@login_page.route('/login', methods=['POST'])
def login():
    try:
        user_email = request.get_json()["email"]
        if not login_register_helpers.email_already_existed(user_email):
            return "Email or password is not correct", 412
        if handle_report_helpers.check_user_in_black_list_by_email(user_email):
            return "This account has been locked", 412
        if login_register_helpers.verify_password_by_email(email=user_email,
                                                           password=
                                                           request.get_json()[
                                                               "password"]):
            login_user(login_register_helpers.get_user_by_email(email=user_email))
            return jsonify(current_user.get_json())
        else:
            return "Email or password is not correct", 412
    except pymongo.errors as e:
        print(e)
        return "Network connection failed", 500
    except Exception as e:
        print(e)
        return "Error occurs", 500
