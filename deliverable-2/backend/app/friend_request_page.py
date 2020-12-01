from flask import jsonify, request, Blueprint
from flask_login import current_user
from .cancer_chat import login_required, admin_only
from ..usecases import message_handle_helper, handle_report_helpers, \
    friend_handler_helpers

friend_request_page = Blueprint('friend_request_page', __name__, static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')



def _friend_request_helper(user_dict, func):
    func(user_dict["sender"],
         user_dict["receiver"])

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
