import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";

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

const Account = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
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
    };

    fetchUser();
  }, [history, setUser]);

  const handleChangePassword = () => {};

  const handleDeleteAccount = () => {};

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
      <Space height="36px" />
      <SectionContainer>
        <div>
          <PageSubTitleSection>Delete Account</PageSubTitleSection>
          <SectionDescription>
            <RegularMessage>
              To change the password of your account, click "Delete Account"
              button.
            </RegularMessage>
            <WarningMessage>
              NOTE: This action can NOT be undone!
            </WarningMessage>
          </SectionDescription>
        </div>
        <div>
          <PrimaryButton onClick={handleDeleteAccount}>
            Delete account
          </PrimaryButton>
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default Account;