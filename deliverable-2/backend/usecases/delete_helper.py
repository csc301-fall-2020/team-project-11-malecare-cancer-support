import datetime

from mongoengine.queryset.visitor import Q

from ..models.session import Session
from ..models.user import User


def delete_user_by_email(email):
    User.objects(email=email).delete()
    return "delete successfully"

def delete_user_by_uid(uid):
    User.objects(user_id=uid).delete()
    return "delete successfully"
