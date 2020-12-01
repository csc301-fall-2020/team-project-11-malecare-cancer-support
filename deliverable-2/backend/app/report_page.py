from flask import jsonify, request, Blueprint
from flask_login import current_user
from .cancer_chat import login_required, admin_only
from ..usecases import message_handle_helper, handle_report_helpers

report_page = Blueprint('report_page', __name__, static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')



@report_page.route('/report/history')
@login_required
def get_all_undecided_report_history():
    return jsonify(handle_report_helpers.get_all_undecided_report())


@report_page.route('/report/block', methods=['POST'])
@admin_only
@login_required
def block_user_by_report():
    my_json = request.get_json()
    report_id = my_json["report_id"]
    return handle_report_helpers.block_report(report_id)


@report_page.route('/report/ignore', methods=['POST'])
@admin_only
@login_required
def ignore_report():
    my_json = request.get_json()
    report_id = my_json["report_id"]
    return handle_report_helpers.ignore_report(report_id)


@report_page.route('/new_report', methods=['POST'])
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
@admin_only
@login_required
def get_all_black_list():
    return handle_report_helpers.get_all_black_list()


@app.route('/report/check_reported_user', methods=['POST'])
@admin_only
@login_required
def get_reported_user_message():
    my_json = request.get_json()
    reported_uid = my_json["reported_uid"]
    reporter_uid = my_json["reporter_uid"]
    return message_handle_helper.get_message_by_sender_and_receiver_id(
        reported_uid, reporter_uid)


# @app.route('/report/email_by_id', methods=['POST'])
# @login_required
# @admin_only
# def get_email_by_user_id():
#     user_id = request.get_json()['user_id']
#     if login_register_helpers.is_user_id_existed(user_id):
#         return jsonify(login_register_helpers.get_email_by_id(user_id=user_id))
#     return "[User deleted]"


# @app.route('/admin_sign_up', methods=["POST"])
# def create_admin():
#     my_json = request.get_json()
#     login_register_helpers.create_admin(email=my_json["email"],
#                                         password=my_json["password"])
#     return "Create admin successfully"


@app.route('/report/delete_user', methods=['POST'])
@login_required
@admin_only
def delete_user_by_email():
    my_json = request.get_json()
    email = my_json["email"]
    if login_register_helpers.email_already_existed(email):
        result = delete_helpers.delete_user_by_email(email)
    else:
        result = "Email does not exists"
    return result


@app.route('/report/all_emails', methods=['POST'])
@admin_only
def get_all_emails():
    email_lst = administrator_filter_helpers.get_all_emails()

    return jsonify(helpers.email_lst_to_dict(email_lst))
