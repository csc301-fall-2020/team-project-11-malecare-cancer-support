import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Input from "../../component-library/Input";
import Checkbox from "../../component-library/Checkbox";
import { getCurrentUser } from "../../utils/helpers";

import {
  Space,
  MainTitleLarge,
  MainSubTitleLarge,
  SecondaryButton,
  ErrorMessageContainer,
} from "../../share-styled-component";

import { UserContext } from "../../../contexts/UserContext";

const LoginPageContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin: -200px 0 0 -300px;
`;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
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

  const handleLogin = async () => {
    if (_.isEmpty(email) || _.isEmpty(password)) {
      return setErrorMessage("Your email and password cannot be empty.");
    }
    //   Initiate Login Request
    const requestBody = { email, password };
    try {
      const response = await axios.post("/login", requestBody);
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
