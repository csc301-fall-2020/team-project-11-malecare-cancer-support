import random
import string

from ..models.black_list import BlackList
from ..models.report_history import ReportHistory

ACCEPT_REPORT = \
    "the report has been accepted, user {} has been added to black list"
DECLINE_REPORT = "the report has been declied"
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
    all_undecided_report = ReportHistory.objects(is_handle=False)
    return all_undecided_report.to_json()


def accept_report(report_id):
    ReportHistory.objects(report_id=report_id).update(is_handle=True)
    uid = ReportHistory.objects(report_id=report_id).get_reported_uid()
    new_black_user = BlackList(uid)
    new_black_user.save()
    return ACCEPT_REPORT.format(uid)


def decline_report(report_id):
    ReportHistory.objects(report_id=report_id).update(is_handle=True)
    return DECLINE_REPORT
