from ..models.user import User
from ..models.session import Session


def filter_users(treatments, cancertypes, medications, sex, age_min, age_max):
    #Geo need implement later Latitude and longitude min max
    query_json = User.objects(treatments=treatments).get_json()
    sid_list = []
    for user_json in query_json:
        uid = user_json["user_id"]
        sid = Session.objects(user_id=uid)
        sid_list.append(sid)
    return sid_list
