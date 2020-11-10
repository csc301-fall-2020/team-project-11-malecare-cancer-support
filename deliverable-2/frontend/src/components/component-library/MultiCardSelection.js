import React from "react";
import _ from "lodash";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const MultiCardSelectionContainer = styled.div``;

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 12px 0;
`;

const SelectionLabelContainer = styled.div`
  text-align: start;
  color: #3c1014;
  font-size: 24px;
`;

const OptionCardConatiner = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 24px;
  padding: 6px 12px;
  border-radius: 4px;
  margin: 0 8px 8px 0;

  ${({ isSelected }) =>
    isSelected
      ? `
        color: #fff;
        border: 3px solid #d54e54;
        background-color: #d54e54`
      : `
        color: #3c1014; 
        border: 3px solid #ccc;`}
`;

const CardSelectedIcon = styled(FaCheck)`
  margin-right: 6px;
  color: #fff;
`;

const OptionCard = ({ selections, updateSelections, optionValue }) => {
  const isSelected = _.includes(selections, optionValue);

  const handleCardSelection = () => {
    if (isSelected) {
      updateSelections((prevSelections) =>
        _.filter(prevSelections, (selection) => selection !== optionValue)
      );
    } else {
      updateSelections([...selections, optionValue]);
    }
  };

  return (
    <OptionCardConatiner isSelected={isSelected} onClick={handleCardSelection}>
      {isSelected && <CardSelectedIcon />}
      <span>{optionValue}</span>
    </OptionCardConatiner>
  );
};

const MultiCardSelection = ({
  label,
  selections,
  updateSelections,
  options,
}) => {
  return (
    <MultiCardSelectionContainer>
      <SelectionLabelContainer>{label}</SelectionLabelContainer>
      <CardListContainer>
        {options.map((optionValue) => (
          <OptionCard
            key={optionValue}
            optionValue={optionValue}
            selections={selections}
            updateSelections={updateSelections}
          />
        ))}
      </CardListContainer>
    </MultiCardSelectionContainer>
  );
};

export default MultiCardSelection;
