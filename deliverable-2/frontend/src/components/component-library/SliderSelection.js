import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";

const MultiCardSelectionContainer = styled.div``;

const SliderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 12px 0;
`;

const SelectionLabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: ${({ labelSize }) => (labelSize ? `${labelSize}` : "24px")};
  padding-bottom: 25px;
`;

const SliderSelection = ({
  label,
  sectionLabelSize,
  includeAges,
  setIncludeAges,
}) => {
  return (
    <MultiCardSelectionContainer>
      <SelectionLabelContainer labelSize={sectionLabelSize}>
        {label}
      </SelectionLabelContainer>
      <SliderContainer>
        <Slider
          value={includeAges}
          onChange={(event, value) => {
            setIncludeAges(value);
          }}
          max={100}
          min={18}
          valueLabelDisplay="on"
          aria-labelledby="range-slider"
          getAriaValueText={(value) => `${value}`}
        />
      </SliderContainer>
    </MultiCardSelectionContainer>
  );
};

export default SliderSelection;
