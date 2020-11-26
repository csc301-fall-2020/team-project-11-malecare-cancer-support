from flask_login import UserMixin

from .mongoengine_connect import db


class User(db.Document, UserMixin):
    username = db.StringField()
    user_id = db.StringField(unique=True)
    email = db.StringField(unique=True)
    password = db.StringField()
    date_of_birth = db.DateField()
    gender = db.StringField()
    cancer = db.ListField(db.StringField())
    purpose = db.ListField(db.StringField())
    sex_orientation = db.StringField()
    is_admin = db.BooleanField(default=False)
    short_intro = db.StringField(default='')
    friends = db.ListField(db.StringField(default=[]))
    medications = db.ListField(db.StringField(default=[]))
    treatments = db.ListField(db.StringField(default=[]))
    profile_picture = db.ImageField(thumbnail_size=(150, 150, False))

    def get_json(self):
        return {
            "user_id": self.user_id,
            "email": self.email,
            "username": self.username,
            "date_of_birth": self.date_of_birth,
            "gender": self.gender,
            "cancer": self.cancer,
            "purpose": self.purpose,
            "sex_orientation": self.sex_orientation,
            "short_intro": self.short_intro,
            "friends": self.friends,
            "medications": self.medications,
            "treatments": self.treatments,
            "profile_picture": self.profile_picture.read(),
            "is_admin": self.is_admin

        }

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
        return self.sex_orientation

    # read()
    def get_profile_picture(self):
        return self.profile_picture

    def filter_cancer(self, cancer_type):
        if cancer_type in self.cancer:
            return True
        return False

    def filter_purpose(self, purpose):
        if purpose in self.purpose:
            return True
        return False

    # def filter_sex_orientation(self, sex_orientation):
    #     if sex_orientation in self.sex_orientation:
    #         return True
    #     return False

    def is_administrator(self):
        return self.is_admin
