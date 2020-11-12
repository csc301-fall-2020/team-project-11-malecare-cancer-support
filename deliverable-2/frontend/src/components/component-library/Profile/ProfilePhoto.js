import React from "react";
import { Row, Col, Image } from "antd";
import Avatar from "../../component-library/Profile/UploadUserPhoto";
import "antd/dist/antd.css";

const ProfilePhoto = () => {
  return (
    <Col span={8}>
      <Image
        width={250}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <p></p>
      <Avatar></Avatar>
    </Col>
  );
};

export default ProfilePhoto;
