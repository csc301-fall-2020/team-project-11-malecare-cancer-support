import sys
from flask_socketio import SocketIO, disconnect


from flask import jsonify, request, Blueprint
from flask_login import current_user
from .cancer_chat import login_required, socketio, authenticated_only, \
    SOCKET_ERROR_MSG, SOCKET_ON_SUCCESS_MSG, print_error, admin_only
from ..usecases import message_handle_helper, handle_report_helpers, \
    friend_handler_helpers, handle_session_info_helpers,\
    administrator_filter_helpers
from ..util import helpers



admin_page = Blueprint('admin_page', __name__, static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')


@admin_page.route('/admin')
@login_required
@admin_only
def get_admin_only_page():
    friend_handler_helpers.add_friend_to_all_users(current_user.get_id())
    return "Yes you are admin"


@admin_page.route('/admin/get_filter_email', methods=['POST'])
@login_required
@admin_only
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
    email_lst = administrator_filter_helpers.get_email_from_admin_filter(
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
    # output = {"email": []}
    # for email in email_lst:
    #     output["email"].append(email)
    return jsonify(helpers.email_lst_to_dict(email_lst))

@socketio.on('admin_send_msg')
@admin_only
@authenticated_only
def admin_send_msg(input_json):
    try:
        print(input_json)
        gender = input_json['includeGenders']
        age_min, age_max = input_json['includeAges']
        include_cancer = input_json['includeCancerTypes']
        exclude_cancer = input_json['excludeCancerTypes']
        include_medication = input_json['includeMedications']
        exclude_medication = input_json['excludeMedications']
        include_treatment = input_json['includeTreatments']
        exclude_treatment = input_json['excludeTreatments']
        message = input_json["message"]
        print("got socket")
        uid_lst = administrator_filter_helpers.get_user_id_from_admin_filter(
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
        for uid in uid_lst:
            sid = handle_session_info_helpers.get_session_id_by_user_id(uid)
            print(sid)
            message_handle_helper.create_new_text_msg(
                sender_uid=current_user.get_id(),
                receiver_uid=uid, text=message)
            socketio.emit('chat', "send to all filter users",
                          room=sid)

        socketio.emit('to_admin', SOCKET_ON_SUCCESS_MSG, room=request.sid)
    except:
        # e = sys.exc_info()[0]
        # print("<p>Error: %s</p>" % e)
        print_error()
        socketio.emit('to_admin', SOCKET_ERROR_MSG, room=request.sid)
