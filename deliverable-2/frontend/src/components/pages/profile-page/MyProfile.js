import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Typography, Layout, message } from "antd";
import styles from "./MyProfile.module.css";
import "antd/dist/antd.css";
import moment from "moment";
import _ from "lodash";
import axios from "axios";
import ProfilePhoto from "../../component-library/Profile/ProfilePhoto";
import NameInput from "../../component-library/Profile/NameInput";
import DateInput from "../../component-library/Profile/DateInput";
import DropDownSelect from "../../component-library/Profile/DropDownSelect";
import MultiSelect from "../../component-library/Profile/MultiSelect";
import Greeting from "../../component-library/Profile/Greeting";
import PhotoWall from "../../component-library/Profile/PhotoWall";
import { getUserDetailOptions } from "../../pages/signup-page/helper";
import { UpdateButton } from "../../share-styled-component";
import { UserContext } from "../../../contexts/UserContext";

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

const dateFormat = "YYYY-MM-DD";

const timeFormat = (inputString) => {
  const d = new Date(inputString);
  var month = (d.getMonth() + 1).toString().padStart(2, "0");
  var day = d.getDate().toString().padStart(2, "0");
  var result = d.getFullYear() + "-" + month + "-" + day;
  return moment(result, dateFormat);
};

const MyProfile = ({ user }) => {
  const [userDetailSelections, setUserDetailSelections] = useState({});
  const [name, setName] = useState(user.username);
  const [date, setDate] = useState(timeFormat(user.date_of_birth));
  const [gender, setGender] = useState(user.gender);
  const [sex, setSex] = useState(user.sex_orientation);
  const [cancerList, setCancerList] = useState(user.cancer);
  const [purposeList, setPurposeList] = useState(user.purpose);
  const [greetMsg, setGreetMsg] = useState(user.short_intro);
  const [medication, setMed] = useState(user.medications);
  const [treatment, setTreat] = useState(user.treatments);
  const { setUser } = useContext(UserContext);

  const handleUpdate = () => {
    if (
      _.isEmpty(name) ||
      _.isEmpty(date) ||
      _.isEmpty(gender) ||
      _.isEmpty(sex)
    ) {
      message.warning("You cannot set your profile to empty");
    } else {
      //   Initiate Login Request
      const requestBody = {
        username: name,
        cancer: cancerList,
        date_of_birth: date.format(dateFormat),
        gender: gender,
        medications: medication,
        purpose: purposeList,
        sex_orientation: sex,
        short_intro: greetMsg,
        treatments: treatment,
      };
      console.log(requestBody)
      axios
        .post("current_user/profile/text", requestBody)
        .then((response) => {
          if (response.status == 200) {
            message.success("success update");
            setUser(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error("Error accurs");
        });
    }
    console.log("update");
  };

  useEffect(() => {
    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
      console.log("called")
    };
    fetchUserDetailSelections();
  }, []);

  return (
    // <Layout>
    //   <Content className={styles.ProfileContainer}>
    <div className={styles.ProfileContainer}>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col>
          <Title level={2}>Your profile</Title>
          <p>For matching</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <ProfilePhoto></ProfilePhoto>
        <Col span={14}>
          <NameInput name={name} setName={setName}></NameInput>
          <DateInput date={date} setDate={setDate}></DateInput>
          <DropDownSelect
            select={gender}
            setSelect={setGender}
            lintTitle={"Gender:"}
            data={userDetailSelections.genderOptions}
          ></DropDownSelect>
          <DropDownSelect
            select={sex}
            setSelect={setSex}
            lintTitle={"Sex-Orientation:"}
            data={userDetailSelections.sexualOrientationOptions}
          ></DropDownSelect>
          <MultiSelect
            List={purposeList}
            setList={setPurposeList}
            lineTitle={"Purpose"}
            data={userDetailSelections.purposeOptions}
          ></MultiSelect>
          <MultiSelect
            List={cancerList}
            setList={setCancerList}
            lineTitle={"Type(s) of cancer:"}
            data={userDetailSelections.cancerTypeOptions}
          ></MultiSelect>
          <Greeting greetMsg={greetMsg} setGreetMsg={setGreetMsg}></Greeting>
          <UpdateButton onClick={handleUpdate}>update profile</UpdateButton>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col>
          <Title level={2}>Your album</Title>
          <p>Let's make your profile looks more attracting</p>
          <p></p>
          <PhotoWall></PhotoWall>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col span={14}>
          <Title level={2}>Detailed Information</Title>
          <p>Only for receiving latest news regarding your cancer</p>
          <p></p>
          <MultiSelect
            List={medication}
            setList={setMed}
            lineTitle={"Medication:"}
            data={userDetailSelections.medicationOptions}
          ></MultiSelect>
          <MultiSelect
            List={treatment}
            setList={setTreat}
            lineTitle={"Treatment:"}
            data={userDetailSelections.treatmentTypeOptions}
          ></MultiSelect>
        </Col>
      </Row>
    </div>
    //   </Content>
    // </Layout>
  );
};

export default MyProfile;
