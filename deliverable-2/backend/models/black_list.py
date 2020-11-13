from .mongoengine_connect import db


class BlackList(db.Document):
    uid = db.StringField()

    def get_uid(self):
        return self.uid
