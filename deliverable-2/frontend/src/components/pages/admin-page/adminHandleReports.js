import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";
import { message as alertMessage, Modal } from "antd";
import { HOST_URL } from "../../utils/sharedUrl";
import axios from "axios";
import { getCurrentUser } from "../../utils/helpers";
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
  height: 150px;
  margin: 3px 20px;
`;

const BasicInfo = styled.span`
  font-size: 22px;
  display: block;
  margin: 3px 0px;
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
  const [blockedList, setBlockedList] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const getReportList = async () => {
    const response = await axios.get(HOST_URL + "/report/history");
    return response.data;
  };
  
  const getBlackList = async () => {
    const response = await axios.get(HOST_URL + "/report/black_list");
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

  const handleViewMessage = (reported, reporter) => {
    axios.post(
      HOST_URL + "/report/check_reported_user", 
      {reported_uid: reported, reporter_uid: reporter}
    ).then(value => {
      let messages = value.data;
      console.log(messages);
      return (
        Modal.info({
          title: 'Messages between ' + reported + " and " + reporter,
          content: (
            <div>
              {messages &&
                messages.map((item, index) => {
                  return (
                    <p key={index}>{item["sender_uid"]}: {item["text"]}</p>
                  );
              })}
              {messages.length === 0 && (
                <p>There are no messages between them. </p>
              )}
            </div>
          ),
          onOk() {},
        })
      );
    });
  }

  const handleRemoveBlacklist = (userId) => {
    axios.post(HOST_URL + "/report/black_list/delete", {user_id: userId}).then(() => {
      alertMessage.success("Removed user from blacklist.");
    });
    asyncReq();
  }

  const asyncReq = async () => {
    const reports = await getReportList();
    const blackList = await getBlackList();
    if (reports && blackList) {
      setReportsList(reports);
      setBlockedList(blackList);
      setLoading(false);
    }
  };

  useEffect(() => {
    asyncReq();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getCurrentUser();
      if (!fetchedUser) {
        // User not logged in
        history.push("/");
      } else if (!fetchedUser.is_admin) {
        // User is not admin
        history.push("/matches");
      } else {
        // User fetched and updated
        setUser(fetchedUser);
        asyncReq();
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, history]);

  function ReportCard(props) {
    return (
      <div style={ReportContainer}>
        <BorderContainer>
          <InfoContainer>
            <BasicInfo>Reported user id: {props.reported}</BasicInfo>
            <BasicInfo>Reported user email: {props.email}</BasicInfo>
            <BasicInfo>Reported by: {props.reporter}</BasicInfo>
            <BasicInfo>Report detail: {props.detail}</BasicInfo>
          </InfoContainer>
        </BorderContainer>
        <div style={buttons}>
          <SmallButton
            style={alignedButton}
            onClick={handleViewProfile.bind(this, props.reported)}
          >
            view profile
          </SmallButton>
          <SmallButton
            style={alignedButton}
            onClick={handleViewMessage.bind(this, props.reported, props.reporter)}
          >
            view message
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

  function BlockCard(props) {
    return (
      <div style={ReportContainer}>
        <BorderContainer>
          <InfoContainer>
            <BasicInfo>User id: {props.userId}</BasicInfo>
            <BasicInfo>User email: {props.email}</BasicInfo>
          </InfoContainer>
        </BorderContainer>
        <div style={buttons}>
          <SmallButton
            style={alignedButton}
            onClick={handleViewProfile.bind(this, props.userId)}
          >
            view profile
          </SmallButton>
          <SmallButton
            style={alignedButton}
            onClick={handleRemoveBlacklist.bind(this, props.userId)}
          >
            unblock user
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
              email={item["reported_email"]}
              reporter={item["reporter_uid"]}
              detail={item["report_detail"]}
            />
          );
        })}
      {reportsList.length === 0 && (
        <EmptyMessage>There are currently no reports. </EmptyMessage>
      )}
      <ReportTitle>Blocked Users</ReportTitle>
      {blockedList &&
        blockedList.map((item, index) => {
          return (
            <BlockCard
              key={index}
              userId={item["uid"]}
            />
          );
        })}
      {blockedList.length === 0 && (
        <EmptyMessage>There are currently no blocked users. </EmptyMessage>
      )}
    </ReportPageContainer>
  );
};

export default AdminHandleReports;
