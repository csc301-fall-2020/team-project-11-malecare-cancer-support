import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import moment from "moment";

import Input from "../../../component-library/Input";
import DatePickerInput from "../../../component-library/DatePickerInput";
import Checkbox from "../../../component-library/Checkbox";
import SingleCardSelection from "../../../component-library/SingleCardSelection";
import MultiCardSelection from "../../../component-library/MultiCardSelection";
import MultiSelectionDropdown from "../../../component-library/MultiSelectionDropdown";
import RegionDropdown from "../../../component-library/RegionDropdown";
import Terms from "./Terms";

import {
  Space,
  MainTitle,
  MainSubTitle,
  PrimaryButton,
  ErrorMessageContainer,
} from "../../../share-styled-component";

import { labelDescription } from "./constant";
import { validateEmailAddress } from "../../../utils/helpers";
import { getUserDetailOptions } from "./helper";
import { getCurrentUser } from "../../../utils/helpers";

import { UserContext } from "../../../../contexts/UserContext";
import { HOST_URL } from "../../../utils/sharedUrl";

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

const dateFormat = "YYYY-MM-DD";

const SignUpPageContainer = styled.div`
  margin: auto;
  width: 600px;
  padding: 24px 0;
`;

const SectionContainer = styled.div`
  text-align: start;
`;

const SignUp = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    new moment("2000-01-01", dateFormat)
  );
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState({});
  const [purposes, setPurposes] = useState([]);
  const [cancerTypes, setCancerTypes] = useState([]);
  const [sexOrientation, setSexOrientation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userDetailSelections, setUserDetailSelections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const fetchedUser = await getCurrentUser();
      if (!fetchedUser) return;
      if (fetchedUser.is_admin) {
        // User logged in as Admin
        history.push("/adminSendMessages");
      } else {
        // User logged in
        history.push("/matches");
      }
    };

    fetchUser();
    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
    };

    fetchUserDetailSelections();
    setLoading(false);
  }, [history]);

  const handleRegister = async () => {
    setErrorMessage("");
    if (
      _.isEmpty(username) ||
      _.isEmpty(email) ||
      _.isEmpty(password) ||
      _.isEmpty(confirmPassword) ||
      _.isNil(dateOfBirth) ||
      _.isEmpty(gender) ||
      _.isEmpty(cancerTypes) ||
      _.isEmpty(purposes) ||
      _.isEmpty(sexOrientation)
    ) {
      return setErrorMessage(
        "Please fill in all the fields and selections above."
      );
    }

    if (
      _.isEmpty(region) ||
      _.isEmpty(_.get(region, "countryData")) ||
      _.isEmpty(_.get(region, "stateData"))
    ) {
      return setErrorMessage(
        "Please fill in your country and state information."
      );
    }

    if (!validateEmailAddress(email)) {
      return setErrorMessage("Invalid email address provided");
    }

    if (password !== confirmPassword) {
      return setErrorMessage(
        "Please provide the same password to both password and confirm password fields."
      );
    }

    if (!agreeTerms) {
      return setErrorMessage(
        "Please agree with our terms and policy in order to register."
      );
    }

    if (moment().diff(dateOfBirth.format(dateFormat), "years") < 18) {
      return setErrorMessage("You must be at least 18 years of old to join.");
    }

    // Initiate Signup Request
    const requestBody = {
      username,
      email,
      password,
      date_of_birth: dateOfBirth.format(dateFormat),
      gender,
      cancer: cancerTypes, // Array
      purpose: purposes, // Array
      sex_orientation: sexOrientation,
      region: region,
    };

    setLoading(true);

    axios
      .post(HOST_URL + "/signup", requestBody)
      .then((response) => {
        if (!_.isNil(response, "data.user_id")) {
          setUser(response.data);
          setLoading(false);
          history.push("/matches");
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.response.data);
      });
  };

  return loading ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
    <SignUpPageContainer>
      {/* Login Info */}
      <SectionContainer>
        <MainTitle>Create account</MainTitle>
        <MainSubTitle>Meet &amp; chat to someone just like you</MainSubTitle>
        <Space height="24px" />
        <Input
          label="Email:"
          inputValue={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Space height="12px" />
        <Input
          label="User Name:"
          inputValue={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Space height="12px" />
        <Input
          label="Password:"
          inputValue={password}
          inputType="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Space height="12px" />
        <Input
          label="Confirm Password:"
          inputValue={confirmPassword}
          inputType="password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <Space height="12px" />
      </SectionContainer>
      <Space height="36px" />

      {/* User Detail */}
      <SectionContainer>
        <MainTitle>More about you ..</MainTitle>
        <Space height="24px" />
        <DatePickerInput
          label="Date of birth (yyyy-mm-dd):"
          onChange={setDateOfBirth}
          date={dateOfBirth}
        />
        <Space height="12px" />
        <SingleCardSelection
          label="Gender:"
          selection={gender}
          updateSelection={setGender}
          roundedCard
          options={userDetailSelections.genderOptions || []}
        />
        <Space height="12px" />
        <RegionDropdown
          label="Location:"
          region={region}
          setRegion={setRegion}
        />
        <Space height="12px" />
        <MultiSelectionDropdown
          label="Types of Cancer:"
          selections={cancerTypes}
          updateSelections={setCancerTypes}
          options={userDetailSelections.cancerTypeOptions}
        />
        <Space height="12px" />
        <MultiCardSelection
          label="What are your labels in CancerChat?"
          selections={purposes}
          updateSelections={setPurposes}
          roundedCard
          options={userDetailSelections.purposeOptions || []}
          flyoutMessages={labelDescription}
        />
        <Space height="12px" />
        <SingleCardSelection
          label="Sex orientation:"
          selection={sexOrientation}
          updateSelection={setSexOrientation}
          roundedCard
          options={userDetailSelections.sexualOrientationOptions || []}
        />
      </SectionContainer>
      <Space height="36px" />

      {/* Action */}
      <Terms></Terms>
      <Checkbox
        label="I agree to the above terms."
        isChecked={agreeTerms}
        onClick={() => {
          setAgreeTerms(!agreeTerms);
        }}
      />
      <Space height="24px" />
      {!_.isEmpty(errorMessage) && (
        <>
          <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
          <Space height="24px" />
        </>
      )}
      <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
    </SignUpPageContainer>
  );
};

export default SignUp;
