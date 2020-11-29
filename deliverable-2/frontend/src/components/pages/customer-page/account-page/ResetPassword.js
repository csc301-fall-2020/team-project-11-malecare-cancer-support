import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import { css } from "@emotion/react";
import { message } from "antd";
import Input from "../../../component-library/Input";
import { UserContext } from "../../../../contexts/UserContext";
import { getCurrentUser } from "../../../utils/helpers";
import {
  PageTitleSection,
  PageSubTitleSection,
  Space,
  RegularMessage,
  WarningMessage,
  PrimaryButton,
} from "../../../share-styled-component";
import { HOST_URL } from "../../../utils/sharedUrl";
import { PulseLoader } from "react-spinners";

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

const MainContainer = styled.div`
  margin: auto;
  padding: 10px 0;
  width: 80%;
  text-align: start;
`;

const SectionContainer = styled.div`
  margin: auto;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;
const PasswordContainer = styled.div`
  text-align: start;
`;

const ResetPassword = ({ match }) => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const token = _.get(match, "params.id");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   // console.log(token);
  //   console.log(_.get(match, "params.id"));
  // }, []);

  useEffect(() => {
    const verifyToken = async () => {
      axios
        .post(HOST_URL + "/reset_password/verify", { token: token })
        .then((res) => {
          message.success(res.data);
          getCurrentUser()
            .then((fetchedUser) => {
              setLoading(false)
              if (!fetchedUser) {
                // User not logged in
                history.push("/");
              } else if (fetchedUser.is_admin) {
                // User is admin
                history.push("/adminSendMessages");
              } else {
                // User fetched and updated
                setUser(fetchedUser);
              }
            })
            .catch((err) => {
              console.log(err.response.data);
              history.push("/");
            })
        })
        .catch((err) => {
          console.log(err.response.data);
          history.push("/");
        });
    };
    // const fetchUser = async () => {
    //   await verifyToken();
    //   console.log(verified)
    //   if (verified) {
    //     const fetchedUser = await getCurrentUser();
    //     if (!fetchedUser) {
    //       // User not logged in
    //       history.push("/");
    //     } else if (fetchedUser.is_admin) {
    //       // User is admin
    //       history.push("/adminSendMessages");
    //     } else {
    //       // User fetched and updated
    //       setUser(fetchedUser);
    //     }
    //   } else {
    //     history.push("/");
    //   }
    // };

    verifyToken();
  }, [history, setUser]);

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      message.error("Please provide the same password to both password and confirm password fields.")
      return
    }

    axios
      .post('/reset_password/set', { password: password })
      .then((res) => {
        message.success(res.data);
        history.push("/");
      })
      .catch((err) => {
        message.error(err.response.data)
      })

  };

  return loading ? <PulseLoader
    css={loaderCSS}
    size={40}
    loading={loading}
    color="rgb(172, 102, 104)"
  ></PulseLoader> : (
      <MainContainer>
        <PageTitleSection>Account Settings</PageTitleSection>
        <Space height="36px" />
        <SectionContainer>
          <PasswordContainer>
            {/* <PageSubTitleSection>Change Password</PageSubTitleSection>
          <SectionDescription>
            <RegularMessage>
              To change the password of your account, click "Change Password"
              button.
            </RegularMessage>
            <RegularMessage>
              We will then send you an email for setting up the new password.
            </RegularMessage>
          </SectionDescription> */}
            <Input
              label="New Password: "
              inputValue={password}
              inputType="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Space height="12px" />
            <Input
              label="Confirm New Password:"
              inputValue={confirmPassword}
              inputType="password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />

          </PasswordContainer>
          <div>
            <PrimaryButton onClick={handleChangePassword}>
              Change password
          </PrimaryButton>
          </div>
        </SectionContainer>
      </MainContainer>
    );
};

export default ResetPassword;
