from ..models.preload_data import PreLoads
from ..models.user import User

EMPTY_DB_MSG = "the db does not have documents of cancer types, please load it"
CANCER_TYPE_STR = "cancer_types"
TREATMENT_TYPE_STR = "treatment_types"
GENDER_STR = "genders"
SEXUAL_ORIENTATION_STR = "sexual_orientations"
MEDICATION_STR = "medications"
PROFILE_PICTURE_STR = "profile_picture"
ALBUM_PICTURES_STR = "album_pictures"


def load_to_cancer_type_db(treatment_lst,
                           cancer_type_lst,
                           sexual_orientation_lst,
                           gender_lst,
                           medication_lst):
    new_preload_data = PreLoads(cancer_types=cancer_type_lst,
                                sexual_orientations=sexual_orientation_lst,
                                genders=gender_lst,
                                medications=medication_lst,
                                treatment_types=treatment_lst
                                )
    new_preload_data.save()
    return "added preload data"


def _get_preload_data(data_type):
    query_result = PreLoads.objects(cancer_types__exists=True)
    if query_result is None:
        return EMPTY_DB_MSG
    else:
        preload_data = query_result.first()
        if data_type == CANCER_TYPE_STR:
            return preload_data.get_cancer_types()
        if data_type == MEDICATION_STR:
            return preload_data.get_medications()
        if data_type == SEXUAL_ORIENTATION_STR:
            return preload_data.get_sexual_orientations()
        if data_type == GENDER_STR:
            return preload_data.get_genders()
        if data_type == TREATMENT_TYPE_STR:
            return preload_data.get_treatment_types()


def get_cancer_types():
    return _get_preload_data(CANCER_TYPE_STR)


def get_sexual_orientations():
    return _get_preload_data(SEXUAL_ORIENTATION_STR)


def get_genders():
    return _get_preload_data(GENDER_STR)


def get_treatment_types():
    return _get_preload_data(TREATMENT_TYPE_STR)


def get_medications():
    return _get_preload_data(MEDICATION_STR)


def get_profile_picture():
    return _get_preload_data(PROFILE_PICTURE_STR)


def add_none_to_all_users_medication_and_treatment():
    User.objects().update(add_to_set__medications="None",
                          add_to_set__treatments="None")


def get_album_pictures():
    return _get_preload_data(ALBUM_PICTURES_STR)
