import React from "react";
import styled from "styled-components";
import RegionSelect from "react-region-flag-select";

const SectionContainer = styled.div`
  position: relative;
  height: 100px;
`;

const SelectionLabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: ${({ labelSize }) => (labelSize ? `${labelSize}` : "24px")};
`;

const RegionSelectorContainer = styled.div`
  position: absolute;
  z-index: 10;
  margin: 12px 0;
`;

const RegionDropdown = ({ label, setRegion }) => {
  //   const handleRegionChange = (data) => {
  //     setRegion(data);
  //   };
  return (
    <SectionContainer>
      <SelectionLabelContainer>{label}</SelectionLabelContainer>
      <RegionSelectorContainer>
        <RegionSelect
          isFlag={false}
          isPhoneCode={false}
          handleChange={setRegion}
        />
      </RegionSelectorContainer>
    </SectionContainer>
  );
};

export default RegionDropdown;
