# import functools

# import pymongo
from flask import jsonify, request, Blueprint
from flask_login import current_user, login_required

from ..usecases import friend_handler_helpers
from ..util.helpers import _friend_request_helper

friend_request_page = Blueprint('friend_request_page', __name__,
                                static_folder='../../frontend/build/static',
                                template_folder='../../frontend/build/')


# helper
# def _friend_request_helper(user_dict, func):
#     func(user_dict["sender"],
#          user_dict["receiver"])


# @socketio.on('new_friend_request')
# @authenticated_only
# def new_friend_request(payload):
#     try:
#         receiver_id = payload['receiver']
#         sender_id = current_user.get_id()
#         _friend_request_helper({"receiver": receiver_id,
#                                 "sender": sender_id},
#                                friend_handler_helpers.create_new_friend_request)
#         session_id = handle_session_info_helpers.get_session_id_by_user_id(
#             receiver_id)
#         if session_id:
#             socketio.emit('get_friend_request', room=session_id)
#         socketio.emit('return_new_friend_request', SOCKET_ON_SUCCESS_MSG,
#                       room=request.sid)
#     except:
#         print_error()
#         socketio.emit('return_new_friend_request', SOCKET_ERROR_MSG,
#                       room=request.sid)
#
#
# @socketio.on('accept_friend_request')
# @authenticated_only
# def accept_friend_request(payload):
#     try:
#         sender_id = payload['sender']
#         receiver_id = current_user.get_id()
#         _friend_request_helper({"receiver": receiver_id,
#                                 "sender": sender_id},
#                                friend_handler_helpers.accept_friend_request)
#
#         session_id = handle_session_info_helpers.get_session_id_by_user_id(
#             sender_id)
#         if session_id:
#             socketio.emit('friend_request_accepted', room=session_id)
#         socketio.emit('return_accept_friend_request', SOCKET_ON_SUCCESS_MSG,
#                       room=request.sid)
#     except:
#         print_error()
#         socketio.emit('return_accept_friend_request', SOCKET_ERROR_MSG,
#                       room=request.sid)


@friend_request_page.route('/friend_requests/decline', methods=['POST'])
@login_required
def decline_friend_request():
    receiver_id = current_user.get_id()
    sender_id = request.get_json()['sender']
    print({"receiver": receiver_id,
           "sender": sender_id})
    _friend_request_helper({"receiver": receiver_id,
                            "sender": sender_id},
                           friend_handler_helpers.decline_friend_request)
    return "declined", 200


@friend_request_page.route('/friend_requests')
@login_required
def get_undecided_requests():
    return jsonify(
        friend_handler_helpers.
            get_all_undecided_friend_requests_by_receiver_uid(
            current_user.get_id()))
