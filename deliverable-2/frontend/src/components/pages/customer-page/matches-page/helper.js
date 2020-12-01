import axios from "axios";
import { HOST_URL } from "../../../utils/sharedUrl";

export const filterMatches = async (sexOrientation, gender, purpose, age, region) => {
    const requestBody = {
        sex_orientation: sexOrientation,
        gender: gender,
        purpose: purpose,
        age: age,
        region: region,
    }
    console.log(requestBody)
    const response = await axios.post(HOST_URL + "/match", requestBody);
    return response.data
};