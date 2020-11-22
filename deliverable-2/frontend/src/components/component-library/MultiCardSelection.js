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
  font-size: ${({ labelSize }) => (labelSize ? `${labelSize}` : "24px")};
`;

const OptionCardConatiner = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: ${({ labelSize }) => (labelSize ? `${labelSize}` : "24px")};
  padding: 6px 12px;
  border-radius: ${({ roundedCard }) => (roundedCard ? "50px" : "4px")};
  margin: 0 8px 8px 0;

  &:hover {
    cursor: pointer;
  }

  ${({ isSelected }) =>
    isSelected
      ? `
      color: #fff;
      border: 3px solid #d54e54;
      background-color: #d54e54;`
      : `
      color: #3c1014; 
      border: 3px solid #a8a8a8;`}
`;

const CardSelectedIcon = styled(FaCheck)`
  margin-right: 6px;
  color: #fff;
`;

const SelectAllCard = ({
  roundedCard,
  cardLabelSize,
  selections,
  updateSelections,
  options,
}) => {
  const isSelected =
    selections && options && selections.length === options.length;

  const handleSelectAll = () => {
    if (isSelected) {
      updateSelections([]);
    } else {
      updateSelections(options);
    }
  };

  return (
    <OptionCardConatiner
      isSelected={isSelected}
      onClick={handleSelectAll}
      roundedCard={roundedCard}
      labelSize={cardLabelSize}
    >
      {isSelected && <CardSelectedIcon />}
      <span>select all</span>
    </OptionCardConatiner>
  );
};

const OptionCard = ({
  selections,
  updateSelections,
  optionValue,
  roundedCard,
  cardLabelSize,
}) => {
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
    <OptionCardConatiner
      isSelected={isSelected}
      onClick={handleCardSelection}
      roundedCard={roundedCard}
      labelSize={cardLabelSize}
    >
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
  sectionLabelSize,
  cardLabelSize,
  roundedCard = false,
  allowSelectAll = false,
}) => {
  return (
    <MultiCardSelectionContainer>
      <SelectionLabelContainer labelSize={sectionLabelSize}>
        {label}
      </SelectionLabelContainer>
      <CardListContainer>
        {allowSelectAll && (
          <SelectAllCard
            optionValue="Select All"
            roundedCard={roundedCard}
            cardLabelSize={cardLabelSize}
            selections={selections}
            updateSelections={updateSelections}
            options={options}
          />
        )}
        {options.map((optionValue) => (
          <OptionCard
            key={optionValue}
            optionValue={optionValue}
            selections={selections}
            updateSelections={updateSelections}
            roundedCard={roundedCard}
            cardLabelSize={cardLabelSize}
          />
        ))}
      </CardListContainer>
    </MultiCardSelectionContainer>
  );
};

export default MultiCardSelection;
