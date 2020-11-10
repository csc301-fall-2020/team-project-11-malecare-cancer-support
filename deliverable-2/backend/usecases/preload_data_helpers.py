from ..models.cancer_types import CancerTypes

EMPTY_DB_MSG = "the db does not have documents of cancer types, please load it"


def load_to_cancer_type_db(cancer_types_list):
    print(cancer_types_list)
    new_cancer_types = CancerTypes(cancer_types=cancer_types_list)
    new_cancer_types.save()
    return "added cancer types"


def get_cancer_types():
    query_result = CancerTypes.objects(cancer_types__exists=True)
    if query_result is None:
        return EMPTY_DB_MSG
    else:
        return query_result.first()["cancer_types"]
