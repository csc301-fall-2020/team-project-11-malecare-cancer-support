from flask import jsonify, request, Blueprint
from flask_login import current_user, login_user

from ..usecases import login_register_helpers

import pymongo

register_page = Blueprint('register_page', __name__, static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')


@register_page.route('/signup', methods=['POST'])
def signup():
    try:
        my_json = request.get_json()
        print(my_json)
        if login_register_helpers.email_already_existed(
                my_json["email"]):
            return "Email already exists.", 412
        else:
            login_register_helpers.create_new_user(
                username=my_json["username"],
                email=my_json["email"],
                password=my_json["password"],
                date_of_birth=my_json["date_of_birth"],
                gender=my_json["gender"],
                cancer=my_json["cancer"],
                purpose=my_json["purpose"],
                sex_orientation=my_json['sex_orientation'],
                region=my_json["region"]
            )
            login_user(
                login_register_helpers.get_user_by_email(my_json["email"]))
            return jsonify(current_user.get_json())
    except pymongo.errors.AutoReconnect as e:
        print(e)
        return "Cannot connect to database, please try again", 400
    except Exception as e:
        print(e)
        return "We cannot create an account for you at this time. ", 400
