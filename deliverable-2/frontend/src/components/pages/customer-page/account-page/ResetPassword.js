import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import { message } from "antd";

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
`;

const SectionDescription = styled.div`
  padding: 12px 0;
`;

const ResetPassword = ({ token }) => {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {console.log(token)}, [])

    useEffect(() => {
        const verifyToken = async () => {
            axios
                .post(HOST_URL + "/reset_password/verify", { token: token })
                .then((res) => {
                    message.success(res.data)
                    return true
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        }
        const fetchUser = async () => {
            const verifed = await verifyToken()
            if (verifed) {
                const fetchedUser = await getCurrentUser();
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
            } else {
                history.push("/");
            }


        };

        fetchUser();
    }, [history, setUser, token]);

    const handleChangePassword = () => {

    }

    return (
        <MainContainer>
          <PageTitleSection>Account Settings</PageTitleSection>
          <Space height="36px" />
          <SectionContainer>
            <div>
              <PageSubTitleSection>Change Password</PageSubTitleSection>
              <SectionDescription>
                <RegularMessage>
                  To change the password of your account, click "Change Password"
                  button.
                </RegularMessage>
                <RegularMessage>
                  We will then send you an email for setting up the new password.
                </RegularMessage>
              </SectionDescription>
            </div>
            <div>
              <PrimaryButton onClick={handleChangePassword}>
                Change password
              </PrimaryButton>
            </div>
          </SectionContainer>
        </MainContainer>
      );

}

export default ResetPassword;