import React, { useState } from "react";
import _ from "lodash";
import styled from "styled-components";

import Input from "../../component-library/Input";
import Checkbox from "../../component-library/Checkbox";

import {
  Space,
  MainTitleLarge,
  MainSubTitleLarge,
  SecondaryButton,
  ErrorMessageContainer,
} from "../../share-styled-component";

const LoginPageContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin: -200px 0 0 -300px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (_.isEmpty(email) || _.isEmpty(password)) {
      return setErrorMessage("Your email and password cannot be empty.");
    }
    //   Initiate Login Request
    console.log({ email, password });
  };

  return (
    <LoginPageContainer>
      <MainTitleLarge>Cancerchat</MainTitleLarge>
      <Space height="24px" />
      <MainSubTitleLarge>
        Meet &amp; chat to someone just like you
      </MainSubTitleLarge>
      <Space height="72px" />
      <Input
        label="Email:"
        inputValue={email}
        onChange={(event) => {
          setEmail(event.target.value);
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
      <Checkbox
        label="Remember me"
        isChecked={rememberUser}
        onClick={() => {
          setRememberUser(!rememberUser);
        }}
      />
      <Space height="24px" />
      {!_.isEmpty(errorMessage) && (
        <>
          <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
          <Space height="24px" />
        </>
      )}
      <SecondaryButton onClick={handleLogin}>Login</SecondaryButton>
    </LoginPageContainer>
  );
};

export default Login;
