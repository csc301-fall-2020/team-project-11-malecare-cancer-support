import mongoengine as db
from flask_login import UserMixin
import string
import random
db.connect('malecare-dev')

class User(db.Document, UserMixin):
    user_id = db.StringField()
    email = db.StringField()
    password = db.StringField()



    def get_id(self):
        return self.user_id

    def get_password(self):
        return self.password

    def get_email(self):
        return self.email


