
from flask import request
from flask_login import current_user

from backend.app.cancer_chat import socketio
from backend.usecases import handle_session_info_helpers
from .decorator import authenticated_only


@socketio.on('connect')
@authenticated_only
def socket_connect():
    print("connect")
    user_id = current_user.get_id()
    session_id = request.sid
    handle_session_info_helpers.save_session_id_to_user_id(user_id, session_id)
