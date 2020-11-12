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

# def is_undecided_friend_request_existing(sender_uid, receiver_uid):
#     return FriendRequest.objects(receiver_uid=receiver_uid,
#                                  sender_uid=sender_uid,
#                                  is_accepted__exists=False) is not None
