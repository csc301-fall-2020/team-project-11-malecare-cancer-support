import datetime

from mongoengine.queryset.visitor import Q

from .login_register_helpers import is_user_id_existed
from ..models.message import Message

SENDER_DNE_MSG = "Create new message failed, sender does not exist."
RECEIVER_DNE_MSG = "Create new message failed, receiver does not exist."
SUCCESS_CREATE_NEW_TEXT_MSG = "Create new message successfully. "
SUCCESS_MARK_AS_READ_MSG = "Successfully marked {} messages as read"


def create_new_text_msg(sender_uid, receiver_uid, text):
    if not is_user_id_existed(sender_uid):
        return SENDER_DNE_MSG
    if not is_user_id_existed(receiver_uid):
        return RECEIVER_DNE_MSG

    new_text_msg = Message(sender_uid=sender_uid,
                           receiver_uid=receiver_uid,
                           text=text,
                           send_at=datetime.datetime.utcnow())
    new_text_msg.save()
    return SUCCESS_CREATE_NEW_TEXT_MSG


def get_unread_msg_by_receiver(receiver_uid):
    query_result = Message.objects(receiver_uid=receiver_uid, if_read=False) \
        .order_by('sender_uid', 'send_at').to_json()
    return query_result


def mark_as_read_by_sender_receiver(sender_uid, receiver_uid):
    number_unread_msg = len(
        Message.objects(sender_uid=sender_uid, receiver_uid=receiver_uid,
                        if_read=False))
    Message.objects(sender_uid=sender_uid, receiver_uid=receiver_uid,
                    if_read=False).update(set__if_read=True)
    return SUCCESS_MARK_AS_READ_MSG.format(number_unread_msg)


def unread_msg_sender_list_by_receiver_id(receiver_uid):
    sender_lst = Message.objects(receiver_uid=receiver_uid, if_read=False).values_list('sender_uid')

    # remove duplicates
    sender_lst = list((set(sender_lst)))
    print(sender_lst)
    return sender_lst


def get_message_by_sender_and_receiver_id(sender_uid, receiver_uid):
    query_result = Message.objects(sender_uid=sender_uid,
                                   receiver_uid=receiver_uid). \
        order_by('send_at').to_json()
    return query_result


def get_all_messages_by_user_id(user_id):
    query_result = Message.objects \
        .filter(Q(sender_uid=user_id) | Q(receiver_uid=user_id)) \
        .order_by('send_at').to_json()
    return query_result
