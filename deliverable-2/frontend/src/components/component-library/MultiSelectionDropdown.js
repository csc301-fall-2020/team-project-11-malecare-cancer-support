import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Space } from "../share-styled-component";

const SelectionLabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: ${({ labelSize }) => (labelSize ? `${labelSize}` : "24px")};
`;

const SelectionDropdownContainer = styled.div`
  margin: 12px 0;
`;

const SelectAllCheckboxContainer = styled.div`
  margin: 12px 0;
  display: flex;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  &:hover {
    cursor: pointer;
  }
`;

const CheckboxLabelContainer = styled.span`
  text-align: start;
  color: #3c1014;
  font-size: 14px;
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
  sectionLabelSize,
  allowSelectAll = false,
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      updateSelections([]);
    } else {
      updateSelections(options);
    }

    setSelectAll(!selectAll);
  };

  return (
    <div>
      <SelectionLabelContainer labelSize={sectionLabelSize}>
        {label}
      </SelectionLabelContainer>
      {allowSelectAll && (
        <SelectAllCheckboxContainer>
          <CheckboxInput
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <Space width="6px" />
          <CheckboxLabelContainer>Select All</CheckboxLabelContainer>
        </SelectAllCheckboxContainer>
      )}
      <SelectionDropdownContainer>
        {!selectAll && (
          <Select
            isMulti
            name="colors"
            placeholder="Start typing..."
            options={optionsFormatter(options)}
            onChange={(selectedOptions) => {
              selectedOptions !== null &&
                updateSelections(selectedOptions.map((option) => option.value));
            }}
          />
        )}
      </SelectionDropdownContainer>
    </div>
  );
};

export default MultiSelectionDropdown;
