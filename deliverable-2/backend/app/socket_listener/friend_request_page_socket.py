import sys
from flask import request
from flask_login import current_user
from .decorator import authenticated_only
from backend.app.cancer_chat import socketio
from backend.usecases import handle_session_info_helpers, \
    friend_handler_helpers
from backend.util.helpers import _friend_request_helper, print_error

SOCKET_ERROR_MSG = "Something was wrong."
SOCKET_ON_SUCCESS_MSG = "Successfully sent"


@socketio.on('new_friend_request')
# @authenticated_only
def new_friend_request(payload):
    try:
        print(current_user.get_id(), "FRIEND REQEUST")
        receiver_id = payload['receiver']
        sender_id = current_user.get_id()
        _friend_request_helper({"receiver": receiver_id,
                                "sender": sender_id},
                               friend_handler_helpers.create_new_friend_request)
        session_id = handle_session_info_helpers.get_session_id_by_user_id(
            receiver_id)
        if session_id:
            socketio.emit('get_friend_request', room=session_id)
        socketio.emit('return_new_friend_request', SOCKET_ON_SUCCESS_MSG,
                      room=request.sid)
    except:
        print_error()
        socketio.emit('return_new_friend_request', SOCKET_ERROR_MSG,
                      room=request.sid)


@socketio.on('accept_friend_request')
# @authenticated_only
def accept_friend_request(payload):
    try:
        sender_id = payload['sender']
        receiver_id = current_user.get_id()
        _friend_request_helper({"receiver": receiver_id,
                                "sender": sender_id},
                               friend_handler_helpers.accept_friend_request)

        session_id = handle_session_info_helpers.get_session_id_by_user_id(
            sender_id)
        if session_id:
            socketio.emit('friend_request_accepted', room=session_id)
        socketio.emit('return_accept_friend_request', SOCKET_ON_SUCCESS_MSG,
                      room=request.sid)
    except:
        print_error()
        socketio.emit('return_accept_friend_request', SOCKET_ERROR_MSG,
                      room=request.sid)

