import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import Selector from "./Selector";

const DropDownSelect = ({ select, setSelect, lintTitle, data }) => {
  return (
    <div>
      <Row>
        <Col span={4}>{lintTitle}</Col>
        <Col span={8}>
          <Selector
            setSelect={setSelect}
            placeholder={select}
            selectList={data}
          ></Selector>
        </Col>
      </Row>
      <p></p>
    </div>
  );
};

export default DropDownSelect;
