import React from "react";
import { Row, Col, Input } from "antd";
import "antd/dist/antd.css";
import styles from "./Profile.module.css";

const NameInput = ({ name, setName }) => {
  return (
    <div>
      <Row>
        <Col span={4}>Names:</Col>
        <Col>
          <Input
            style={{ width: 250 }}
            allowClear
            size={"middle"}
            placeholder={name}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Col>
      </Row>
      <p></p>
    </div>
  );
};

export default NameInput;
