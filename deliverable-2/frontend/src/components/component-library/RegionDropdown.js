import React, { useState } from "react";
import styled from "styled-components";
import RegionSelect from "react-region-flag-select";
import { Space } from "../share-styled-component";

const SectionContainer = styled.div`
  position: relative;
  ${({ hideCheckbox, hideDropdown }) => {
    if (!hideCheckbox && !hideDropdown) {
      return "height: 140px;";
    }
    if (hideCheckbox) {
      return "height: 100px;";
    }
    return "";
  }}
`;

const SelectionLabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: ${({ labelSize }) => (labelSize ? `${labelSize}` : "24px")};
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

const RegionSelectorContainer = styled.div`
  position: absolute;
  z-index: 10;
  margin: 12px 0;
`;

const RegionDropdown = ({
  label,
  setRegion,
  labelSize,
  allowSelectAll = false,
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setRegion({});
    } else {
      setRegion({ selectedAll: true });
    }
    setSelectAll(!selectAll);
  };
  return (
    <SectionContainer hideCheckbox={!allowSelectAll} hideDropdown={selectAll}>
      <SelectionLabelContainer labelSize={labelSize}>
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
      {!selectAll && (
        <RegionSelectorContainer>
          <RegionSelect
            isFlag={false}
            isPhoneCode={false}
            handleChange={setRegion}
          />
        </RegionSelectorContainer>
      )}
    </SectionContainer>
  );
};

export default RegionDropdown;
