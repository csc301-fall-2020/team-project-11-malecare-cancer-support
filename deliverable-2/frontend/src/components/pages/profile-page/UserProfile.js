import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Image } from "antd";
import styles from "./MyProfile.module.css";
import "antd/dist/antd.css";
import _ from "lodash";
import axios from "axios";
import styled from "styled-components";
import UserPhoto from "../../../assets/UserPhoto.png";

// const dateFormat = "YYYY-MM-DD";

const ProfileTitle = styled.div`
  font-size: 38px;
  font-weight: bold;
  color: #4d222a;
`;

const timeFormat = (inputString) => {
  const d = new Date(inputString);
  var month = (d.getMonth() + 1).toString().padStart(2, "0");
  var day = d.getDate().toString().padStart(2, "0");
  var result = d.getFullYear() + "-" + month + "-" + day;
  return result;
};

const UserProfile = ({ match }) => {
  const requestBody = { user_id: match.params.id };

  const [user, setUser] = useState({});
  const getProfileInfo = async () => {
    const response = await axios.post("/get_user", requestBody);
    return response.data;
  };
  useEffect(() => {
    const fetchUser = async () => {
      setUser(await getProfileInfo());
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.ProfileContainer}>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col>
          <ProfileTitle>User profile</ProfileTitle>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>

        <Col span={8}>
          <Image width={250} src={UserPhoto} />
        </Col>
        <Col span={14}>
          <Row>
            <Col span={4}>Names:</Col>
            <Col span={8}>{user && user.username ? user.username : null}</Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Day of birth:</Col>
            <Col span={8}>
              {user && user.date_of_birth
                ? timeFormat(user.date_of_birth)
                : null}
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Gender:</Col>
            <Col span={8}>{user && user.gender ? user.gender : null}</Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Sex-Orientation:</Col>
            <Col span={8}>
              {user && user.sex_orientation ? user.sex_orientation : null}
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Type(s) of cancer:</Col>
            <Col span={8}>{user && user.cancer ? user.cancer : null}</Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Greeting message:</Col>
            <Col span={8}>
              {user && user.short_intro ? user.short_intro : null}
            </Col>
          </Row>
          <p></p>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col>
          <ProfileTitle>User's album</ProfileTitle>
          <p></p>
          <Row gutter={16}>
            <Col>
              {" "}
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col>
              {" "}
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col>
              {" "}
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
