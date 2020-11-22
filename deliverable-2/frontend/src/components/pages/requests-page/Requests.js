import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../utils/helpers";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";

import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { socketUrl } from "../../utils/sharedUrl";
import UserPhoto from "../../../assets/UserPhoto.png";

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

const RequestsPageContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: row;
  padding: 10px 0px;
  border-radius: 4px;
`;

const RequestTitle = styled.div`
  text-align: left;
  padding: 0px 80px;
  font-size: 38px;
  font-weight: bold;
  color: #4d222a;
`;

const BorderContainer = styled.div`
  display: flex;
  border-radius: 15px;
  border: 6px solid #d54e54;
  padding: 20px;
  width: 720px;
  height: 150px;
  margin: 10px auto;
`;

const buttons = {
  position: "relative",
  margin: "10px",
  left: "15px",
};

const RequestContainer = {
  height: "200px",
  margin: "0px",
}

const EmptyMessage = styled.div`
  height: 200px;
  margin: 30px;
  font-size: 20px;
`;

const alignedButton = {
  display: "inline-block",
  margin: "0px 30px",
};

const circlePiture = {
  width: "100px",
  height: "100px",
  borderRadius: "50px",
};

const SmallButton = styled.button`
  border-radius: 50px;
  background-color: #d54e54;
  color: #ffffff;
  border: 2px solid #d54e54;
  font-size: 16px;
  width: 100px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

function RequestCard(props) {
  return(
    <div style={RequestContainer}>
      <BorderContainer>
        <img style={circlePiture} src={UserPhoto} alt="user photo"/>
        Request place holder {props.name}
      </BorderContainer>
      <div style={buttons}>
        <SmallButton style={alignedButton}>
            ignore
        </SmallButton>
        <SmallButton style={alignedButton}>
            refuse
        </SmallButton>
        <SmallButton style={alignedButton}>
            accept
        </SmallButton>
      </div>
    </div>
  );
}

const Requests = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [requestList, setRequestList] = useState();
  const getRequestList = async () => {
    const response = await axios.get("/friend_requests");
    console.log(">>>>>response.data")
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setRequestList(await getRequestList());
      setLoading(false);
    };
    fetchRequests();
  }, []);

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

  return loading ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
    <RequestsPageContainer>
      <RequestTitle>Chat Requests</RequestTitle>
        {requestList.map((item, index) => {
          return(
          <RequestCard name="CancerChat"/>
          );
        })}
        {requestList.length == 0 && (
          <EmptyMessage>You have no new requests. </EmptyMessage>
        )}
    </RequestsPageContainer>
  );
};

export default Requests;
