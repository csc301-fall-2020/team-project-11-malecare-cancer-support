import React from "react";
import { Row, Col, DatePicker } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const dateFormat = "YYYY-MM-DD";

const DatePickerContainer = styled.div`
  width: 100%;
`;

const DateLabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 160px;
  height: 40px;
  border: 3px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 12px 0;
`;

const DatePickerInput = ({ label, date, onChange }) => (
  <DatePickerContainer>
    <DateLabelContainer>{label}</DateLabelContainer>
    <StyledDatePicker onChange={onChange} value={date} format={dateFormat} />
  </DatePickerContainer>
);

export default DatePickerInput;
