import React from "react";
import { Row, Col, Select } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const MultiSelect = ({ List, setList, lineTitle, data }) => {
  function handleChange(value) {
    console.log(`selected ${value}`);
    setList([...List, value]);
  }

  return (
    <div>
      <Row>
        <Col span={4}>{lineTitle}</Col>
        <Col span={8}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: 250 }}
            placeholder="Please select"
            defaultValue={List}
            onChange={handleChange}
          >
            {data.map((value, key) => (
              <Option value={value} key={key}>
                {value}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <p></p>
    </div>
  );
};

export default MultiSelect;
