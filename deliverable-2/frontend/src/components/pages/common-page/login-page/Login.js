import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Input from "../../../component-library/Input";
import Checkbox from "../../../component-library/Checkbox";
import { getCurrentUser } from "../../../utils/helpers";

import {
  Space,
  MainTitleLarge,
  MainSubTitleLarge,
  SecondaryButton,
  ErrorMessageContainer,
} from "../../../share-styled-component";

import { UserContext } from "../../../../contexts/UserContext";
import { HOST_URL } from "../../../utils/sharedUrl";

const LoginPageContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin: -200px 0 0 -300px;
`;

const ForgotPasswordSectionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ForgotPasswordButton = styled.div`
  font-size: 18px;
  color: steelblue;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const [rememberUser, setRememberUser] = useState(
    localStorage.getItem("rememberUser") || false
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getCurrentUser();
      if (fetchedUser) {
        history.push(fetchedUser.is_admin ? "/adminSendMessages" : "/matches");
      }
    };

    fetchUser();
  }, [history]);

  const handleChangePassword = async () => {
    // Logic of forgot password goes here
    alert("You forgot your password.");
  };

  const handleLogin = async () => {
    if (_.isEmpty(email) || _.isEmpty(password)) {
      return setErrorMessage("Your email and password cannot be empty.");
    }
    // Update localStorage with latest user email
    if (rememberUser) {
      // Update user credential in localStorage
      localStorage.setItem("rememberUser", true);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      // remove user credential from localStorage
      localStorage.removeItem("rememberUser");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    //   Initiate Login Request
    const requestBody = { email, password };
    try {
      const response = await axios.post(HOST_URL + "/login", requestBody);
      const fetchedUser = response.data;
      setUser(fetchedUser);
      history.push(fetchedUser.is_admin ? "/adminSendMessages" : "/matches");
    } catch (err) {
      setErrorMessage(err.response.data);
    }
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
      <ForgotPasswordSectionContainer>
        <ForgotPasswordButton onClick={handleChangePassword}>
          Forgot Password?
        </ForgotPasswordButton>
      </ForgotPasswordSectionContainer>
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
