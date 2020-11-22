import axios from "axios";
import { HOST_URL } from "../../utils/sharedUrl";

export const getUserDetailOptions = async () => {
  const [
    cancerTypeOptions,
    treatmentTypeOptions,
    genderOptions,
    sexualOrientationOptions,
    purposeOptions,
    medicationOptions,
  ] = await Promise.all([
    getCancerTypes(),
    getTreatmentTypes(),
    getGenders(),
    getSexualOrientations(),
    getPurposes(),
    getMedications(),
  ]);

  return {
    cancerTypeOptions,
    treatmentTypeOptions,
    genderOptions,
    sexualOrientationOptions,
    purposeOptions,
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

export const getSexualOrientations = async () => {
  const response = await axios.get(HOST_URL + "/load_from_db/sexual_orientations");
  return response.data;
};

export const getMedications = async () => {
  const response = await axios.get(HOST_URL + "/load_from_db/medications");
  return buildAllCancerTypesList(response.data);
};

export const getPurposes = async () => {
  return ["mentor", "mentee", "looking for love"];
};
