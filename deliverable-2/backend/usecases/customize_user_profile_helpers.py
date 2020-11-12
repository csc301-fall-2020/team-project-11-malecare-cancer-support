from ..models.user import User


def set_date_of_birth_by_user_id(user_id, date_of_birth):
    User.objects(user_id=user_id).update(set__date_of_birth=date_of_birth)


def set_sexual_orientation_by_user_id(user_id, sex_orientation):
    User.objects(user_id=user_id).update(set__sex_orientation=sex_orientation)


def set_cancer_types_by_user_id(user_id, cancer_types):
    User.objects(user_id=user_id).update(set__cancer=cancer_types)


def set_gender_by_user_id(user_id, gender):
    User.objects(user_id=user_id).update(set__gender=gender)


def set_short_intro_by_user_id(user_id, short_intro):
    User.objects(user_id=user_id).update(set__short_intro=short_intro)


def set_medications_by_user_id(user_id, medication_list):
    User.objects(user_id=user_id).update(set__medications=medication_list)


def set_treatments_by_user_id(user_id, treatments_list):
    User.objects(user_id=user_id).update(set__treatments=treatments_list)


def set_purpose_by_user_id(user_id, purpose_list):
    User.objects(user_id=user_id).update(set__purpose=purpose_list)


def set_username_by_user_id(user_id, username):
    User.objects(user_id=user_id).update(set__username=username)


def set_picture_by_user_id(user_id, picture):
    User.objects(user_id=user_id).update(set__picture=picture)
