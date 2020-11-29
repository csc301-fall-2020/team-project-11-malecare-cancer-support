from ..models.profile_boolean import ProfileBoolean


def get_user_bool_by_user_id(user_id):
    return ProfileBoolean.objects(user_id=user_id).first().get_json()


def set_gender_bool_by_user_id(user_id, gender_bool):
    ProfileBoolean.objects(user_id=user_id).update(
        set__gender_bool=gender_bool)


def set_sex_orientation_bool_by_user_id(user_id, sex_orientation_bool):
    ProfileBoolean.objects(user_id=user_id).update(
        set__sex_orientation_bool=sex_orientation_bool
    )


def set_date_of_birth_bool_by_user_id(user_id, date_of_birth_bool):
    ProfileBoolean.objects(user_id=user_id).update(
        set__date_of_birth_bool=date_of_birth_bool)


def set_medications_and_treatments_bool_by_user_id(user_id,
                                                   medications_and_treatments_bool):
    ProfileBoolean.objects(user_id=user_id).update(
        set__medications_and_treatments_bool=medications_and_treatments_bool)


def set_purpose_bool_by_user_id(user_id, purpose_bool):
    ProfileBoolean.objects(user_id=user_id).update(
        set__purpose_bool=purpose_bool)
#
# def set_cancer_types_bool_by_user_id(user_id, cancer_types_bool):
#     ProfileBoolean.objects(user_id=user_id).update(
#         set__cancer_bool=cancer_types_bool)


# def set_short_intro_bool_by_user_id(user_id, short_intro_bool):
#     ProfileBoolean.objects(user_id=user_id).update(
#         set__short_intro_bool=short_intro_bool)


