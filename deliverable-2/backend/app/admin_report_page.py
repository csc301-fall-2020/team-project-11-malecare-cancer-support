# import functools

# import pymongo
from flask import jsonify, request, Blueprint
from flask_login import current_user, login_required

from ..usecases import delete_helpers, login_register_helpers, \
    message_handle_helper, administrator_filter_helpers, handle_report_helpers
from ..util import helpers

report_page = Blueprint('report_page', __name__,
                        static_folder='../../frontend/build/static',
                        template_folder='../../frontend/build/')


@report_page.route('/report/history')
@login_required
def get_all_undecided_report_history():
    return jsonify(handle_report_helpers.get_all_undecided_report())


@report_page.route('/report/block', methods=['POST'])
@login_required
def block_user_by_report():
    my_json = request.get_json()
    report_id = my_json["report_id"]
    return handle_report_helpers.block_report(report_id)


@report_page.route('/report/ignore', methods=['POST'])
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


@report_page.route('/report/black_list')
@login_required
def get_all_black_list():
    return jsonify(handle_report_helpers.get_all_black_list())

@report_page.route('/report/black_list/delete', methods=['POST'])
@login_required
def remove_from_block_list():
    try:
        return handle_report_helpers\
            .move_user_out_block_list(request.get_json()['user_id'])
    except Exception as e:
        print(e)
        return "Error occurs", 500


@report_page.route('/report/check_reported_user', methods=['POST'])
@login_required
def get_reported_user_message():
    my_json = request.get_json()
    reported_uid = my_json["reported_uid"]
    reporter_uid = my_json["reporter_uid"]
    return message_handle_helper.get_message_between_two_users(
        reported_uid, reporter_uid)


@report_page.route('/report/delete_user', methods=['POST'])
@login_required
def delete_user_by_email():
    try:
        my_json = request.get_json()
        email_lst = my_json["email"]
        acc = 0
        for email in email_lst:
            if login_register_helpers.email_already_existed(email):
                delete_helpers.delete_user_by_email(email)
                acc += 1
        return "Successfully delete {0} accounts".format(acc)
    except Exception as e:
        print(e)
        return "Error occurs", 500


@report_page.route('/report/all_emails', methods=['POST'])
def get_all_emails():
    email_lst = administrator_filter_helpers.get_all_emails()

    return jsonify(helpers.email_lst_to_dict(email_lst))
