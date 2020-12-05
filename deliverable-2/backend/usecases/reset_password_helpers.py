from time import time

import jwt
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from ..models.user import User
from .login_register_helpers import hash_str


def send_email(sender_email, receiver_email, api_key, url):
    message = Mail(
        from_email=sender_email,
        to_emails=receiver_email,
        subject='Cancer Chat Password Reset',
        html_content=f'<p>Please <a href={url}>click here</a> to reset your password. </p>')
    try:
        sg = SendGridAPIClient(api_key)
        sg.client.mail.send.post(request_body=message.get())
    except Exception as e:
        print(e)
        raise e


def get_token_by_user_id(user_id, key, expire=2000):
    return jwt.encode({'user_id': user_id, 'exp': time() + expire},
                      key=key)


def verify_token(token, key):
    try:
        user_id = jwt.decode(token, key)['user_id']
        return user_id
    except Exception as e:
        print(e)
        return None


def set_password(user_id, password):
    User.objects(user_id=user_id).update(set__password=hash_str(password))
