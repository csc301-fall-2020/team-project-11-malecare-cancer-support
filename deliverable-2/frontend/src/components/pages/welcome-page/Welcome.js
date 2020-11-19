import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";
import { getCurrentUser } from "../../utils/helpers";

import {
  Space,
  MainTitleLarge,
  MainSubTitleLarge,
  PrimaryButton,
  SecondaryButton,
} from "../../share-styled-component";

const WelcomePageContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin: -200px 0 0 -300px;
`;

const Welcome = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const fetchedUser = await getCurrentUser();
      setIsLoading(false);
      if (!fetchedUser) return;
      if (fetchedUser.is_admin) {
        history.push("/adminSendMessages");
      } else {
        history.push("/matches");
      }
    };

    fetchUser();
  }, [history]);

  const handleSignup = () => {
    history.push("/signup");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    !isLoading && (
      <WelcomePageContainer>
        <MainTitleLarge>Cancerchat</MainTitleLarge>
        <Space height="24px" />
        <MainSubTitleLarge>
          Meet &amp; chat to someone just like you
        </MainSubTitleLarge>
        <Space height="72px" />
        <div>
          <PrimaryButton onClick={handleSignup}>Create account</PrimaryButton>
        </div>
        <Space height="24px" />
        <div>
          <SecondaryButton onClick={handleLogin}>Login</SecondaryButton>
        </div>
      </WelcomePageContainer>
    )
  );
};

export default Welcome;
