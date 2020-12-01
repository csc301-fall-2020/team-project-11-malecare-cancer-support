from flask import jsonify, request, Blueprint
from flask_login import current_user
from .cancer_chat import login_required
from ..usecases import message_handle_helper

chat_page = Blueprint('chat_page', __name__, static_folder='../../frontend/build/static',
                       template_folder='../../frontend/build/')


@chat_page.route('/chat/new_message', methods=['POST'])
def create_new_msg():
    my_json = request.get_json()
    return message_handle_helper.create_new_text_msg(
        sender_uid=my_json["sender"],
        receiver_uid=my_json["receiver"],
        text=my_json["text"])


@login_required
@chat_page.route('/chat/unread_message', methods=['POST'])
def get_unread_msg_by_receiver():
    return message_handle_helper.get_unread_msg_by_receiver(
        request.get_json()["receiver"])


@login_required
@chat_page.route('/chat/update_message', methods=['POST'])
def mark_as_read():
    my_json = request.get_json()
    return message_handle_helper.mark_as_read_by_sender_receiver(
        sender_uid=my_json['sender'],

        receiver_uid=current_user.get_id())


@login_required
@chat_page.route('/chat/unread_msg_from', methods=['POST'])
def get_unread_msg_from_friends_id():
    return jsonify(message_handle_helper \
                   .unread_msg_sender_list_by_receiver_id(current_user.get_id()))


@login_required
@chat_page.route('/chat/all_messages_by_user', methods=['POST'])
def get_all_messages_relate_to_current_user():
    return message_handle_helper.get_all_messages_by_user_id(
        current_user.get_id())
