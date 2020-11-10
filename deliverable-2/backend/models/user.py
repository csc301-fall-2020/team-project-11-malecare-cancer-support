from flask_login import UserMixin

MONGO_URL = "mongodb+srv://user1:user1@cluster0.gjkej.mongodb.net/test"
from .mongoengine_connect import db

# "mongodb+srv://dbUser:CancerChat@cluster0.4ppll." \
#         "mongodb.net/test?authSource=admin&replicaSet=atlas-n77zyo-shard-0&read" \
#         "Preference=primary&appname=MongoDB%20Compass&ssl=true"

db.connect('malecare-dev', host=MONGO_URL, username='dbUser',
           password='CancerChat', authentication_source='admin',
           ssl=True, ssl_cert_reqs='CERT_NONE')


class User(db.Document, UserMixin):
    user_id = db.StringField()
    email = db.StringField()
    password = db.StringField()
    date_of_birth = db.StringField()
    gender = db.StringField()
    cancer = db.ListField(db.StringField())
    purpose = db.ListField(db.StringField())
    sex_orientation = db.ListField(db.StringField())

    def get_id(self):
        return self.user_id

    def get_password(self):
        return self.password

    def get_email(self):
        return self.email

    def get_date_of_birth(self):
        return self.date_of_birth

    def get_gender(self):
        return self.gender

    def get_cancer(self):
        return self.cancer

    def get_purpose(self):
        return self.purpose

    def get_sex_orientation(self):
        return self.get_sex_orientation()

    def filter_cancer(self, cancer_type):
        if cancer_type in self.cancer:
            return True
        return False

    def filter_purpose(self, purpose):
        if purpose in self.purpose:
            return True
        return False

    def filter_sex_orientation(self, sex_orientation):
        if sex_orientation in self.sex_orientation:
            return True
        return False
