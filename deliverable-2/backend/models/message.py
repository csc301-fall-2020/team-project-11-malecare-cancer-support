from .user import db
import datetime


class Message(db.document):
    sender_uid = db.StringField(max_length=10)
    receiver_uid = db.StringField(max_length=10)
    text = db.StringField()
    send_at = db.DateTimeField(default=datetime.datetime.utcnow())
    if_read = db.BooleanField(default=False)

    def get_text(self):
        return self.text

    def get_sender_uid(self):
        return self.sender_uid

    def get_receiver_uid(self):
        return self.receiver_uid