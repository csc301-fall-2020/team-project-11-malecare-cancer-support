import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Image } from "antd";
import styles from "./MyProfile.module.css";
import "antd/dist/antd.css";
import axios from "axios";
import styled from "styled-components";
import UserPhoto from "../../../../assets/UserPhoto.png";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../../utils/helpers";
import { UserContext } from "../../../../contexts/UserContext";

import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { HOST_URL } from "../../../utils/sharedUrl";

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

const NotFoundSection = styled.div`
  text-align: center;
  color: #d54e54;
  font-size: 60px;
  position: absolute;
  left: 38%;
  top: 35%;
`;

const timeFormat = (inputString) => {
  const d = new Date(inputString);
  var month = (d.getMonth() + 1).toString().padStart(2, "0");
  var day = d.getDate().toString().padStart(2, "0");
  var result = d.getFullYear() + "-" + month + "-" + day;
  return result;
};

function regionToString(region) {
  return (
    region.cityData.data.name +
    ", " +
    region.stateData.data.name +
    ", " +
    region.countryData.data.name
  );
}

const UserProfile = ({ match }) => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getCurrentUser();
      if (!fetchedUser) {
        // User not logged in
        history.push("/");
        // } else if (fetchedUser.is_admin) {
        //   // User is admin
        //   history.push("/adminSendMessages");
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
    axios
      .post(HOST_URL + "/get_user", requestBody)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        setNotFound(true);
      });
  };
  useEffect(() => {
    const fetchUser = async () => {
      setProfileUser(await getProfileInfo());
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (notFound) {
    return <NotFoundSection>404: Page not found</NotFoundSection>;
  }

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
          <Image
            width={250}
            src={
              profileUser && profileUser.profile_picture
                ? profileUser.profile_picture
                : UserPhoto
            }
          />
        </Col>
        <Col span={14}>
          <Row>
            <Col span={4}>Names:</Col>
            <Col span={12}>
              {profileUser && profileUser.username
                ? profileUser.username
                : null}
            </Col>
          </Row>
          <p></p>
          {profileUser && profileUser.date_of_birth_bool ? (
            <>
              <Row>
                <Col span={4}>Day of birth:</Col>
                <Col span={12}>{timeFormat(profileUser.date_of_birth)} </Col>
              </Row>
              <p></p>
            </>
          ) : null}
          {profileUser && profileUser.gender_bool ? (
            <>
              <Row>
                <Col span={4}>Gender:</Col>
                <Col span={12}>{profileUser.gender} </Col>
              </Row>
              <p></p>
            </>
          ) : null}
          {profileUser && profileUser.sex_orientation_bool ? (
            <>
              <Row>
                <Col span={4}>Sex-Orientation:</Col>
                <Col span={12}>{profileUser.sex_orientation}</Col>
              </Row>
              <p></p>
            </>
          ) : null}
          <Row>
            <Col span={4}>Type(s) of cancer:</Col>
            <Col span={12}>
              {profileUser && profileUser.cancer
                ? profileUser.cancer.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })
                : null}
            </Col>
          </Row>
          <p></p>
          {profileUser && profileUser.purpose_bool ? (
            <>
              <Row>
                <Col span={4}>Purpose:</Col>
                <Col span={12}>
                  {profileUser.purpose.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
                </Col>
              </Row>
              <p></p>
            </>
          ) : null}
          <Row>
            <Col span={4}>Region:</Col>
            <Col span={12}>
              {profileUser && profileUser.region
                ? regionToString(profileUser.region)
                : null}
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col span={4}>Greeting message:</Col>
            <Col span={12}>
              {profileUser && profileUser.short_intro
                ? profileUser.short_intro
                : null}
            </Col>
          </Row>
          <p></p>
          {profileUser && profileUser.date_of_birth_bool ? (
            <>
              <Row>
                <Col span={4}>Medication:</Col>
                <Col span={12}>
                  {profileUser && profileUser.medications
                    ? profileUser.medications.map((item, index) => {
                        return <div key={index}>{item}</div>;
                      })
                    : null}
                </Col>
              </Row>
              <p></p>

              <Row>
                <Col span={4}>Treatment:</Col>
                <Col span={12}>
                  {profileUser && profileUser.treatments
                    ? profileUser.treatments.map((item, index) => {
                        return <div key={index}>{item}</div>;
                      })
                    : null}
                </Col>
              </Row>
              <p></p>
            </>
          ) : null}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col>
          <ProfileTitle>User's album</ProfileTitle>
          <p></p>
          <Row gutter={16}>
            {profileUser && profileUser.album_pictures.length > 0
              ? profileUser.album_pictures.map((item, index) => (
                  <Col>
                    <Image key={index} width={200} src={item} />
                  </Col>
                ))
              : "The user has not upload any pictures to the album yet."}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
