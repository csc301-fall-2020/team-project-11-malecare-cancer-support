from ..models.user import User
import string
import random
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


# credit to https://pynative.com/python-generate-random-string/
def generate_random_user_id(length):
    letters = string.ascii_lowercase + '0123456789'
    result_str = ''.join(random.choice(letters) for _ in range(length))
    return result_str


def email_already_existed(email):
    return User.objects(email=email).first() is not None


def hash(content):
    return pwd_context.hash(content)


def verify_password_by_email(email, password):
    user = get_user_by_email(email)
    return pwd_context.verify(password, user.get_password())


def get_user_by_email(email):
    return User.objects(email=email).first()


def create_new_user(email, password, date_of_birth, gender, cancer, purpose,
                    sex_orientation):
    # date_of_birth = db.DateField()
    # gender = db.StringField()
    # cancer = db.ListField(db.StringField())
    # purpose = db.ListField(db.StringField())
    # sex_orientation

    if not email or not password or not date_of_birth or not gender or not cancer\
            or not purpose or not sex_orientation:
        return "Can not be empty"
    hashed_password = hash(password)
    new_user = User(email=email, password=hashed_password,
                    user_id=generate_random_user_id(6),
                    date_of_birth=date_of_birth,
                    gender=gender,
                    cancer=cancer,
                    purpose=purpose,
                    sex_orientation = sex_orientation)
    new_user.save()
    return "Create new user successfully"


def get_user_by_user_id(user_id):
    return User.objects(user_id=user_id).first()


def is_user_id_existed(user_id):
    return User.objects(user_id=user_id) is not None

