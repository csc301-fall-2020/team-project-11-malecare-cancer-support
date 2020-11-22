import datetime

from mongoengine.queryset.visitor import Q

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


def get_user_id_from_admin_filter(include_cancer, exclude_cancer,
                                  include_treatment, exclude_treatment,
                                  include_medication, exclude_medication,
                                  gender, age_min, age_max):
    start_year = datetime.datetime(datetime.datetime.utcnow().year - age_max, 1,
                                   1)
    end_year = datetime.datetime(datetime.datetime.utcnow().year - age_min, 12,
                                 31)
    query_result = User.objects(Q(cancer__in=include_cancer) &
                                Q(cancer__nin=exclude_cancer) &
                                Q(treatments__exists=True) &
                                # Q(treatments__ne=[]) &
                                Q(treatments__in=include_treatment) &
                                Q(treatments__nin=exclude_treatment) &
                                Q(medications__exists=True) &
                                # Q(medications__ne=[]) &
                                Q(medications__in=include_medication) &
                                Q(medications__nin=exclude_medication) &
                                Q(gender__in=gender) &
                                Q(date_of_birth__exists=True) &
                                Q(date_of_birth__gte=start_year) &
                                Q(date_of_birth__lte=end_year)).only(
        'user_id').values_list('user_id')

    return query_result


def get_email_from_admin_filter(include_cancer, exclude_cancer,
                                include_treatment, exclude_treatment,
                                include_medication, exclude_medication, gender,
                                age_min, age_max):
    print("111111111111")
    start_year = datetime.datetime(datetime.datetime.utcnow().year - age_max, 1,
                                   1)
    end_year = datetime.datetime(datetime.datetime.utcnow().year - age_min, 12,
                                 31)
    query_result = User.objects(Q(cancer__in=include_cancer) &
                                Q(cancer__nin=exclude_cancer) &
                                Q(treatments__exists=True) &
                                Q(treatments__in=include_treatment) &
                                Q(treatments__nin=exclude_treatment) &
                                Q(medications__exists=True) &
                                Q(medications__in=include_medication) &
                                Q(medications__nin=exclude_medication) &
                                Q(gender__in=gender) &
                                Q(date_of_birth__exists=True) &
                                Q(date_of_birth__gte=start_year) &
                                Q(date_of_birth__lte=end_year)).values_list(
        'email')
    return query_result
