from .mongoengine_connect import db

class ReportHistory(db.Document):
    report_id = db.StringField()
    reporter_uid = db.StringField()
    reported_uid = db.StringField()
    report_detail = db.StringField()
    is_handle = db.BooleanField(default=False)

    def get_reporter_uid(self):
        return self.reporter_uid

    def get_reported_uid(self):
        return self.reported_uid

    def get_report_detail(self):
        return self.report_detail

    def get_if_handle(self):
        return self.ifs_handle
