
from flask import request, Blueprint, current_app
from flask_login import current_user, login_required, login_user

from ..usecases import login_register_helpers, \
    reset_password_helpers, delete_helpers

account_page = Blueprint('account_page', __name__,
                         static_folder='../../frontend/build/static',
                         template_folder='../../frontend/build/')


@account_page.route('/reset_password/email', methods=['POST'])
def email():
    user_email = request.get_json()['email']
    if not login_register_helpers.email_already_existed(user_email):
        return "Email not found. ", 412
    user_id = login_register_helpers.get_user_id_by_user_email(user_email)
    token = reset_password_helpers.get_token_by_user_id(user_id,
                                                        current_app.config.get(
                                                            'SECRET_KEY')).decode(
        'utf-8')
    url = current_app.config.get('ROUTE_URL') + '/changePassword/' + token
    try:
        reset_password_helpers.send_email(current_app.config.get("MAIL"),
                                          user_email,
                                          current_app.config.get('API_KEY'),
                                          url)
        return "Reset password email sent. ", 200
    except Exception:
        return "Something wrong. ", 412


@account_page.route('/reset_password/verify', methods=['POST'])
def verify_token():
    token = request.get_json()['token']
    user_id = (reset_password_helpers.verify_token(token, current_app.config.get(
        'SECRET_KEY')))
    if user_id is None:
        return "Not a valid token", 412
    login_user(login_register_helpers.get_user_by_user_id(user_id))
    return "Verify successfully", 200


@login_required
@account_page.route('/reset_password/set', methods=['POST'])
def set_password():
    new_password = request.get_json()['password']
    try:
        reset_password_helpers.set_password(current_user.get_id(), new_password)
        return "Password reset successfully. ", 200
    except Exception as e:
        print(e)
        return "Something wrong happened. ", 412


@account_page.route('/delete_self', methods=['POST'])
@login_required
def delete_self():
    uid = current_user.get_id()
    result = delete_helpers.delete_user_by_uid(uid)
    return result