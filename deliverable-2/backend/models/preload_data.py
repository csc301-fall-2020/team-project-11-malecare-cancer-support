from .mongoengine_connect import db


class PreLoads(db.Document):
    cancer_types = db.DictField()
    sexual_orientations = db.StringField()
    genders = db.ListField(db.StringField())
    medications = db.DictField()
    treatment_types = db.ListField(db.StringField())
    profile_picture = db.ImageField()

    def get_cancer_types(self):
        return self.cancer_types

    def get_sexual_orientations(self):
        return self.sexual_orientations

    def get_genders(self):
        return self.genders

    def get_medications(self):
        return self.medications

    def get_treatment_types(self):
        return self.treatment_types

    def get_profile_picture(self):
        return self.profile_picture
