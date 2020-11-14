import React from "react";
import { Row, Col, DatePicker } from "antd";
import "antd/dist/antd.css";

const dateFormat = "YYYY-MM-DD";

const DateInput = ({ date, setDate }) => {
  const dataOnChange = (date, dateString) => {
    setDate(date);
    console.log(date);
    console.log(dateString);
  };

  return (
    <div>
      <Row>
        <Col span={4}>Day of birth:</Col>
        <Col span={8}>
          <DatePicker
            onChange={dataOnChange}
            defaultValue={date}
            defaultPickerValue={date}
            style={{ width: 250 }}
            format={dateFormat}
          />
        </Col>
      </Row>
      <p></p>
    </div>
  );
};

export default DateInput;
