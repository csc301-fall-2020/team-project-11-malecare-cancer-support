import React from "react";
import { Row, Col, Input } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const Title = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const { TextArea } = Input;

const Greeting = ({ greetMsg, setGreetMsg }) => {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Title>Greeting message:</Title>
        </Col>
        <Col>
          <TextArea
            showCount
            maxLength={150}
            style={{ width: 250, height: 100 }}
            allowClear
            size={"middle"}
            placeholder="Enter your message..."
            defaultValue={greetMsg}
            value={greetMsg}
            onChange={(event) => {
              setGreetMsg(event.target.value);
            }}
          />
        </Col>
      </Row>
      <p></p>
    </div>
  );
};

export default Greeting;
