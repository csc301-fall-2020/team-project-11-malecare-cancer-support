import json

from ..models.user import User
from ..util import helpers

def find_match(cancer_type_lst, sex_orientation_lst, gender_lst, purpose_lst,
               current_uid, age_min, age_max, region):
    start_year, end_year = helpers.get_start_end_year(age_min=age_min, age_max=age_max)
    print(region)
    query_result_json = User.objects(cancer__in=cancer_type_lst,
                                     sex_orientation__in=sex_orientation_lst,
                                     gender__in=gender_lst,
                                     purpose__in=purpose_lst,
                                     user_id__ne=current_uid,
                                     region=region,
                                     date_of_birth__gte=start_year,
                                     date_of_birth__lte=end_year).to_json()
    user_lst = json.loads(query_result_json)
    for u in user_lst:
        date_of_birth = User.objects(user_id=u['user_id']).first().get_json()["date_of_birth"]
        u['date_of_birth'] = date_of_birth
    return user_lst
