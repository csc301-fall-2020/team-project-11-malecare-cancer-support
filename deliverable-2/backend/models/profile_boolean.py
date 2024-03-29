from flask_login import UserMixin

from .mongoengine_connect import db


# user name, gender
# sex orientation, short intro


class ProfileBoolean(db.Document, UserMixin):
    user_id = db.StringField(unique=True)
    gender_bool = db.BooleanField(unique=True)
    sex_orientation_bool = db.BooleanField(unique=True)
    date_of_birth_bool = db.BooleanField(default=True)
    medications_and_treatments_bool = db.BooleanField(default=True)
    # cancer_bool = db.BooleanField(default=True)
    purpose_bool = db.BooleanField(default=True)
    # short_intro_bool = db.BooleanField(default=False)

    def get_json(self):
        return {
            "user_id": self.user_id,
            "gender_bool": self.gender_bool,
            "sex_orientation_bool": self.sex_orientation_bool,
            "date_of_birth_bool": self.date_of_birth_bool,
            "medications_and_treatments_bool": self.medications_and_treatments_bool,
            "purpose_bool": self.purpose_bool,

        }

    # "cancer_bool": self.cancer_bool,
    # "short_intro_bool": self.short_intro_bool

    def get_id(self):
        return self.user_id

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

    # def get_short_intro_bool(self):
    #     return self.short_intro_bool
    # def get_cancer_bool(self):
        #     return self.cancer_bool
