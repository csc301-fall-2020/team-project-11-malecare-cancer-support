import React from "react";
import { Row, Col, Checkbox } from "antd";
import "antd/dist/antd.css";
import Selector from "./Selector";

import styled from "styled-components";

const Title = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const DropDownSelect = ({
  select,
  setSelect,
  lintTitle,
  data,
  checked,
  setChecked,
}) => {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Title>{lintTitle}</Title>
        </Col>
        <Col span={8}>
          <Selector
            setSelect={setSelect}
            defaultValue={select}
            selectList={data}
          ></Selector>
        </Col>
        <Col>
          <Checkbox
            onChange={(e) => setChecked(e.target.checked)}
            defaultChecked={checked}
          >
            Click to display in profile
          </Checkbox>
        </Col>
      </Row>
      <p></p>
    </div>
  );
};

export default DropDownSelect;
