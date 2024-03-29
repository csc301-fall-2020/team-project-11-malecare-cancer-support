import React, { useState, useEffect } from "react";
import { Row, Col, Layout, message, Checkbox, Button, Modal } from "antd";
import styles from "./MyProfile.module.css";
import styled from "styled-components";
import "antd/dist/antd.css";
import moment from "moment";
import _ from "lodash";
import axios from "axios";
import ProfilePhoto from "../../../component-library/Profile/ProfilePhoto";
import NameInput from "../../../component-library/Profile/NameInput";
import DateInput from "../../../component-library/Profile/DateInput";
import DropDownSelect from "../../../component-library/Profile/DropDownSelect";
import MultiSelect from "../../../component-library/Profile/MultiSelect";
import Greeting from "../../../component-library/Profile/Greeting";
import PhotoWall from "../../../component-library/Profile/PhotoWall";
// import UserPhoto from "../../../../assets/UserPhoto.png";
import RegionDropdown from "../../../component-library/RegionDropdown";
import {
  PageTitleSection,
  UpdateButton,
} from "../../../share-styled-component";
// import Checkbox from "../../../component-library/Checkbox";

import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { HOST_URL } from "../../../utils/sharedUrl";
import { getUserDetailOptions } from "../../common-page/signup-page/helper";
import { EditOutlined } from "@ant-design/icons";

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

const CheckboxSection = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
`;

const SmallTitle = styled.div`
  font-size: 20px;
  color: #4d222a;
  margin-right: 10px;
`;

const Title = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const RegionContainer = styled.div`
  margin: 10px;
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
  const [include, setInclude] = useState(false); // For detailed Information.
  const [sexChecked, setSexChecked] = useState(false); // For Sex Information.
  const [dobChecked, setDobChecked] = useState(false); // For DOB Information.
  const [genderChecked, setGenderChecked] = useState(false); // For Gender Information.
  const [purposeChecked, setPurposeChecked] = useState(false); // For Purpose Information.
  const [loading, setLoading] = useState(true);
  const [avaterUrl, setAvaterUrl] = useState(user.profile_picture);
  const [albumList, setAlbumList] = useState(user.album_pictures);
  // const [region, setRegion] = useState(user.region);
  const [region, setRegion] = useState({});
  const [showRegion, setShowRegion] = useState(false);
  const [city, setCity] = useState(
    user.region.cityData.data ? user.region.cityData.data.name : ""
  );
  const [country, setCountry] = useState(user.region.countryData.data.name);
  const [state, setState] = useState(user.region.stateData.data.name);

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
      setLoading(true);
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
        profile_picture: avaterUrl,
        album_pictures: albumList,
        date_of_birth_bool: dobChecked,
        gender_bool: genderChecked,
        sex_orientation_bool: sexChecked,
        medications_and_treatments_bool: include,
        purpose_bool: purposeChecked,
        region: region,
      };
      console.log("profile", requestBody);
      axios
        .post(HOST_URL + "/current_user/profile/update", requestBody)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            message.success("success update");
            setUser(response.data);
          }
        })
        .catch((err) => {
          setLoading(false)
          console.log(err);
          message.error("Error occurs");
        });
    }
    console.log("update");
  };

  useEffect(() => {
    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
      setLoading(false);
      console.log("called");
    };
    fetchUserDetailSelections();
  }, []);

  const handleOk = () => {
    if (
      !(region.countryData.data && region.countryData.data.name) ||
      // !(region.cityData.data && region.cityData.data.name) ||
      !(region.stateData.data && region.stateData.data.name)
    ) {
      message.warning("Please select a complete region!");
    } else {
      setCity(region.cityData.data ? region.cityData.data.name : "");
      setState(region.stateData.data.name);
      setCountry(region.countryData.data.name);
      setShowRegion(false);
    }
  };

  const handleCancel = () => {
    setShowRegion(false);
  };

  return loading ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
    <div className={styles.ProfileContainer}>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col>
          <PageTitleSection>Your profile</PageTitleSection>
          <SmallTitle>For matching</SmallTitle>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <ProfilePhoto
          avaterUrl={avaterUrl}
          setAvaterUrl={setAvaterUrl}
        ></ProfilePhoto>
        <Col span={14}>
          <NameInput name={name} setName={setName}></NameInput>
          <DateInput
            date={date}
            setDate={setDate}
            checked={dobChecked}
            setChecked={setDobChecked}
          ></DateInput>
          <DropDownSelect
            select={gender}
            setSelect={setGender}
            lintTitle={"Gender:"}
            data={userDetailSelections.genderOptions}
            checked={genderChecked}
            setChecked={setGenderChecked}
          ></DropDownSelect>
          <DropDownSelect
            select={sex}
            setSelect={setSex}
            lintTitle={"Sex-Orientation:"}
            data={userDetailSelections.sexualOrientationOptions}
            checked={sexChecked}
            setChecked={setSexChecked}
          ></DropDownSelect>
          <MultiSelect
            List={purposeList}
            setList={setPurposeList}
            lineTitle={"Label(s):"}
            data={userDetailSelections.purposeOptions}
            checked={purposeChecked}
            setChecked={setPurposeChecked}
          ></MultiSelect>
          <MultiSelect
            List={cancerList}
            setList={setCancerList}
            lineTitle={"Type(s) of cancer:"}
            data={userDetailSelections.cancerTypeOptions}
          ></MultiSelect>
          <Greeting greetMsg={greetMsg} setGreetMsg={setGreetMsg}></Greeting>
          <p></p>
          <div>
            <Row>
              <Col span={6}>
                <Title>Locations:</Title>
              </Col>
              <Col span={8}>
                <RegionContainer>
                  {city
                    ? city + ", " + state + ", " + country
                    : state + ", " + country}{" "}
                </RegionContainer>
              </Col>
              <Col>
                {" "}
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    setShowRegion(true);
                  }}
                ></Button>
              </Col>
            </Row>
            <p></p>
          </div>

          <Modal
            title="Select region"
            visible={showRegion}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <RegionDropdown label="" region={region} setRegion={setRegion} />
          </Modal>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col>
          <PageTitleSection>Your album</PageTitleSection>
          <SmallTitle>Let's make your profile look more attracting</SmallTitle>
          <p></p>
          <PhotoWall
            albumList={albumList}
            setAlbumList={setAlbumList}
          ></PhotoWall>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={2}></Col>
        <Col span={12}>
          <PageTitleSection>Detailed Information</PageTitleSection>
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
          <CheckboxSection>
            <Checkbox
              onChange={() => {
                setInclude(!include);
              }}
            >
              Include detailed information in your profile
            </Checkbox>
          </CheckboxSection>
        </Col>
        <Col span={2}></Col>
        <Col span={8}></Col>
      </Row>
      <Row gutter={[16, 16]}>
        {" "}
        <Col span={10}></Col>
        <UpdateButton onClick={handleUpdate}>update profile</UpdateButton>
        <p></p>
      </Row>
    </div>
  );
};
//   </Content>
// </Layout>

export default MyProfile;
