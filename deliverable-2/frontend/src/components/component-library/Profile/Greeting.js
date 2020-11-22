import React from "react";
import { Row, Col, Input } from "antd";
import "antd/dist/antd.css";

const { TextArea } = Input;

const Greeting = ({ greetMsg, setGreetMsg }) => {
  return (
    <div>
      <Row>
        <Col span={4}>Greeting message:</Col>
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
