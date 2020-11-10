from ..models.message import Message
from .login_register_helpers import is_user_id_existed

SENDER_DNE_MSG = "Create new message failed, sender does not exist."
RECEIVER_DNE_MSG = "Create new message failed, receiver does not exist."
SUCCESS_CREATE_NEW_TEXT_MSG = "Create new message successfully. "


def create_new_text_message(sender_uid, receiver_uid, text):
    if not is_user_id_existed(sender_uid):
        return SENDER_DNE_MSG
    if not is_user_id_existed(receiver_uid):
        return RECEIVER_DNE_MSG

    new_text_msg = Message(sender_uid=sender_uid,
                           receiver_uid=receiver_uid,
                           text=text)
    new_text_msg.save()
    return SUCCESS_CREATE_NEW_TEXT_MSG
