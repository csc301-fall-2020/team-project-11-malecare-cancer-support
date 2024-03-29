import axios from "axios";
import { HOST_URL } from "./sharedUrl";

export const formatDate = (date) => {
  const parsedDate = new Date(date);
  let month = "" + (parsedDate.getMonth() + 1);
  let day = "" + parsedDate.getDate();
  const year = parsedDate.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const validateEmailAddress = (emailValue) => {
  const emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return !!emailValue.match(emailformat);
};

export const getAge = (date) => {
  const parsedDate = new Date(date);
  let year = parsedDate.getFullYear();
  const thisYear = new Date().getFullYear();
  return thisYear - year;
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(HOST_URL + "/current_user");
    return response ? response.data : null;
  } catch (err) {
    return null;
  }
};
