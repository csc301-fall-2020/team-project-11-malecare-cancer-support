import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import axios from "axios";
import face from "../../../assets/face.png";
import image from "../../../assets/image.png";

// import { get } from "../../utils/request";

const PageWrap = styled.div`
  background: rgb(237, 237, 237);
  height: calc(100vh - 60px);
  overflow: auto;
`;
const PageContainer = styled.div`
  width: 80%;
  display: flex;
  margin: 24px auto;
  flex-direction: row;
  height: calc(100vh - 110px);
  border-radius: 4px;
`;
const PageContainerLeft = styled.div`
  width: 300px;
  text-align: center;
  background: white;
`;
const PageContainerRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgb(230, 230, 230);
`;
const MessageTitle = styled.div`
  font-size: 45px;
  font-weight: bold;
  color: rgb(172, 102, 104);
  margin: 20px 0;
`;
const UserList = styled.div`
  font-size: 25px;
  color: rgb(172, 172, 172);
  line-height: 40px;
  text-align: left;
  & > div {
    padding: 0 24px;
    cursor: pointer;
  }
  & > .check {
    color: white;

    background: rgb(210, 197, 197);
  }
`;
const LinkOut = styled.span`
  display: flex;
  flex-direction: row-reverse;
  padding: 12px 24px;
  a {
    margin: 0 12px;
  }
  font-size: 20px;
`;
const ChatWrap = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 20px;
  padding: 10px 24px;
  text-align: left;
  & > div {
    background: white;
    padding: 10px;
    border-radius: 8px;
    margin: 24px 0;
  }
  .chatItemL {
    align-self: start;
    margin-right: 100px;
  }
  .chatItemR {
    align-self: flex-end;
    margin-left: 100px;
  }
`;
const Send = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 24px 0;
  align-items: center;
  & > div:first-child {
    flex: 1;
  }
  & > div:last-child {
    color: white;
    font-size: 25px;
    cursor: pointer;
    text-align: center;
    background: #d54e54;
    line-height: 36px;
    padding: 0 24px;
    border-radius: 20px;
    margin-left: 20px;
  }
`;
const Btns = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  margin: 10px 180px;
  & > img {
    cursor: pointer;
    width: 32px;
    height: 32px;
  }
`;
const InputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 12px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

const Messages = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [userId, setUserId] = useState("");
  const [userList, setUserList] = useState({});
  const [socket, setSocket] = useState();
  const [chatList, setChatList] = useState([]);
  const [inputText, setInputText] = useState();
  const chatRef = useRef();
  const inputRef = useRef();
  const send = () => {
    if (!inputText || !currentUser) return;
    socket.emit("receive_msg", {
      sender_uid: userId,
      receiver_uid: currentUser,
      msg: inputText,
    });
    setChatList([
      ...chatList,
      { text: inputText, sender_uid: userId, receiver_uid: currentUser },
    ]);
    setInputText("");
    inputRef.current.focus();
    setTimeout(() => {
      chatRef.current.scrollTop = 100000;
    }, 0);
  };
  useEffect(() => {
    let socket = io.connect("http://localhost:5000", { reconnection: true });

    socket.emit("index");
    socket.on("chat", () => {
      post("/chat/all_messages_by_user").then((res) => {
        setChatList(res);
        setTimeout(() => {
          chatRef.current.scrollTop = 100000;
        }, 0);
      });
    });
    socket.open();
    setSocket(socket);

    get("/current_user").then((res) => {
      setUserId(res.user_id);
      setUserList(res.friend_username);
      socket.emit("save_session");
    });

    return () => {
      socket.close();
      setSocket(undefined);
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    post("/chat/all_messages_by_user").then((res) => {
      setChatList(res);
      setTimeout(() => {
        chatRef.current.scrollTop = 100000;
      }, 0);
    });
  }, [currentUser]);
  return (
    <PageWrap>
      <PageContainer>
        <PageContainerLeft>
          <MessageTitle>Friends</MessageTitle>
          <UserList>
            {userList &&
              Object.keys(userList).map((keyName, index) => (
                <div
                  className={keyName === currentUser ? "check" : ""}
                  onClick={() => setCurrentUser(keyName)}
                  key={index}
                >
                  {userList[keyName]}
                </div>
              ))}
          </UserList>
        </PageContainerLeft>
        <PageContainerRight>
          <LinkOut>
            <a>block</a>
            <a>report</a>
          </LinkOut>
          <ChatWrap ref={chatRef}>
            {chatList &&
              chatList
                .filter((item) => {
                  return (
                    (item.sender_uid === userId &&
                      item.receiver_uid === currentUser) ||
                    (item.sender_uid === currentUser &&
                      item.receiver_uid === userId)
                  );
                })
                .map((item) => (
                  <div
                    className={
                      item.sender_uid === userId ? "chatItemR" : "chatItemL"
                    }
                  >
                    {item.text}
                  </div>
                ))}
          </ChatWrap>
          <Send>
            <InputField
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div onClick={send}>send</div>
          </Send>
          <Btns>
            <img src={image} />
            <img src={face} />
          </Btns>
        </PageContainerRight>
      </PageContainer>
    </PageWrap>
  );
};

export default Messages;
