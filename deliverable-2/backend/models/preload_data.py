from .mongoengine_connect import db


class PreLoads(db.Document):
    cancer_types = db.ListField(db.StringField())
    sexual_orientations = db.ListField(db.StringField())
    genders = db.ListField(db.StringField())
    medications = db.ListField(db.StringField())
    treatment_types = db.ListField(db.StringField())

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
