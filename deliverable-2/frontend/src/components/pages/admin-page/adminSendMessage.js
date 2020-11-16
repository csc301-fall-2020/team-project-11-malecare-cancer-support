import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";
import { getUserDetailOptions } from "./helper";
import MultiCardSelection from "../../component-library/MultiCardSelection";
import MultiSelectionDropdown from "../../component-library/MultiSelectionDropdown";

import {
  Space,
  MainTitle,
  MainSubTitle,
  SecondaryButton,
  ErrorMessageContainer,
  UpdateButton,
} from "../../share-styled-component";

const MainContainer = styled.div`
  display: flex;
`;

const MessagesContainer = styled.div`
  width: 50%;
  padding: 12px 24px;
`;

const FiltersContainer = styled.div`
  width: 50%;
  padding: 12px 24px;
`;

const SectionTitle = styled.div`
  font-size: 24px;
  text-align: start;
  color: #d54e54;
  font-weight: bold;
`;

const SectionContainer = styled.div``;

const MessageInputArea = styled.textarea`
  width: 100%;
  padding: 12px 20px;
  margin: 12px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 850px;
`;

const ButtonGroupContainer = styled.div`
  text-align: end;
`;

const AdminSendMessages = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [includeGenders, setIncludeGenders] = useState([]);
  const [includeAges, setIncludeAges] = useState([]);
  const [includeCancerTypes, setIncludeCancerTypes] = useState([]);
  const [excludeCancerTypes, setExcludeCancerTypes] = useState([]);
  const [includeMedications, setIncludeMedications] = useState([]);
  const [excludeMedications, setExcludeMedications] = useState([]);
  const [includeTreatments, setIncludeTreatments] = useState([]);
  const [excludeTreatments, setExcludeTreatments] = useState([]);
  const [userDetailSelections, setUserDetailSelections] = useState({});

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
    };

    fetchUserDetailSelections();
  }, [user, history]);

  return (
    <MainContainer>
      <FiltersContainer>
        <SectionContainer>
          <SectionTitle>Filters(include):</SectionTitle>
          <Space height="12px" />
          <MultiCardSelection
            label="Genders:"
            selections={includeGenders}
            updateSelections={setIncludeGenders}
            options={userDetailSelections.genderOptions || []}
            roundedCard
            sectionLabelSize="18px"
            cardLabelSize="18px"
          />
          <MultiCardSelection
            label="Ages:"
            selections={includeAges}
            updateSelections={setIncludeAges}
            options={userDetailSelections.ageOptions || []}
            roundedCard
            sectionLabelSize="18px"
            cardLabelSize="18px"
          />
          <MultiSelectionDropdown
            label="Types of Cancer:"
            selections={includeCancerTypes}
            updateSelections={setIncludeCancerTypes}
            options={userDetailSelections.cancerTypeOptions}
            sectionLabelSize="18px"
          />
          <MultiSelectionDropdown
            label="Types of Treatments:"
            selections={includeTreatments}
            updateSelections={setIncludeTreatments}
            options={userDetailSelections.treatmentTypeOptions}
            sectionLabelSize="18px"
          />
          <MultiSelectionDropdown
            label="Types of Medications:"
            selections={includeMedications}
            updateSelections={setIncludeMedications}
            options={userDetailSelections.medicationOptions}
            sectionLabelSize="18px"
          />
        </SectionContainer>
        <Space height="24px" />
        <SectionContainer>
          <SectionTitle>Filters(exclude):</SectionTitle>
          <Space height="12px" />
          <MultiSelectionDropdown
            label="Types of Cancer:"
            selections={excludeCancerTypes}
            updateSelections={setExcludeCancerTypes}
            options={userDetailSelections.cancerTypeOptions}
            sectionLabelSize="18px"
          />
          <MultiSelectionDropdown
            label="Types of Treatments:"
            selections={excludeTreatments}
            updateSelections={setExcludeTreatments}
            options={userDetailSelections.treatmentTypeOptions}
            sectionLabelSize="18px"
          />
          <MultiSelectionDropdown
            label="Types of Medications:"
            selections={excludeMedications}
            updateSelections={setExcludeMedications}
            options={userDetailSelections.medicationOptions}
            sectionLabelSize="18px"
          />
        </SectionContainer>
      </FiltersContainer>
      <MessagesContainer>
        <SectionTitle>Message:</SectionTitle>
        <MessageInputArea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <Space height="12px" />
        <ButtonGroupContainer>
          <UpdateButton>Send message</UpdateButton>
        </ButtonGroupContainer>
      </MessagesContainer>
    </MainContainer>
  );
};

export default AdminSendMessages;