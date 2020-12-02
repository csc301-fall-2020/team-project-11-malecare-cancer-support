from flask import Blueprint

socket_listener = Blueprint('socket_listener', __name__)

from . import friend_request_page_socket, admin_page_socket, connect, chat_socket
