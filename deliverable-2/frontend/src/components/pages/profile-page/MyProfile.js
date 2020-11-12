import React from "react";
import { Row, Col, Typography } from "antd";
import styles from "./MyProfile.module.css";
import { Layout, Menu, Breadcrumb } from "antd";
import Avatar from "../../component-library/Profile/UploadUserPhoto";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

const MyProfile = () => {
  return (
    <Layout className={styles.ProfileContainer}>
      <Content>
        {" "}
        <Row gutter={[16, 16]}>
          <Col>
            <Title level={2}>Your profile</Title>
            <p>For matching</p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <div>Upload to change your profile picture</div>
            <Avatar></Avatar>
          </Col>
          <Col span={8}>name</Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MyProfile;
