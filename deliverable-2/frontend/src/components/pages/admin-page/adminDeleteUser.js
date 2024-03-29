import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { Space, PrimaryButton } from "../../share-styled-component";
import { Select, message, Modal } from "antd";
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
  const [toDelete, setToDelete] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [emailList, setEmailList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    console.log("11111", toDelete);
  };

  const handleOk = () => {
    setToDelete([]);
    handleDelete();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getEmailList = async () => {
    const response = await axios.post(HOST_URL + "/report/all_emails");
    return response.data;
  };

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
    console.log(options);
    if (options) {
      const temp = options.email.map((value) => {
        return { value: value };
      });
      console.log(temp);
      setEmailList(temp);
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
    const requestBody = { email: toDelete };
    console.log("delete", requestBody);
    axios
      .post(HOST_URL + "/report/delete_user", requestBody)
      .then((response) => {
        message.success(response.data);
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
      <MainTitle>Enter email to delete user</MainTitle>
      <Space height="24px" />
      {emailList ? (
        <Select
          mode="multiple"
          style={{ width: "48%" }}
          placeholder=""
          onChange={handleChange}
          options={emailList}
        />
      ) : null}
      <Space height="24px" />
      <PrimaryButton onClick={showModal}>Delete</PrimaryButton>
      <Modal
        title="Delete confirm"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Are you sure you want to delete these user?</h3>
        {toDelete.map((e) => (
          <p>{e}</p>
        ))}
      </Modal>
    </MainContainer>
  );
};

export default AdminDeleteUser;
