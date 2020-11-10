import React from "react";
import styled from "styled-components";
import { Space } from "../share-styled-component";

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckboxInput = styled.input`
  width: 24px;
  height: 24px;
`;

const CheckboxLabelContainer = styled.span`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const Checkbox = ({ isChecked, label, onClick }) => {
  return (
    <CheckboxContainer>
      <CheckboxInput type="checkbox" checked={isChecked} onChange={onClick} />
      <Space width="12px" />
      <CheckboxLabelContainer>{label}</CheckboxLabelContainer>
    </CheckboxContainer>
  );
};

export default Checkbox;
