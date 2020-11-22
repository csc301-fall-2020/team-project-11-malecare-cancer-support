import json

from ..models.user import User


def find_match(cancer_type_lst, sex_orientation_lst, gender_lst, purpose_lst,
               current_uid):
    query_result_json = User.objects(cancer__in=cancer_type_lst,
                                     sex_orientation__in=sex_orientation_lst,
                                     gender__in=gender_lst,
                                     purpose__in=purpose_lst,
                                     user_id__ne=current_uid).to_json()
    user_lst = json.loads(query_result_json)
    for u in user_lst:
        date_of_birth = User.objects(user_id=u['user_id']).first().get_json()[
            "date_of_birth"]
        u['date_of_birth'] = date_of_birth
    return user_lst
