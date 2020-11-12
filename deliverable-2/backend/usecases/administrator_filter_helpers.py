from ..models.session import Session
from ..models.user import User


def filter_users(treatments, cancer_types, medications, sex, age_min, age_max):
    # Geo need implement later Latitude and longitude min max
    query_json = User.objects(treatments=treatments).get_json()
    session_info = {}
    for user_json in query_json:
        uid = user_json["user_id"]
        sid = Session.objects(user_id=uid)
        session_info[uid] = sid
    return session_info
