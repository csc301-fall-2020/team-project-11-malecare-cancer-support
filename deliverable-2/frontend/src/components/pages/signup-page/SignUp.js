import React, { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";

import Input from "../../component-library/Input";
import DatePicker from "../../component-library/DatePicker";
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

import { getUserDetailOptions, signUpUser } from "./helper";

const SignUpPageContainer = styled.div`
  margin: auto;
  width: 600px;
  padding: 24px 0;
`;

const SectionContainer = styled.div`
  text-align: start;
`;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const [purposes, setPurposes] = useState([]);
  const [cancerTypes, setCancerTypes] = useState([]);
  const [sexOrientation, setSexOrientation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userDetailSelections, setUserDetailSelections] = useState({});

  useEffect(() => {
    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
    };

    fetchUserDetailSelections();
  }, []);

  const handleRegister = async () => {
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
      email,
      password,
      date_of_birth: dateOfBirth.toUTCString(), // Date
      gender,
      cancer: cancerTypes, // Array
      purpose: purposes, // Array
      sex_orientation: [sexOrientation], //Array
    };

    console.log({
      requestBody,
    });

    await signUpUser(requestBody);
  };

  return (
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
        <DatePicker
          label="Date of birth (yyyy-mm-dd):"
          onChange={setDateOfBirth}
          date={dateOfBirth}
        />
        <Space height="12px" />
        <SingleCardSelection
          label="Gender:"
          selection={gender}
          updateSelection={setGender}
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
          options={userDetailSelections.purposeOptions || []}
        />
        <Space height="12px" />
        <SingleCardSelection
          label="Sex orientation:"
          selection={sexOrientation}
          updateSelection={setSexOrientation}
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
