from mongoengine.queryset.visitor import Q

from ..models.user import User
from ..util import helpers


def get_user_id_from_admin_filter_worldwide(include_cancer, exclude_cancer,
                                            include_treatment, exclude_treatment,
                                            include_medication, exclude_medication,
                                            gender, age_min, age_max):
    query_result = _worldwide_filter(include_cancer, exclude_cancer,
                                     include_treatment, exclude_treatment,
                                     include_medication, exclude_medication, gender,
                                     age_min, age_max).values_list('user_id')

    return query_result


def get_email_from_admin_filter_worldwide(include_cancer, exclude_cancer,
                                          include_treatment, exclude_treatment,
                                          include_medication, exclude_medication, gender,
                                          age_min, age_max):
    query_result = _worldwide_filter(include_cancer, exclude_cancer,
                                     include_treatment, exclude_treatment,
                                     include_medication, exclude_medication, gender,
                                     age_min, age_max).values_list('email')
    return query_result


def get_user_id_from_admin_filter_region(include_cancer, exclude_cancer,
                                         include_treatment, exclude_treatment,
                                         include_medication, exclude_medication, gender,
                                         age_min, age_max, region):
    query_result = _region_filter(include_cancer, exclude_cancer,
                                  include_treatment, exclude_treatment,
                                  include_medication, exclude_medication, gender,
                                  age_min, age_max, region).values_list('user_id')
    return query_result


def get_email_from_admin_filter_region(include_cancer, exclude_cancer,
                                       include_treatment, exclude_treatment,
                                       include_medication, exclude_medication, gender,
                                       age_min, age_max, region):
    query_result = _region_filter(include_cancer, exclude_cancer,
                                  include_treatment, exclude_treatment,
                                  include_medication, exclude_medication, gender,
                                  age_min, age_max, region).values_list('email')
    return query_result


def get_all_emails():
    return User.objects().only('email').values_list('email')


def _worldwide_filter(include_cancer, exclude_cancer,
                      include_treatment, exclude_treatment,
                      include_medication, exclude_medication, gender,
                      age_min, age_max):
    start_year, end_year = helpers.get_start_end_year(age_min=age_min, age_max=age_max)
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
                                Q(date_of_birth__lte=end_year))
    return query_result


def _region_filter(include_cancer, exclude_cancer,
                   include_treatment, exclude_treatment,
                   include_medication, exclude_medication, gender,
                   age_min, age_max, region):
    start_year, end_year = helpers.get_start_end_year(age_min=age_min, age_max=age_max)
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
                                Q(date_of_birth__lte=end_year) &
                                Q(region=region))
    return query_result
