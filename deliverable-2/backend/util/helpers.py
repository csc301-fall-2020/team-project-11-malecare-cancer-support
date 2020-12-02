# use for parsing list of strings of ages ["0-10", "11-20", ...]
import datetime
import sys


def age_list_parser(age_lst):
    result = []
    for s in age_lst:
        if s == "over 100":
            result.append((100, 400))
        else:
            age_min, age_max = s.split('-')
            result.append((int(age_min), int(age_max)))
    return result


def get_start_end_year(age_min, age_max):
    start_year = datetime.datetime(datetime.datetime.utcnow().year - age_max, 1,
                                   1)
    end_year = datetime.datetime(datetime.datetime.utcnow().year - age_min, 12,
                                 31)
    return start_year, end_year


def email_lst_to_dict(email_lst):
    output = {"email": []}
    for email in email_lst:
        output["email"].append(email)
    return output


def _friend_request_helper(user_dict, func):
    func(user_dict["sender"],
         user_dict["receiver"])


def print_error():
    e = sys.exc_info()
    for i in e:
        print(i)


if __name__ == '__main__':
    print(age_list_parser(["0-10"]))
    print(age_list_parser(["0-10", "61-67", "over 100"]))
