# import functools

# import pymongo
from flask import jsonify, request, Blueprint
from flask_login import login_required

from ..usecases import administrator_filter_helpers
from ..util import helpers

admin_page = Blueprint('admin_page', __name__,
                       static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')

SELECT_ALL_KEY = "selectedAll"

@admin_page.route('/admin/get_filter_email', methods=['POST'])
@login_required
def admin_get_filter_email():
    input_json = request.get_json()
    gender = input_json['includeGenders']
    age_min, age_max = input_json['includeAges']
    include_cancer = input_json['includeCancerTypes']
    exclude_cancer = input_json['excludeCancerTypes']
    include_medication = input_json['includeMedications']
    exclude_medication = input_json['excludeMedications']
    include_treatment = input_json['includeTreatments']
    exclude_treatment = input_json['excludeTreatments']
    region = input_json['includeRegions']
    if SELECT_ALL_KEY in region:
        email_lst = administrator_filter_helpers.get_email_from_admin_filter_worldwide(
            include_cancer=include_cancer,
            include_medication=include_medication,
            include_treatment=include_treatment,
            exclude_cancer=exclude_cancer,
            exclude_medication=exclude_medication,
            exclude_treatment=exclude_treatment,
            age_min=age_min,
            age_max=age_max,
            gender=gender
        )
    else:
        email_lst = administrator_filter_helpers.get_email_from_admin_filter_region(
            include_cancer=include_cancer,
            include_medication=include_medication,
            include_treatment=include_treatment,
            exclude_cancer=exclude_cancer,
            exclude_medication=exclude_medication,
            exclude_treatment=exclude_treatment,
            age_min=age_min,
            age_max=age_max,
            gender=gender,
            region=region
        )
    return jsonify(helpers.email_lst_to_dict(email_lst))
