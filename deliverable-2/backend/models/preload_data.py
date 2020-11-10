from .mongoengine_connect import db


class CancerTypes(db.Document):
    cancer_types = db.ListField(db.StringField())

    def get_cancer_types(self):
        return self.cancer_types
