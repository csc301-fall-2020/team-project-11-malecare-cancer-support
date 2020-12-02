# import functools

# import pymongo
from flask import jsonify, request, Blueprint
from flask_login import current_user, login_required

from ..usecases import login_register_helpers, \
    friend_handler_helpers, customize_user_profile_helpers

current_user_page = Blueprint('current_user_page', __name__,
                              static_folder='../../frontend/build/static',
                              template_folder='../../frontend/build/')


@current_user_page.route('/current_user')
@login_required
def get_current_user():
    return jsonify(
        friend_handler_helpers.augment_user_dict_with_friends_user_name(
            current_user.get_id()))


@current_user_page.route('/current_user/profile/update', methods=['POST'])
def change_current_user_profile_update():
    my_json = request.get_json()
    my_id = current_user.get_id()
    my_functions = [customize_user_profile_helpers.set_cancer_types_by_user_id,
                    customize_user_profile_helpers.set_sexual_orientation_by_user_id,
                    customize_user_profile_helpers.set_gender_by_user_id,
                    customize_user_profile_helpers.set_purpose_by_user_id,
                    customize_user_profile_helpers.set_date_of_birth_by_user_id,
                    customize_user_profile_helpers.set_medications_by_user_id,
                    customize_user_profile_helpers.set_treatments_by_user_id,
                    customize_user_profile_helpers.set_short_intro_by_user_id,
                    customize_user_profile_helpers.set_username_by_user_id,
                    customize_user_profile_helpers.
                        set_profile_picture_by_user_id,
                    customize_user_profile_helpers.set_album_pictures_by_user_id,
                    customize_user_profile_helpers.set_region_by_user_id,
                    customize_user_profile_helpers.set_date_of_birth_bool_by_user_id,
                    customize_user_profile_helpers.set_gender_bool_by_user_id,
                    customize_user_profile_helpers.set_sex_orientation_bool_by_user_id,
                    customize_user_profile_helpers.
                        set_medications_and_treatments_bool_by_user_id,
                    customize_user_profile_helpers.set_purpose_bool_by_user_id
                    ]

    my_new_profile_fields = [my_json["cancer"],
                             my_json["sex_orientation"],
                             my_json["gender"],
                             my_json["purpose"],
                             my_json["date_of_birth"],
                             my_json["medications"],
                             my_json["treatments"],
                             my_json["short_intro"],
                             my_json["username"],
                             my_json["profile_picture"],
                             my_json["album_pictures"],
                             my_json["region"],
                             my_json["date_of_birth_bool"],
                             my_json["gender_bool"],
                             my_json["sex_orientation_bool"],
                             my_json["medications_and_treatments_bool"],
                             my_json["purpose_bool"]
                             ]
    for func, field in zip(my_functions, my_new_profile_fields):
        func(my_id, field)
    # customize_user_profile_helpers \
    #     .set_sexual_orientation_by_user_id(user_id=my_id,
    #                                        sex_orientation=my_json["sex_orientation"])
    return jsonify(login_register_helpers.get_user_by_user_id(my_id).get_json())


@current_user_page.route('/current_user/profile/picture', methods=['POST'])
def change_current_user_picture():
    return jsonify({"imgs": "upload picture successfully"})

# @app.route('/current_user/profile/text_show', methods=['POST'])
# def change_current_user_profile_text_show():
#     my_json = request.get_json()
#     my_id = current_user.get_id()
#     my_functions = [profile_boolean_helpers.set_date_of_birth_bool_by_user_id,
#                     profile_boolean_helpers.set_gender_bool_by_user_id,
#                     profile_boolean_helpers.set_sex_orientation_bool_by_user_id,
#                     profile_boolean_helpers.
#                         set_medications_and_treatments_bool_by_user_id,
#                     profile_boolean_helpers.set_purpose_bool_by_user_id
#                     ]
#
#     my_new_profile_fields = [my_json["date_of_birth_bool"],
#                              my_json["gender_bool"],
#                              my_json["sex_orientation_bool"],
#                              my_json["medications_and_treatments_bool"],
#                              my_json["purpose_bool"]
#                              ]
#     for func, field in zip(my_functions, my_new_profile_fields):
#         func(my_id, field)
#     # customize_user_profile_helpers \
#     #     .set_sexual_orientation_by_user_id(user_id=my_id,
#     #                                        sex_orientation=my_json["sex_orientation"])
#     return jsonify(profile_boolean_helpers.get_user_json_by_user_id(my_id))


# print(request.form)
# print(request.files)
# print(request.files.get("file"))
# imgs = request.files.get("file")
# img = Image.open(imgs)
# buffered = BytesIO()
# img.save(buffered, format="PNG")
# img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
# customize_user_profile_helpers. \
#     set_profile_picture_by_user_id(current_user.get_id(), img_str)


# @app.route('/current_user/profile/get_picture', methods=['POST'])
# def get_profile_picture():
#     uid = current_user.get_id()
#     img = customize_user_profile_helpers.get_profile_picture_by_user_id(uid)
#     return jsonify({"imgs": img})


# @app.route('/current_user/profile/album_pictures', methods=['POST'])
# def add_current_user_album_picture():
#     # print(request.form)
#     # print(request.files)
#     # print(request.files.get("file"))
#     # imgs = request.files.get("file")
#     # img = Image.open(imgs)
#     # buffered = BytesIO()
#     # img.save(buffered, format="PNG")
#     # img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
#     # album_pictures = \
#     #     customize_user_profile_helpers. \
#     #         add_album_pictures_by_user_id(current_user.get_id(), img_str)
#     return jsonify({"imgs": "upload album pictures successfully"})


# @app.route('/current_user/profile/delete_album_pictures', methods=['POST'])
# def delete_current_user_album_picture():
#     # print(request.form)
#     # print(request.files)
#     # print(request.files.get("file"))
#     imgs = request.files.get("file")
#     img = Image.open(imgs)
#     buffered = BytesIO()
#     img.save(buffered, format="PNG")
#     img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
#     album_pictures = \
#         customize_user_profile_helpers. \
#             delete_album_pictures_by_user_id(current_user.get_id(), img_str)
#     return jsonify({"imgs": album_pictures})

#
# @app.route('/current_user/profile/get_album_pictures', methods=['POST'])
# def get_album_pictures():
#     uid = current_user.get_id()
#     imgs = customize_user_profile_helpers.get_album_pictures_by_user_id(uid)
#     return jsonify({"imgs": imgs})
