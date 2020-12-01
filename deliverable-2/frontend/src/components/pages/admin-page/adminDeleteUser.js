import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { Space, PrimaryButton } from "../../share-styled-component";
import { Select, message } from "antd";
import "antd/dist/antd.css";
import { getCurrentUser } from "../../utils/helpers";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { HOST_URL } from "../../utils/sharedUrl";
import { css } from "@emotion/react";

const MainContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin: -200px 0 0 -300px;
`;

const MainTitle = styled.div`
  color: #d54e54;
  font-size: 30px;
`;

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

const AdminDeleteUser = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [toDelete, setToDelete] = useState("");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [emailList, setEmailList] = useState([]);

  const getEmailList = async () => {
    const response = await axios.post(HOST_URL + "/report/all_emails");
    return response.data;
  };

  const o = [];
  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    o.push({
      value,
      disabled: i === 10,
    });
  }

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
        setLoading1(false);
      }
    };
    fetchUser();
  }, [history, setUser]);

  const getEmail = async () => {
    const options = await getEmailList();
    if (options) {
      setEmailList(options);
      console.log(options);
      setLoading2(false);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);
    console.log("fdsf", value);
    setToDelete(value);
  }

  function handleDelete() {
    const requestBody = { email: toDelete.split() };
    console.log("delete", requestBody);
    axios
      .post(HOST_URL + "/reset_password/email", requestBody)
      .then((response) => {
        message.success("Delete success");
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  }

  return loading1 || loading2 ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading1 || loading2}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
    <MainContainer>
      <MainTitle>Enter to delete user</MainTitle>
      <Space height="24px" />
      <Select
        mode="multiple"
        style={{ width: "40%" }}
        placeholder=""
        defaultValue={[]}
        onChange={handleChange}
        options={emailList}
      />
      <Space height="24px" />
      <PrimaryButton onClick={handleDelete}>Delete</PrimaryButton>
    </MainContainer>
  );
};

export default AdminDeleteUser;
