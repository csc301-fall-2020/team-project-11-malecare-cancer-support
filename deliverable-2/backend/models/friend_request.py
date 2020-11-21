from .mongoengine_connect import db


class FriendRequest(db.Document):
    sender_uid = db.StringField()
    receiver_uid = db.StringField()
    is_accepted = db.BooleanField(default=False)
