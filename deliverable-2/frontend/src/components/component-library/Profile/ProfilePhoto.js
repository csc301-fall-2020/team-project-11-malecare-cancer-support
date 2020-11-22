import React from "react";
import { Row, Col, Image } from "antd";
import Avatar from "../../component-library/Profile/UploadUserPhoto";
import "antd/dist/antd.css";
import UserPhoto from "../../../assets/UserPhoto.png";

const ProfilePhoto = () => {
  return (
    <Col span={8}>
      <Image width={250} src={UserPhoto} />
      <p></p>
      <Avatar></Avatar>
    </Col>
  );
};

export default ProfilePhoto;
