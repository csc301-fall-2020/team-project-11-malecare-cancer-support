import random
import string

from ..models.black_list import BlackList
from ..models.report_history import ReportHistory

ACCEPT_REPORT = "the report has been accepted, user {} has been added to black list"
DECLINE_REPORT = "the report has been declied"


def generate_random_report_id(length):
    letters = string.ascii_lowercase + '0123456789'
    result_str = ''.join(random.choice(letters) for _ in range(length))
    return result_str


def create_new_report(reporter_uid, reported_uid, report_deatil):
    new_report = ReportHistory(report_id=generate_random_report_id(6),
                               reporter_uid=reporter_uid,
                               reported_uid=reported_uid,
                               report_deatil=report_deatil,
                               is_handle=False)
    new_report.save()


def get_all_undecided_report():
    all_undecided_report = ReportHistory.objects(is_handle=False).update(
        is_handle=True)
    return all_undecided_report.to_json()


def accept_report(report_id):
    uid = ReportHistory.objects(report_id=report_id).get_reported_uid()
    new_black_user = BlackList(uid)
    new_black_user.save()
    return ACCEPT_REPORT.format(uid)


def decline_friend_request(report_id):
    return DECLINE_REPORT
