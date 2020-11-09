import mongoengine as db
from flask_login import UserMixin
import string
import random

MONGO_URL = "mongodb+srv://dbUser:CancerChat@cluster0.4ppll." \
            "mongodb.net/test?authSource=admin&replicaSet=atlas-n77zyo-shard-0&read" \
            "Preference=primary&appname=MongoDB%20Compass&ssl=true"

db.connect('malecare-dev', host=MONGO_URL, username='dbUser',
           password='CancerChat', authentication_source='admin',
           ssl=True, ssl_cert_reqs='CERT_NONE')


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
