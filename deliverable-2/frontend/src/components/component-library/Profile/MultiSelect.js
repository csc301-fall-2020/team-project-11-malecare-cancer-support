import React from "react";
import { Row, Col, Select, Checkbox } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const Title = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const { Option } = Select;

const MultiSelect = ({
  List,
  setList,
  lineTitle,
  data,
  checked,
  setChecked,
}) => {
  function handleChange(value) {
    console.log(`selected ${value}`);
    console.log("select", value);
    setList([...value]);
  }

  const valider = (l) => {
    if (!l) {
      return [];
    }
    return l.filter((item) => item !== "None");
  };

  return (
    <div>
      <Row>
        <Col span={6}>
          <Title>{lineTitle}</Title>
        </Col>
        <Col span={8}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: 250 }}
            placeholder="Please select"
            defaultValue={List.filter((item) => item !== "None")}
            onChange={handleChange}
          >
            {valider(data).map((value, key) => (
              <Option value={value} key={key}>
                {value}
              </Option>
            ))}
          </Select>
        </Col>
        {setChecked ? (
          <Col>
            <Checkbox
              onChange={(e) => setChecked(e.target.checked)}
              defaultChecked={checked}
            >
              Click to display in profile
            </Checkbox>
          </Col>
        ) : null}
      </Row>
      <p></p>
    </div>
  );
};

export default MultiSelect;
