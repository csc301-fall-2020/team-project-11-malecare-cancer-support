import axios from "axios";
import { HOST_URL } from "../../utils/sharedUrl";

export const getUserDetailOptions = async () => {
  const [
    ageOptions,
    cancerTypeOptions,
    treatmentTypeOptions,
    genderOptions,
    medicationOptions,
  ] = await Promise.all([
    getAges(),
    getCancerTypes(),
    getTreatmentTypes(),
    getGenders(),
    getMedications(),
  ]);

  return {
    ageOptions,
    cancerTypeOptions,
    treatmentTypeOptions,
    genderOptions,
    medicationOptions,
  };
};

const buildAllCancerTypesList = (cancerTypeByInitial) => {
  const keys = Object.keys(cancerTypeByInitial);
  let cancerTypeList = [];
  keys.forEach((key) => {
    cancerTypeList = cancerTypeList.concat(cancerTypeByInitial[key]);
  });
  return cancerTypeList;
};

export const getCancerTypes = async () => {
  const response = await axios.get(HOST_URL + "/load_from_db/cancer_types");
  return buildAllCancerTypesList(response.data);
};

export const getTreatmentTypes = async () => {
  const response = await axios.get(HOST_URL + "/load_from_db/treatment_types");
  return response.data;
};

export const getGenders = async () => {
  const response = await axios.get(HOST_URL + "/load_from_db/genders");
  return response.data;
};

export const getMedications = async () => {
  const response = await axios.get(HOST_URL + "/load_from_db/medications");
  return buildAllCancerTypesList(response.data);
};

export const getAges = async () => {
  return [
    "0-10",
    "11-20",
    "21-30",
    "31-40",
    "41-50",
    "51-60",
    "61-70",
    "71-80",
    "81-90",
    "91-100",
    "over 100",
  ];
};
