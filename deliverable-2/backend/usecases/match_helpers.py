from ..models.user import User


def find_match(cancer_type_lst, sex_orientation_lst, gender_lst, purpose_lst,
               current_uid):
    return User.objects(cancer__in=cancer_type_lst,
                        sex_orientation__in=sex_orientation_lst,
                        gender__in=gender_lst,
                        purpose__in=purpose_lst,
                        user_id__ne=current_uid).to_json()
