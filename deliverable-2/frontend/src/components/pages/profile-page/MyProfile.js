import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Layout } from "antd";
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
import { getUserDetailOptions } from "../../pages/signup-page/helper";
import { UpdateButton } from "../../share-styled-component";

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

const dateFormat = "YYYY-MM-DD";

const handleUpdate = () => {
  console.log("update");
};

const MyProfile = () => {
  const [name, setName] = useState("User name");
  const [date, setDate] = useState(moment("2020-11-11", dateFormat));
  const [gender, setGender] = useState("other");
  const [sex, setSex] = useState("prefer not to respond");
  const [cancerList, setCancerList] = useState(["lung cancer"]);
  const [purposeList, setPurposeList] = useState(["mentor"]);
  const [greetMsg, setGreetMsg] = useState("Hello World!");
  const [medication, setMed] = useState([]);
  const [treatment, setTreat] = useState([]);
  const [userDetailSelections, setUserDetailSelections] = useState({});

  useEffect(() => {
    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
    };

    fetchUserDetailSelections();
    console.log("sucess", userDetailSelections.genderOptions);
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
