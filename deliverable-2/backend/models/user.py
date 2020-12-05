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
    profile_picture = db.StringField()
    # db.ImageField(thumbnail_size=(150, 150, False))
    album_pictures = db.ListField(db.StringField())
    region = db.DictField()
    gender_bool = db.BooleanField(unique=False)
    sex_orientation_bool = db.BooleanField(unique=False)
    date_of_birth_bool = db.BooleanField(default=False)
    medications_and_treatments_bool = db.BooleanField(default=False)
    purpose_bool = db.BooleanField(default=False)

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
            "profile_picture": self.profile_picture,
            "album_pictures": self.album_pictures,
            "region": self.region,
            "is_admin": self.is_admin,

            "gender_bool": self.gender_bool,
            "sex_orientation_bool": self.sex_orientation_bool,
            "date_of_birth_bool": self.date_of_birth_bool,
            "medications_and_treatments_bool": self.medications_and_treatments_bool,
            "purpose_bool": self.purpose_bool

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

    def get_profile_picture(self):
        return self.profile_picture

    def get_album_pictures(self):
        return self.album_pictures

    def get_gender_bool(self):
        return self.gender_bool

    def get_sex_orientation_bool(self):
        return self.sex_orientation_bool

    def get_date_of_birth_bool(self):
        return self.date_of_birth_bool

    def get_medications_and_treatments_bool(self):
        return self.medications_and_treatments_bool

    def get_purpose_bool(self):
        return self.purpose_bool

    def get_region(self):
        return self.region

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
