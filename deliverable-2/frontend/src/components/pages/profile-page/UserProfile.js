import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Typography, Image } from "antd";
import styles from "./MyProfile.module.css";
import "antd/dist/antd.css";
import _ from "lodash";
import axios from "axios";
import styled from "styled-components";
import UserPhoto from "../../../assets/UserPhoto.png";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../utils/helpers";
import { UserContext } from "../../../contexts/UserContext";

// const dateFormat = "YYYY-MM-DD";

import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

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
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(true);

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
        setNavLoading(false);
      }
    };
    fetchUser();
  }, [setUser, history]);

  const requestBody = { user_id: match.params.id };
  const [profileUser, setProfileUser] = useState({});
  const getProfileInfo = async () => {
    const response = await axios.post("/get_user", requestBody);
    return response.data;
  };
  useEffect(() => {
    const fetchUser = async () => {
      setProfileUser(await getProfileInfo());
      setLoading(false);
    };

    fetchUser();
  }, []);

  return loading || navLoading ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading || navLoading}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
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
            <Col span={8}>
              {profileUser && profileUser.username
                ? profileUser.username
                : null}
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Day of birth:</Col>
            <Col span={8}>
              {profileUser && profileUser.date_of_birth
                ? timeFormat(profileUser.date_of_birth)
                : null}
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Gender:</Col>
            <Col span={8}>
              {profileUser && profileUser.gender ? profileUser.gender : null}
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Sex-Orientation:</Col>
            <Col span={8}>
              {profileUser && profileUser.sex_orientation
                ? profileUser.sex_orientation
                : null}
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Type(s) of cancer:</Col>
            <Col span={8}>
              {profileUser && profileUser.cancer ? profileUser.cancer : null}
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Greeting message:</Col>
            <Col span={8}>
              {profileUser && profileUser.short_intro
                ? profileUser.short_intro
                : null}
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
