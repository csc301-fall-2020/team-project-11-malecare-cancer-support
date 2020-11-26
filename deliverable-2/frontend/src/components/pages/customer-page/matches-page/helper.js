import axios from "axios";
import { HOST_URL } from "../../../utils/sharedUrl";

export const filterMatches = async (sexOrientation, gender, purpose) => {
    const requestBody = {
        sex_orientation: sexOrientation,
        gender: gender,
        purpose: purpose
    }
    console.log(requestBody)
    const response = await axios.post(HOST_URL + "/match", requestBody);
    return response.data
};