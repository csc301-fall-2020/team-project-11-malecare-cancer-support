import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import moment from "moment";
import Input from "../../component-library/Input";
import DatePickerInput from "../../component-library/DatePickerInput";
import Checkbox from "../../component-library/Checkbox";
import SingleCardSelection from "../../component-library/SingleCardSelection";
import MultiCardSelection from "../../component-library/MultiCardSelection";
import MultiSelectionDropdown from "../../component-library/MultiSelectionDropdown";

import {
  Space,
  MainTitle,
  MainSubTitle,
  PrimaryButton,
  ErrorMessageContainer,
} from "../../share-styled-component";

import { getUserDetailOptions } from "./helper";

import { UserContext } from "../../../contexts/UserContext";

import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";

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
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new moment());
  const [gender, setGender] = useState("");
  const [purposes, setPurposes] = useState([]);
  const [cancerTypes, setCancerTypes] = useState([]);
  const [sexOrientation, setSexOrientation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userDetailSelections, setUserDetailSelections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      history.push("/matches");
    }
    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
      setLoading(false);
    };

    fetchUserDetailSelections();
  }, [user, history]);

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
    };

    axios
      .post("/signup", requestBody)
      .then((response) => {
        if (!_.isNil(response, "data.user_id")) {
          setUser(response.data);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
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
        {/* <DatePickerInput
          date={dateOfBirth}
          setDate={setDateOfBirth}
        ></DatePickerInput> */}
        <Space height="12px" />
        <SingleCardSelection
          label="Gender:"
          selection={gender}
          updateSelection={setGender}
          roundedCard
          options={userDetailSelections.genderOptions || []}
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
          label="Are you a mentor, mentee, looking for love or all of them?"
          selections={purposes}
          updateSelections={setPurposes}
          roundedCard
          options={userDetailSelections.purposeOptions || []}
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
      <Checkbox
        label="I agree terms"
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
