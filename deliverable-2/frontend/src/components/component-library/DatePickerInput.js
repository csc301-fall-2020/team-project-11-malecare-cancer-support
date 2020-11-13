import React from "react";
import DatePicker from "react-date-picker";
import styled from "styled-components";

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
    <StyledDatePicker onChange={onChange} value={date} />
  </DatePickerContainer>
);

export default DatePickerInput;
