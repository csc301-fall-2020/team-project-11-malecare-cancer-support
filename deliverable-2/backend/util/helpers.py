

# use for parsing list of strings of ages ["0-10", "11-20", ...]
def age_list_parser(age_lst):
    result = []
    for s in age_lst:
        if s == "over 100":
            result.append((100, 400))
        else:
            age_min, age_max = s.split('-')
            result.append((int(age_min), int(age_max)))
    return result

if __name__ == '__main__':
    print(age_list_parser(["0-10"]))
    print(age_list_parser(["0-10", "61-67", "over 100"]))