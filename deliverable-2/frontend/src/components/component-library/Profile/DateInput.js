import React from "react";
import { Row, Col, DatePicker, Checkbox } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const Title = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const dateFormat = "YYYY-MM-DD";

const DateInput = ({ date, setDate, checked, setChecked }) => {
  const dataOnChange = (date, dateString) => {
    setDate(date);
    console.log(date);
    console.log(dateString);
  };

  return (
    <div>
      <Row>
        <Col span={6}>
          <Title>Day of birth:</Title>
        </Col>
        <Col span={8}>
          <DatePicker
            onChange={dataOnChange}
            defaultValue={date}
            defaultPickerValue={date}
            style={{ width: 250 }}
            format={dateFormat}
          />
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

export default DateInput;
