import axios from "axios";

export const filterMatches = async (sexOrientation, gender, purpose) => {
    const requestBody = {
        sex_orientation: sexOrientation,
        gender: gender,
        purpose: purpose
    }
    console.log(requestBody)
    const response = await axios.post("/match", requestBody);
    return response.data
};