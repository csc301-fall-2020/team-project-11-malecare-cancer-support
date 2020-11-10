from ..models.cancer_types import CancerTypes


def load_to_cancer_type_db(cancer_types_list):
    print(cancer_types_list)
    new_cancer_types = CancerTypes(cancer_types=cancer_types_list)
    new_cancer_types.save()
    return "added cancer types"
