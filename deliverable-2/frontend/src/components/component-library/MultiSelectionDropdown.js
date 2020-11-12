import React from "react";
import styled from "styled-components";
import Select from "react-select";

const SelectionLabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const SelectionDropdownContainer = styled.div`
  margin: 12px 0;
`;

const optionsFormatter = (options) => {
  if (!options) {
    return [];
  }
  return options.map((option) => ({ value: option, label: option }));
};

const MultiSelectionDropdown = ({
  label,
  selections,
  updateSelections,
  options,
}) => (
  <div>
    <SelectionLabelContainer>{label}</SelectionLabelContainer>
    <SelectionDropdownContainer>
      <Select
        isMulti
        name="colors"
        options={optionsFormatter(options)}
        onChange={(selectedOptions) => {
          updateSelections(selectedOptions.map((option) => option.value));
        }}
      />
    </SelectionDropdownContainer>
  </div>
);

export default MultiSelectionDropdown;
