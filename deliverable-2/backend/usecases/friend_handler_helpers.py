from ..models.friend_request import FriendRequest
from ..models.user import User


def create_new_friend_request(sender_uid, receiver_uid):
    new_friend_req = FriendRequest(sender_uid=sender_uid,
                                   receiver_uid=receiver_uid)
    new_friend_req.save()


def accept_friend_request(sender_uid, receiver_uid):
    FriendRequest.objects(sender_uid=sender_uid,
                          receiver_uid=receiver_uid).update(is_accepted=True)
    User.objects(user_id=sender_uid).update(add_to_set__friends=receiver_uid)
    User.objects(user_id=receiver_uid).update(add_to_set__friends=sender_uid)


def decline_friend_request(sender_uid, receiver_uid):
    FriendRequest.objects(sender_uid=sender_uid,
                          receiver_uid=receiver_uid).update(is_accepted=False)


def get_all_undecided_friend_requests_by_receiver_uid(receiver_uid):
    sender_uid_lst = FriendRequest.objects(receiver_uid=receiver_uid,
                                           is_accepted__exists=False).values_list(
        'sender_uid')
    senders = []
    for s in sender_uid_lst:
        sender = User.objects(user_id=s).first().get_json()
        senders.append(sender)
    return senders


def augment_user_dict_with_friends_user_name(user_id):
    user_dict = User.objects(user_id=user_id).first().get_json()
    # print(user_dict)
    friends_id_lst = user_dict['friends']
    friend_username_dict = {}
    for id in friends_id_lst:
        user = User.objects(user_id=id).first()
        if user is not None:
            username = user.get_json()['username']
        else:
            username = "[User deleted]"
        friend_username_dict[id] = username
    user_dict['friend_username'] = friend_username_dict
    return user_dict


def add_friend_to_all_users(user_id):
    User.objects(user_id__ne=user_id).update(add_to_set__friends=user_id)


def delete_friend(current_user_id, friend_id):
    current_user = User.objects(user_id=current_user_id).first()
    if current_user is not None:
        current_user.update(pull__friends=friend_id)
    friend = User.objects(user_id=friend_id).first()
    if friend is not None:
        friend.update(pull__friends=current_user_id)
    return "Successfully delete"
