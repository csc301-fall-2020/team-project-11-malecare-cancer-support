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
    return FriendRequest.objects(receiver_uid=receiver_uid,
                                 is_accepted__exists=False).to_json()


def augment_user_dict_with_friends_user_name(user_id):
    user_dict = User.objects(user_id=user_id).first().get_json()
    print(user_dict)
    friends_id_lst = user_dict['friends']
    friend_username_dict = {}
    for id in friends_id_lst:
        username = User.objects(user_id=id).only('username').first().get_json()[
            'username']
        friend_username_dict[id] = username
    user_dict['friend_username'] = friend_username_dict
    return user_dict


def add_friend_to_all_users(user_id):
    User.objects(user_id__ne=user_id).update(add_to_set__friends=user_id)
