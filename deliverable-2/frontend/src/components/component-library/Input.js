import React from "react";
import styled from "styled-components";

const InputContainer = styled.div``;

const LabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 12px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Input = ({ label, inputValue, inputType = "text", onChange }) => {
  return (
    <InputContainer>
      <LabelContainer>{label}</LabelContainer>
      <InputField type={inputType} value={inputValue} onChange={onChange} />
    </InputContainer>
  );
};

export default Input;
