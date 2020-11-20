from ..models.session import Session


def is_user_id_existed_in_session_info(user_id):
    return Session.objects(user_id=user_id).first() is not None


def save_session_id_to_user_id(user_id, session_id):
    if not is_user_id_existed_in_session_info(user_id):
        new_session_info = Session(user_id=user_id, session_id=session_id)
        new_session_info.save()
    Session.objects(user_id=user_id).first().update(set__session_id=session_id)
    return "Save session id successfully."


def get_session_id_by_user_id(user_id):
    return Session.objects(user_id=user_id).first().get_session_id()


def get_lst_session_id_by_user_ids(user_id_dict):
    session_info = {}
    print(user_id_dict)
    for uid in user_id_dict:
        sid = Session.objects(user_id=uid).first()
        session_info[uid] = sid
    return session_info
