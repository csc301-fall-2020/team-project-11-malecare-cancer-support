import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getAge, getCurrentUser } from "../../utils/helpers";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";

import io from "socket.io-client";
import { message as alertMessage } from "antd"
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



const Requests = () => {
  const [mSocket, setMSocket] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  // const [requestList, setRequestList] = useState([]);
  const [senderList, setSenderList] = useState([]);
  const getRequestList = async () => {
    const response = await axios.get("/friend_requests");
    return response.data;
  };

  const handleAccept = async (senderId) => {
    mSocket.emit('accept_friend_request', {
      sender: senderId
    });
    asyncReq()
    // alertMessage.success("Request accepted.")
  };
  
  const handleDecline = async (senderId) => {
    axios.post("/friend_requests/decline", {sender: senderId}).then(() => {
      alertMessage.success("Request declined.");
    })
    asyncReq()
  };
  
  const handleViewProfile = (senderId) => {
    const w = window.open("about:blank");
    w.location.href = "/profile/" + senderId;
  };
  

  
  function RequestCard(props) {
    return(
      <div style={RequestContainer}>
        <BorderContainer>
          <img style={circlePiture} src={UserPhoto} alt="user photo"/>
          <InfoContainer>
            <BasicInfo>Name: {props.name}</BasicInfo>
            <BasicInfo>Age: {props.age}</BasicInfo>
            <BasicInfo>Gender: {props.gender}</BasicInfo>
            <Greeting>"{props.greeting}"</Greeting>
          </InfoContainer>
        </BorderContainer>
        <div style={buttons}>
          <SmallButton style={alignedButton} onClick={handleViewProfile.bind(this, props.id)}>
              View Profile
          </SmallButton>
          <SmallButton style={alignedButton } onClick={handleDecline.bind(this, props.id)}>
              refuse
          </SmallButton>
          <SmallButton style={alignedButton} onClick={handleAccept.bind(this, props.id)}>
              accept
          </SmallButton>
        </div>
      </div>
    );
  }
  // const getUser = async (userId) => {
  //   const response = await axios.post("/get_user", {user_id: userId});
  //   return response.data;
  // };

  // const fetchSenders = async () => {
  //   var length, i;
  //   var senders = [];
  //   length = requestList.length;
  //   for (i = 0; i < length; i ++) {
  //     let x = await getUser(requestList[i]["sender_uid"])
  //     senders.push(x);
  //   }
  //   setSenderList(senders);
  //   setLoading(false);
  // }
  
  const asyncReq = async() => {
    const senders = await getRequestList()
    if (senders) {
      setSenderList(senders)
      setLoading(false)
    }
  }

  // const fetchRequests = () => {
  //   getRequestList().then((value) => {
  //     setRequestList(value);
  //     console.log(value)
  //     fetchSenders();
  //   });
  // };

  useEffect(() => {
    const socket = io.connect(socketUrl, {reconnection: true});
    socket.emit("save_session");
    setMSocket(socket);


    socket.on("get_friend_request", () => {
      asyncReq()
    })

    socket.on("return_accept_friend_request", (msg) => {
      asyncReq()
      if (msg === "Successfully sent") {
        alertMessage.success("Request accepted.")
      } else {
        alertMessage.error(msg)
      }
    })
    // asyncReqList()
    // asyncSenderList()
    // axios.get("/friend_requests").then((res) => {
    //   setRequestList(res.data)
    //   var length, i;
    //   var senders = [];
    //   length = requestList.length;
    //   for (i = 0; i < length; i ++) {
    //     getUser(requestList[i]["sender_uid"]).then((x) => {
    //       senders.push(x);
    //       setSenderList(senders);
    //     })
    //   }
      
    //   setLoading(false);
    // })


    asyncReq()
    // fetchRequests();
    console.log(senderList)
    return () => {
      socket.close();
      setMSocket(undefined);
    };
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

    
    // fetchRequests();


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
        {senderList&&senderList.map((item, index) => {
          return(
          <RequestCard
            key = {index}
            name={item["username"]}
            age={getAge(item["date_of_birth"])}
            gender={item["gender"]}
            greeting={item["short_intro"]}
            id = {item["user_id"]}
          />
          );
        })}
    {senderList.length === 0 && (
      <EmptyMessage>You have no new requests. </EmptyMessage>
    )}
    </RequestsPageContainer>
  );
};

export default Requests;
