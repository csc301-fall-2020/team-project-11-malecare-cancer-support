
from flask import jsonify, request, Blueprint

from ..usecases import preload_data_helpers

preload_data = Blueprint('preload_data', __name__, static_folder='../../frontend/build/static',
                         template_folder='../../frontend/build/')


# this is only for initializing empty database,
# data can be found under backend/app/database_preload_backup/
@preload_data.route('/load_to_db', methods=['POST'])
def load_to_db():
    return preload_data_helpers \
        .load_to_cancer_type_db(
        cancer_type_lst=request.get_json()["cancer_types"],
        treatment_lst=request.get_json()["treatment_types"],
        sexual_orientation_lst=request.get_json()["sexual_orientations"],
        gender_lst=request.get_json()["genders"],
        medication_lst=request.get_json()["medications"],
    )


@preload_data.route('/add_none_to_medication_and_treatment', methods=['POST'])
def add_none_to_medication_and_treatment():
    preload_data_helpers.add_none_to_all_users_medication_and_treatment()
    return "Update Successfully"


@preload_data.route('/load_from_db/cancer_types')
def get_cancer_types():
    return jsonify(preload_data_helpers.get_cancer_types())


@preload_data.route('/load_from_db/treatment_types')
def get_treatment_types():
    return jsonify(preload_data_helpers.get_treatment_types())


@preload_data.route('/load_from_db/genders')
def get_genders():
    return jsonify(preload_data_helpers.get_genders())


@preload_data.route('/load_from_db/sexual_orientations')
def get_sexual_orientations():
    return jsonify(preload_data_helpers.get_sexual_orientations())


@preload_data.route('/load_from_db/medications')
def get_medications():
    return jsonify(preload_data_helpers.get_medications())
