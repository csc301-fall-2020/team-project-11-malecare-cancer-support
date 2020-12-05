from backend.app.cancer_chat import socketio
from backend.usecases import handle_session_info_helpers, message_handle_helper
from .decorator import authenticated_only

SOCKET_ERROR_MSG = "Something was wrong."
SOCKET_ON_SUCCESS_MSG = "Successfully sent"


@socketio.on('receive_msg')
@authenticated_only
def receive_msg(input_json):
    print(input_json)
    msg = input_json["msg"]
    receiver = input_json["receiver_uid"]
    sender = input_json["sender_uid"]
    session_id = handle_session_info_helpers.get_session_id_by_user_id(receiver)
    message_handle_helper.create_new_text_msg(sender, receiver, msg)
    socketio.emit('chat', "receiver need to read", room=session_id)
