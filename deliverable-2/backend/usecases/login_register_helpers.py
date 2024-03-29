import random
import string

from passlib.context import CryptContext

from ..models.user import User

USER_ID_LENGTH = 6

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


# credit to https://pynative.com/python-generate-random-string/
def generate_random_user_id(length):
    letters = string.ascii_lowercase + '0123456789'
    result_str = ''.join(random.choice(letters) for _ in range(length))
    return result_str


def email_already_existed(email):
    return User.objects(email=email).first() is not None


def hash_str(content):
    return pwd_context.hash(content)


def verify_password_by_email(email, password):
    user = get_user_by_email(email)
    return pwd_context.verify(password, user.get_password())


def get_user_by_email(email):
    return User.objects(email=email).first()


def create_new_user(email, password, date_of_birth, gender, cancer, purpose,
                    sex_orientation, username, region):
    hashed_password = hash_str(password)
    new_user = User(email=email,
                    password=hashed_password,
                    username=username,
                    user_id=generate_random_user_id(USER_ID_LENGTH),
                    date_of_birth=date_of_birth,
                    gender=gender,
                    cancer=cancer,
                    purpose=purpose,
                    sex_orientation=sex_orientation,
                    friends=["0wwv9m"],
                    region=region,
                    gender_bool=False,
                    sex_orientation_bool=False,
                    date_of_birth_bool = False,
                    medications_and_treatments_bool = False,
                    purpose_bool = False,
                    medications = ['None'],
                    treatments = ['None'])
    new_user.save()


def get_user_by_user_id(user_id):
    return User.objects(user_id=user_id).first()


def create_admin(email, password):
    hashed_password = hash_str(password)
    new_user = User(email=email,
                    password=hashed_password,
                    user_id=generate_random_user_id(6),
                    is_admin=True
                    )
    new_user.save()


def get_user_id_by_user_email(email):
    return get_user_by_email(email).get_id()


def is_user_id_existed(user_id):
    return User.objects(user_id=user_id).first() is not None


def get_email_by_id(user_id):
    return User.objects(user_id=user_id).only('email').values_list('email')[0]
