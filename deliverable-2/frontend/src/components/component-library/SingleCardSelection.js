import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const SingleCardSelectionContainer = styled.div``;

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

  &:hover {
    cursor: pointer;
  }

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

const OptionCard = ({ selection, updateSelection, optionValue }) => {
  const isSelected = selection === optionValue;

  const handleCardSelection = () => {
    if (isSelected) {
      updateSelection("");
    } else {
      updateSelection(optionValue);
    }
  };

  return (
    <OptionCardConatiner isSelected={isSelected} onClick={handleCardSelection}>
      {isSelected && <CardSelectedIcon />}
      <span>{optionValue}</span>
    </OptionCardConatiner>
  );
};

const SingleCardSelection = ({
  label,
  selection,
  updateSelection,
  options,
}) => {
  return (
    <SingleCardSelectionContainer>
      <SelectionLabelContainer>{label}</SelectionLabelContainer>
      <CardListContainer>
        {options.map((optionValue) => (
          <OptionCard
            key={optionValue}
            optionValue={optionValue}
            selection={selection}
            updateSelection={updateSelection}
          />
        ))}
      </CardListContainer>
    </SingleCardSelectionContainer>
  );
};

export default SingleCardSelection;
