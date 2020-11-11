from .mongoengine_connect import db
import datetime


class Session(db.Document):
    user_id = db.StringField()
    session_id = db.StringField()

    def get_user_id(self):
        return self.user_id

    def get_session_id(self):
        return self.session_id
