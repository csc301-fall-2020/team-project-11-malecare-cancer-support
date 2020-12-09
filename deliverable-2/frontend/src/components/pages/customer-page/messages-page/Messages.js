import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import axios from "axios";
// import face from "../../../../assets/face.png";
// import image from "../../../../assets/image.png";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../../utils/helpers";
import { UserContext } from "../../../../contexts/UserContext";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { HOST_URL } from "../../../utils/sharedUrl";
import { Button, Input, Badge, message, Modal } from "antd";
// import { get } from "../../utils/request";

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;
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
  padding: 10px 0px;
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

function checkUrlWithString(str_url) {
  var strRegex =
    "((https|http|ftp|rtsp|mms)?://)" +
    "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp user@
    "(([0-9]{1,3}\\.){3}[0-9]{1,3}" + // URL in IP format - 199.194.52.184
    "|" + // allow IP and DOMAIN
    "([0-9a-z_!~*'()-]+\\.)*" + // domain- www.
    "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." + // second domain
    "[a-z]{2,6})" + // first level domain- .com or .museum
    "(:[0-9]{1,4})?" + // port- :80
    "((/?)|" + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)";
  var re = new RegExp(strRegex);
  if (re.test(str_url)) {
    return true;
  } else {
    return false;
  }
}

function getUrlWithString(s) {
  // var reg = "(http://|https://)((w|=|?|.|/|&|-)+)";
  console.log("before", s);
  var reg =
    "(https?|http|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]";
  s = s.match(reg);
  console.log("url", s[0]);
  return s[0];
}

