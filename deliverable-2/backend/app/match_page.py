
from flask import jsonify, request, Blueprint
from flask_login import current_user, login_required

from ..usecases import match_helpers

match_page = Blueprint('match_page', __name__,
                       static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')


@match_page.route('/match', methods=['POST'])
@login_required
def find_matches():
    my_json = request.get_json()
    age_min, age_max = my_json["age"]
    region = my_json["region"]
    if region == {}:
        region = current_user.get_json()['region']

    return jsonify(match_helpers.find_match(
        sex_orientation_lst=my_json["sex_orientation"],
        gender_lst=my_json["gender"],
        purpose_lst=my_json["purpose"],
        cancer_type_lst=current_user.get_json()['cancer'],
        current_uid=current_user.get_id(),
        age_max=age_max,
        age_min=age_min,
        region=region))
