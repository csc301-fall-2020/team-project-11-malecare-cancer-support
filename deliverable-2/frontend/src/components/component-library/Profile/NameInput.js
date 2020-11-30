import React from "react";
import { Row, Col, Input } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const Title = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const NameInput = ({ name, setName }) => {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Title>Names:</Title>
        </Col>
        <Col span={8}>
          <Input
            style={{ width: 250 }}
            allowClear
            size={"middle"}
            defaultValue={name}
            placeholder="Enter your name"
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