function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST_URL + url, {
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
    axios.post(HOST_URL + url, data).then(
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
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [userId, setUserId] = useState("");
  const [userList, setUserList] = useState({});
  const [socket, setSocket] = useState();
  const [chatList, setChatList] = useState([]);
  const [inputText, setInputText] = useState();
  const [unread, setUnread] = useState([]);
  const chatRef = useRef();
  const inputRef = useRef();
  const [reportVisible, setReportVisible] = useState(false);
  const [reportmsg, setReportmsg] = useState("");
  const [deleteVisible, setDeleteVisible] = useState(false)
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

  const { user, setUser } = useContext(UserContext);
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
  }, [setUser, history]);

  const setUpUnread = () => {
    console.log("SET UP UNREAD")
    axios
      .post(HOST_URL + "/chat/unread_msg_from")
      .then((res) => {
        console.log(res.data);
        setUnread(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let socket = io.connect(HOST_URL, { reconnection: true });

    socket.emit("index");

    socket.open();
    setSocket(socket);

    socket.on("chat", () => {
      console.log("chat handler")
      setUpUnread()

    });

    get("/current_user").then((res) => {
      setUserId(res.user_id);
      setUserList(res.friend_username);
      socket.emit("save_session");
      setUpUnread();
      setLoading(false);
    });

    return () => {
      socket.close();
      setSocket(undefined);
      setLoading(false);
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
    socket && socket.off("chat")
    socket && socket.on("chat", () => {
      console.log("chat handler")
      post("/chat/all_messages_by_user").then((res) => {
        // console.log("res", res);
        setChatList(res);
        setTimeout(() => {
          chatRef.current.scrollTop = 100000;
        }, 0);
        // console.log("341", res);
        const i = res.length - 1;
        if (res[i].sender_uid === currentUser) {
          console.log("344", currentUser);
          // openNotification(res[i].sender_uid, res[i].sender_uid);
          markAsRead(currentUser);
          setUnread(unread.filter((item) => { return item !== currentUser }))
        } else {
          setUpUnread();
        }
      });
    });
  }, [currentUser]);

  const handleOk = () => {
    setReportVisible(false);
    const requestBody = { reported_uid: currentUser, report_detail: reportmsg };
    axios
      .post(HOST_URL + "/new_report", requestBody)
      .then((response) => {
        if (response.status === 200) {
          console.log("success report");
          message.success("Report success!");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Error occurs");
      });
  };

  const handleCancel = () => {
    setReportVisible(false);
    setReportmsg("");
  };

  const handleReport = () => {
    setReportVisible(true);
  };

  const handleSeeFullProfile = () => {
    const w = window.open("about:blank");
    w.location.href = "profile/" + currentUser;
  };

  const handleChatUrl = (item) => {
    const handleUrl = () => {
      const w = window.open("about:blank");
      w.location.href = getUrlWithString(item.text);
    };
    if (checkUrlWithString(item.text)) {
      return (
        <div className={item.sender_uid === userId ? "chatItemR" : "chatItemL"}>
          <a onClick={handleUrl}>{item.text}</a>
        </div>
      );
    } else {
      return (
        <div className={item.sender_uid === userId ? "chatItemR" : "chatItemL"}>
          {item.text}
        </div>
      );
    }
  };
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        console.log("KEY DOWN")
        send()
    }
  }
  const markAsRead = (userId) => {
    axios
      .post(HOST_URL + "/chat/update_message", { sender: userId })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCancel = () =>{
    setDeleteVisible(false)
  }

  const handleDeleteOnClick = () => {
    setDeleteVisible(true)
  }

  const handleDeleteOk = () => {
    setDeleteVisible(false)
    axios
    .post(HOST_URL + "/chat/delete_friend", {friend_id: currentUser})
    .then((res) => {
      get("/current_user").then((res) => {
        setUserList(res.friend_username);
      });
      message.success(res.data)
    })
    .catch((err) => {
      message.error(err.response.data)
    })
  }

  return loading ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
    <PageWrap>
      <PageContainer>
        <PageContainerLeft>
          <MessageTitle>Friends</MessageTitle>
          <UserList>
            {userList &&
              Object.keys(userList).map((keyName, index) => (
                <div
                  className={keyName === currentUser ? "check" : ""}
                  onClick={() => {
                    setCurrentUser(keyName);
                    markAsRead(keyName);
                    // setUpUnread();
                    setUnread(unread.filter((item) => { return item !== keyName }))
                  }}
                  key={index}
                >
                  {userList[keyName]}
                  {unread.indexOf(keyName) >= 0 && (
                    <Badge
                      size="small"
                      count={1}
                      offset={[10, 0]}
                      style={{
                        backgroundColor: "#d75056",
                        color: "#d75056",
                        marginTop: "-3px",
                      }}
                    />
                  )}
                </div>
              ))}
          </UserList>
        </PageContainerLeft>
        <PageContainerRight>
          <Modal
            title="Report"
            visible={reportVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Enter your report reason:</p>
            <Input
              style={{ width: 250 }}
              allowClear
              size={"middle"}
              placeholder="Enter your report reason..."
              value={reportmsg}
              onChange={(event) => {
                setReportmsg(event.target.value);
              }}
            />
          </Modal>
          <Modal
            title="Delete"
            visible={deleteVisible}
            onOk={handleDeleteOk}
            onCancel={handleDeleteCancel}
          >
            <p>Do you want to delete this user from your friend list?</p>
          </Modal>
          <LinkOut>
            {currentUser && userList[currentUser] !== "Cancer Chat Official" ? (
              // <a>block</a>
              <Button type="link" size={"small"} onClick={handleDeleteOnClick}>
                delete
              </Button>
            ) : null}
            {currentUser && userList[currentUser] !== "Cancer Chat Official" ? (
              // <a>report</a>
              <Button type="link" size={"small"} onClick={handleReport}>
                report
              </Button>
            ) : null}
            {currentUser && userList[currentUser] !== "Cancer Chat Official" ? (
              // <a onClick={handleSeeFullProfile}>
              //   See {userList[currentUser]} full profile
              // </a>
              <Button type="link" size={"small"} onClick={handleSeeFullProfile}>
                See {userList[currentUser]} full profile
              </Button>
            ) : null}
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
                .map((item) => handleChatUrl(item))}
          </ChatWrap>
          <Send>
            <InputField
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
            <div onClick={send}>send</div>
          </Send>
          {/* <Btns>
            <img src={image} />
            <img src={face} />
          </Btns> */}
        </PageContainerRight>
      </PageContainer>
    </PageWrap>
  );
};

export default Messages;
