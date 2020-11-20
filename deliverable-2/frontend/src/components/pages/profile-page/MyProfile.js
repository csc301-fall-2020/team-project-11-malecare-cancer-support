import React, { useState, useEffect } from "react";
import { Row, Col, Layout, message } from "antd";
import styles from "./MyProfile.module.css";
import styled from "styled-components";
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

// const { Header, Content, Footer } = Layout;

const ProfileTitle = styled.div`
  font-size: 38px;
  font-weight: bold;
  color: #4d222a;
`;

const SmallTitle = styled.div`
  font-size: 20px;
  color: #4d222a;
`;

const dateFormat = "YYYY-MM-DD";

const timeFormat = (inputString) => {
  const d = new Date(inputString);
  var month = (d.getMonth() + 1).toString().padStart(2, "0");
  var day = d.getDate().toString().padStart(2, "0");
  var result = d.getFullYear() + "-" + month + "-" + day;
  return moment(result, dateFormat);
};

const MyProfile = ({ user, setUser }) => {
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

  const handleUpdate = () => {
    if (
      _.isEmpty(name) ||
      _.isEmpty(date) ||
      _.isEmpty(gender) ||
      _.isEmpty(sex) ||
      _.isEmpty(purposeList) ||
      _.isEmpty(cancerList)
    ) {
      message.warning("You cannot submit unfinished form");
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
      console.log(requestBody);
      axios
        .post("current_user/profile/text", requestBody)
        .then((response) => {
          if (response.status === 200) {
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
      console.log("called");
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
          {/* <Title level={2}>Your profile</Title> */}
          <ProfileTitle>Your profile</ProfileTitle>
          <SmallTitle>For matching</SmallTitle>
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
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col>
          {/* <Title level={2}>Your album</Title> */}
          <ProfileTitle>Your album</ProfileTitle>
          <SmallTitle>Let's make your profile looks more attracting</SmallTitle>
          <p></p>
          <PhotoWall></PhotoWall>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col span={14}>
          {/* <Title level={2}>Detailed Information</Title> */}
          <ProfileTitle>Detailed Information</ProfileTitle>
          <SmallTitle>
            Only for receiving latest news regarding your cancer
          </SmallTitle>
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
      <Row gutter={[16, 16]}>
        {" "}
        <Col span={10}></Col>
        <UpdateButton onClick={handleUpdate}>update profile</UpdateButton>
        <p></p>
      </Row>
    </div>
    //   </Content>
    // </Layout>
  );
};

export default MyProfile;
