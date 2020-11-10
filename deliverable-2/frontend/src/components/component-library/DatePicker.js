import React from "react";
import DateTimePicker from "react-datetime-picker";
import styled from "styled-components";

const DatePickerContainer = styled.div`
  width: 100%;
`;

const DateLabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const StyledDatePicker = styled(DateTimePicker)`
  width: 160px;
  height: 40px;
  border: 3px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 12px 0;
`;

const DatePicker = ({ label, date, onChange }) => (
  <DatePickerContainer>
    <DateLabelContainer>{label}</DateLabelContainer>
    <StyledDatePicker
      onChange={onChange}
      value={date}
      format="y-MM-dd"
      disableClock
      style={{ width: "50px" }}
    />
  </DatePickerContainer>
);

export default DatePicker;
