import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Layout, Image } from "antd";
import styles from "./MyProfile.module.css";
import "antd/dist/antd.css";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import ProfilePhoto from "../../component-library/Profile/ProfilePhoto";
import NameInput from "../../component-library/Profile/NameInput";
import DateInput from "../../component-library/Profile/DateInput";
import DropDownSelect from "../../component-library/Profile/DropDownSelect";
import MultiSelect from "../../component-library/Profile/MultiSelect";
import Greeting from "../../component-library/Profile/Greeting";
import PhotoWall from "../../component-library/Profile/PhotoWall";
import {
  cancers,
  medications,
  treatmenets,
  genderOptions,
  sexualOrientationOptions,
  purposeOptions,
} from "../../component-library/Profile/Data";

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

const dateFormat = "YYYY-MM-DD";

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
          <Title level={2}>User profile</Title>
          <p>User id: {match.params.id} </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>

        <Col span={8}>
          <Image
            width={250}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
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
          <Title level={2}>User's album</Title>
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

// const initProfile = (currentUser) => {
//   // if (!_.isEmpty(currentUser)) {
//   console.log("currentuser", currentUser);
//   setName(currentUser.username);
//   setDate(timeFormat(currentUser.date_of_birth));
//   setGender(currentUser.gender);
//   setSex(currentUser.sex_orientation);
//   setCancerList([...cancerList, ...currentUser.cancer]);
//   setPurposeList([...purposeList, ...currentUser.purpose]);
//   setGreetMsg(currentUser.short_intro);
//   setMed([medication, ...currentUser.medications]);
//   setTreat([treatment, ...currentUser.treatments]);
//   console.log(date);
//   console.log("cancerlist", cancerList);
//   console.log("pplist", purposeList);
// }
// if (!_.isNil(currentUser, "username")) {
//   console.log("Get db", currentUser);
//   setName(currentUser.username);
// }
// if (!_.isNil(currentUser, "date_of_birth")) {
//   setDate(timeFormat(currentUser.date_of_birth));
//   console.log(typeof date, "date", date);
// }
// if (!_.isNil(currentUser, "gender")) {
//   setGender(currentUser.gender);
// }
// if (!_.isNil(currentUser, "sex_orientation")) {
//   setSex(currentUser.sex_orientation);
// }
// if (!_.isNil(currentUser, "cancer")) {
//   setCancerList(currentUser.cancer);
// }
// if (!_.isNil(currentUser, "purpose")) {
//   setPurposeList(currentUser.purpose);
// }
// if (!_.isNil(currentUser, "short_intro")) {
//   setGreetMsg(currentUser.short_intro);
// }
// if (!_.isNil(currentUser, "medications")) {
//   setMed(currentUser.medications);
// }
// if (!_.isNil(currentUser, "treatments")) {
//   setTreat(currentUser.treatments);
// }
// };
