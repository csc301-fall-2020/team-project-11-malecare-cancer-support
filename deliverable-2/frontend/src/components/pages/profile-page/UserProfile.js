import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Layout, Image } from "antd";
import styles from "./MyProfile.module.css";
import "antd/dist/antd.css";
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

const UserProfile = ({ match }) => {
  const [name, setName] = useState("User name");
  const [date, setDate] = useState(moment("2020-11-11", dateFormat));
  const [gender, setGender] = useState("other");
  const [sex, setSex] = useState("prefer not to respond");
  const [cancerList, setCancerList] = useState(["lung cancer"]);
  const [purposeList, setPurposeList] = useState(["mentor"]);
  const [greetMsg, setGreetMsg] = useState("Hello World!");
  const [medication, setMed] = useState([]);
  const [treatment, setTreat] = useState([]);

  useEffect(() => {
    console.log("chuan", match);
    console.log("idds", match.params.id);
  }, []);

  return (
    <Layout>
      <Content className={styles.ProfileContainer}>
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
              <Col span={8}>Hello World</Col>
            </Row>
            <p></p>
            <Row>
              <Col span={4}>Day of birth:</Col>
              <Col span={8}>2020-11-11</Col>
            </Row>
            <p></p>
            <Row>
              <Col span={4}>Gender:</Col>
              <Col span={8}>other</Col>
            </Row>
            <p></p>
            <Row>
              <Col span={4}>Sex-Orientation:</Col>
              <Col span={8}>Other</Col>
            </Row>
            <p></p>
            <Row>
              <Col span={4}>Type(s) of cancer:</Col>
              <Col span={8}>lung cancer, skin cancer</Col>
            </Row>
            <p></p>
            <Row>
              <Col span={4}>Greeting message:</Col>
              <Col span={8}>Nice to meet you!</Col>
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
      </Content>
    </Layout>
  );
};

export default UserProfile;
