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

# TODO: set medications, treatments, purpose, username
