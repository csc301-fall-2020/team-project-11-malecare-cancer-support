# import functools
import functools
import sys

# import pymongo
from flask import Flask, jsonify, render_template, request, Blueprint
from flask_cors import CORS
from flask_login import LoginManager, current_user, login_required, login_user, \
    logout_user
from flask_socketio import SocketIO, disconnect

from .config import Configuration
from .login_page import login_page
from ..usecases import delete_helpers, handle_session_info_helpers, \
    login_register_helpers, \
    message_handle_helper, preload_data_helpers, \
    reset_password_helpers, administrator_filter_helpers, friend_handler_helpers

from ..util import helpers

admin_page = Blueprint('admin_page', __name__,
                       static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')


@admin_page.route('/admin/get_filter_email', methods=['POST'])
@login_required
def admin_get_filter_email():
    input_json = request.get_json()
    gender = input_json['includeGenders']
    age_min, age_max = input_json['includeAges']
    include_cancer = input_json['includeCancerTypes']
    exclude_cancer = input_json['excludeCancerTypes']
    include_medication = input_json['includeMedications']
    exclude_medication = input_json['excludeMedications']
    include_treatment = input_json['includeTreatments']
    exclude_treatment = input_json['excludeTreatments']
    email_lst = administrator_filter_helpers.get_email_from_admin_filter(
        include_cancer=include_cancer,
        include_medication=include_medication,
        include_treatment=include_treatment,
        exclude_cancer=exclude_cancer,
        exclude_medication=exclude_medication,
        exclude_treatment=exclude_treatment,
        age_min=age_min,
        age_max=age_max,
        gender=gender
    )
    return jsonify(helpers.email_lst_to_dict(email_lst))

