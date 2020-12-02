from flask import request
from flask_login import current_user

from backend.app.cancer_chat import socketio
from backend.usecases import handle_session_info_helpers, \
    message_handle_helper, administrator_filter_helpers
from backend.util.helpers import print_error
from backend.app.socket_listener.decorator import authenticated_only

SOCKET_ERROR_MSG = "Something was wrong."
SOCKET_ON_SUCCESS_MSG = "Successfully sent"


@socketio.on('admin_send_msg')
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
        print_error()
        socketio.emit('to_admin', SOCKET_ERROR_MSG, room=request.sid)
