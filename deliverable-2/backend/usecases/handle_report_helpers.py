import random
import string
import json

from ..models.black_list import BlackList
from ..models.report_history import ReportHistory
from ..usecases import login_register_helpers
from ..models.user import User

ACCEPT_REPORT = \
    "the report has been accepted, user {} has been added to black list"
DECLINE_REPORT = "the report has been declined"
CREATE_SUCCESS = "the report has been created successfully"


def generate_random_report_id(length):
    letters = string.ascii_lowercase + '0123456789'
    result_str = ''.join(random.choice(letters) for _ in range(length))
    return result_str


def create_new_report(reporter_uid, reported_uid, report_detail):
    new_report = ReportHistory(report_id=generate_random_report_id(6),
                               reporter_uid=reporter_uid,
                               reported_uid=reported_uid,
                               report_detail=report_detail,
                               is_handle=False)
    new_report.save()
    return CREATE_SUCCESS


def get_all_undecided_report():
    all_undecided_report = ReportHistory.objects(is_handle=False).to_json()
    report_lst = json.loads(all_undecided_report)

    for r in report_lst:
        user = User.objects(user_id=r['reported_uid'])
        if user is not None:
            email = user.only('email').values_list('email')[0]
        else:
            email = "[Deleted User]"
        r['reported_email'] = email
    return report_lst


def block_report(report_id):
    ReportHistory.objects(report_id=report_id).update(is_handle=True)
    uid = ReportHistory.objects(report_id=report_id).first().get_reported_uid()
    new_black_user = BlackList(uid=uid)
    new_black_user.save()
    return ACCEPT_REPORT.format(uid)


def ignore_report(report_id):
    ReportHistory.objects(report_id=report_id).update(is_handle=True)
    return DECLINE_REPORT


def get_all_black_list():
    return BlackList.objects().to_json()


# return True if user in black_list
def check_user_in_black_list_by_email(email):
    uid = login_register_helpers.get_user_id_by_user_email(email)
    return BlackList.objects(uid=uid).first() is not None
