import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";

import { getAge, getCurrentUser } from "../../utils/helpers";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";

import UserPhoto from "../../../assets/UserPhoto.png";


const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

const ReportPageContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: row;
  padding: 10px 0px;
  border-radius: 4px;
`;

const ReportTitle = styled.div`
  text-align: left;
  padding: 0px 80px;
  font-size: 38px;
  font-weight: bold;np
  color: #4d222a;
`;

const BorderContainer = styled.div`
  display: flex;
  border-radius: 15px;
  border: 6px solid #d54e54;
  width: 720px;
  height: 150px;
  margin: 10px auto;
`;

const buttons = {
  position: "relative",
  margin: "10px",
  left: "15px",
};

const ReportContainer = {
  height: "200px",
  margin: "0px",
};

const EmptyMessage = styled.div`
  height: 200px;
  margin: 30px;
  font-size: 20px;
`;

const InfoContainer = styled.div`
  height: 200px;
  margin: 10px 10px;
`;

const BasicInfo = styled.span`
  font-size: 19px;
  display: block;
  text-align: left;
  height: 26px;
`;

const Greeting = styled.span`
  font-size: 22px;
  display: block;
  text-align: left;
  height: 26px;
  color: #d54e54;
`;

const alignedButton = {
  display: "inline-block",
  margin: "0px 30px",
};

const circlePiture = {
  width: "100px",
  height: "100px",
  borderRadius: "50px",
  margin: "18px",
};

const SmallButton = styled.button`
  border-radius: 50px;
  background-color: #d54e54;
  color: #ffffff;
  border: 2px solid #d54e54;
  font-size: 16px;
  width: 120px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

function ReportCard(props) {
  return (
    <div style={ReportContainer}>
      <BorderContainer>
        <img style={circlePiture} src={UserPhoto} alt="user photo" />
        <InfoContainer>
          <BasicInfo>Name: {props.name}</BasicInfo>
          <BasicInfo>Age: {props.age}</BasicInfo>
          <BasicInfo>Gender: {props.gender}</BasicInfo>
          <Greeting>"{props.greeting}"</Greeting>
        </InfoContainer>
      </BorderContainer>
      <div style={buttons}>
        <SmallButton
          style={alignedButton}
        >
          View Profile
        </SmallButton>
        <SmallButton
          style={alignedButton}
        >
          refuse
        </SmallButton>
        <SmallButton
          style={alignedButton}
        >
          accept
        </SmallButton>
      </div>
    </div>
  );
}

const AdminHandleReports = () => {
  const { user, setUser } = useContext(UserContext);
  const [reportedList, setReportedList] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  return loading ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
    <ReportPageContainer>
      <ReportTitle>User Reports</ReportTitle>
      {reportedList &&
        reportedList.map((item, index) => {
          return (
            <ReportCard
              key={index}
              name={item["username"]}
              age={getAge(item["date_of_birth"])}
              gender={item["gender"]}
              greeting={item["short_intro"]}
              id={item["user_id"]}
            />
          );
        })}
      {reportedList.length === 0 && (
        <EmptyMessage>There are currently no reports. </EmptyMessage>
      )}
    </ReportPageContainer>
  );
};

export default AdminHandleReports;
