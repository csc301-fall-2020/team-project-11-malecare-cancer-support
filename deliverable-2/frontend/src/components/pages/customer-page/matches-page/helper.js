import axios from "axios";
import { HOST_URL } from "../../../utils/sharedUrl";

const allGenders = [
    "male",
    "female",
    "transgender-female",
    "transgender-male",
    "non-binary",
    "other",
    "prefer not to respond"
]

const male = "male"
const female = "female"
const transFemale = "transgender-female"
const transMale = "transgender-male"
// const nonBinary = "non-binary"
// const other = "other"
const notRespondGender = "prefer not to respond"

const heterosexual = "heterosexual"
const gay = "gay"
const lesbian = "lesbian"
const bisexual = "bisexual"
const pansexual = "pansexual"
const freeSprit = "free spirit"
const notRespondSexOrientation = "prefer not to respond"
const mentor = "mentor"
const mentee = "mentee"
const lover = "looking for love"

const allSexOrientation = [
    "heterosexual",
    "gay",
    "lesbian",
    "bisexual",
    "pansexual",
    "free spirit",
    "prefer not to respond"
]

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

export const getDefaultFilter = (gender, sexOrientation, purpose) => {
    let defaultPurpose = []
    if (purpose.indexOf(mentor) >= 0)
        defaultPurpose.push(mentee)
    if (purpose.indexOf(mentee) >= 0) {
        defaultPurpose.push(mentor)
    }
    if (purpose.indexOf(lover) < 0) {
        return {
            defaultGender: allGenders,
            defaultSexOrientation: allSexOrientation,
            defaultPurpose: defaultPurpose
        }
    }
    defaultPurpose.push(lover)

    return defaultFilterLover(gender, sexOrientation, defaultPurpose)


}

const defaultFilterLover = (gender, sexOrientation, defaultPurpose) => {
    if (gender === notRespondGender || sexOrientation === notRespondSexOrientation) {
        return {
            defaultGender: [],
            defaultSexOrientation: [],
            defaultPurpose: defaultPurpose
        }
    }
    if (sexOrientation === bisexual) {
        return {
            defaultGender: [transMale, male, transFemale, female],
            defaultSexOrientation: [gay, lesbian, bisexual, freeSprit, pansexual],
            defaultPurpose: defaultPurpose
        }
    }
    if (gender === male || gender === transMale) {
        if (sexOrientation === heterosexual) {
            return {
                defaultGender: [transFemale, female],
                defaultSexOrientation: [heterosexual, bisexual, freeSprit, pansexual],
                defaultPurpose: defaultPurpose
            }
        }
        if (sexOrientation === gay || sexOrientation === lesbian) {
            return {
                defaultGender: [transMale, male],
                defaultSexOrientation: [gay, lesbian, bisexual, freeSprit, pansexual],
                defaultPurpose: defaultPurpose
            }
        }
    }
    if (gender === female || gender === transFemale) {
        if (sexOrientation === heterosexual) {
            return {
                defaultGender: [transMale, male],
                defaultSexOrientation: [heterosexual, bisexual, freeSprit, pansexual],
                defaultPurpose: defaultPurpose
            }
        }
        if (sexOrientation === gay || sexOrientation === lesbian) {
            return {
                defaultGender: [female, transFemale],
                defaultSexOrientation: [gay, lesbian, bisexual, freeSprit, pansexual],
                defaultPurpose: defaultPurpose
            }
        }
    }

    return {
        defaultGender: allGenders,
        defaultPurpose: defaultPurpose,
        defaultSexOrientation: allSexOrientation
    }
}