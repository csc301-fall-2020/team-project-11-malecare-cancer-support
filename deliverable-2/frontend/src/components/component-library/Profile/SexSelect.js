import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import Selector from "./Selector";
import { sexualOrientationOptions } from "../../pages/signup-page/constant";

const SexSelect = ({ sex, setSex }) => {
  return (
    <div>
      <Row>
        <Col span={4}>Sex-Orientation:</Col>
        <Col span={8}>
          <Selector
            setSelect={setSex}
            defaultValue={sex}
            selectList={sexualOrientationOptions}
          ></Selector>
        </Col>
      </Row>
      <p></p>
    </div>
  );
};

export default SexSelect;
