import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";
import { message as alertMessage } from "antd";
import { HOST_URL } from "../../utils/sharedUrl";
import axios from "axios";
import { getAge, getCurrentUser } from "../../utils/helpers";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";


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
  margin: 10px 20px;
`;

const BasicInfo = styled.span`
  font-size: 22px;
  display: block;
  margin: 5px 0px;
  text-align: left;
  height: 26px;
`;

const alignedButton = {
  display: "inline-block",
  margin: "0px 30px",
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


const AdminHandleReports = () => {
  const { user, setUser } = useContext(UserContext);
  const [reportsList, setReportsList] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const getReportList = async () => {
    const response = await axios.get(HOST_URL + "/report/history");
    return response.data;
  };

  const handleViewProfile = (reportedId) => {
    const w = window.open("about:blank");
    w.location.href = "/profile/" + reportedId;
  };

  const handleIngoreReport = (reportId) => {
    axios.post(HOST_URL + "/report/ignore", {report_id: reportId}).then(() => {
      alertMessage.success("Report ignored.");
    });
    asyncReq();
  }
  
  const handleBlockByReport = (reportId) => {
    axios.post(HOST_URL + "/report/block", {report_id: reportId}).then(() => {
      alertMessage.success("Blocked user in this report.");
    });
    asyncReq();
  }

  const asyncReq = async () => {
    const reports = await getReportList();
    if (reports) {
      setReportsList(reports);
      console.log(reportsList);
      setLoading(false);
    }
  };

  useEffect(() => {
    asyncReq();
  }, []);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  function ReportCard(props) {
    return (
      <div style={ReportContainer}>
        <BorderContainer>
          <InfoContainer>
            <BasicInfo>Reported user id: {props.reported}</BasicInfo>
            <BasicInfo>Reported by: {props.reporter}</BasicInfo>
            <BasicInfo>Report detail: {props.detail}</BasicInfo>
          </InfoContainer>
        </BorderContainer>
        <div style={buttons}>
          <SmallButton
            style={alignedButton}
            onClick={handleViewProfile.bind(this, props.reported)}
          >
            View Profile
          </SmallButton>
          <SmallButton
            style={alignedButton}
            onClick={handleIngoreReport.bind(this, props.reportId)}
          >
            ignore report
          </SmallButton>
          <SmallButton
            style={alignedButton}
            onClick={handleBlockByReport.bind(this, props.reportId)}
          >
            block user
          </SmallButton>
        </div>
      </div>
    );
  }
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
      {reportsList &&
        reportsList.map((item, index) => {
          return (
            <ReportCard
              key={index}
              reportId={item["report_id"]}
              reported={item["reported_uid"]}
              reporter={item["reporter_uid"]}
              detail={item["report_detail"]}
            />
          );
        })}
      {reportsList.length === 0 && (
        <EmptyMessage>There are currently no reports. </EmptyMessage>
      )}
    </ReportPageContainer>
  );
};

export default AdminHandleReports;
