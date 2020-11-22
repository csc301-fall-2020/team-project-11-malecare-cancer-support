import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../contexts/UserContext";
import { getUserDetailOptions } from "./helper";
import MultiCardSelection from "../../component-library/MultiCardSelection";
import MultiSelectionDropdown from "../../component-library/MultiSelectionDropdown";
import SliderSelection from "../../component-library/SliderSelection";
import { getCurrentUser } from "../../utils/helpers";
import io from "socket.io-client";
import Slider from "@material-ui/core/Slider";
import { message as alertMessage } from "antd"

import {
  Space,
  ErrorMessageContainer,
  UpdateButton,
} from "../../share-styled-component";

import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { HOST_URL } from "../../utils/sharedUrl";

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

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

const LoadingMessageInputArea = styled.div`
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
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [includeGenders, setIncludeGenders] = useState([]);
  const [includeAges, setIncludeAges] = useState([18, 100]);
  const [includeCancerTypes, setIncludeCancerTypes] = useState([]);
  const [excludeCancerTypes, setExcludeCancerTypes] = useState([]);
  const [includeMedications, setIncludeMedications] = useState([]);
  const [excludeMedications, setExcludeMedications] = useState([]);
  const [includeTreatments, setIncludeTreatments] = useState([]);
  const [excludeTreatments, setExcludeTreatments] = useState([]);
  const [userDetailSelections, setUserDetailSelections] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textBoxLoading, setTextBoxLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getCurrentUser();
      if (!fetchedUser) {
        // User not logged in
        history.push("/");
      } else if (!fetchedUser.is_admin) {
        // User is not admin
        history.push("/matches");
      } else {
        // User fetched and updated
        setUser(fetchedUser);
        setUserDetailSelections(await getUserDetailOptions());
        setLoading(false);
      }
    };

    fetchUser();
  }, [history, setUser]);

  useEffect(() => {
    let socket = io.connect(HOST_URL, { reconnection: true });
    socket.emit("index");
    socket.emit("save_session");
    setSocket(socket);

    socket.on("to_admin", (res) => {
      setTextBoxLoading(false)
      if (res === "Successfully sent") {
        console.log("success")
        // alert("Message has been sent.");
        alertMessage.success("Message has been sent.")
        setMessage("");
      } else {
        setErrorMessage(res);
      }
    });

    return () => {
      socket.close();
      setSocket(undefined);
    };
  }, []);

  const handleSendMessage = async () => {
    if (textBoxLoading) {
      return setErrorMessage("Please wait until current message is sent.")
    }
    setTextBoxLoading(true)
    setErrorMessage("");
    if (
      _.isEmpty(includeGenders) ||
      _.isEmpty(includeAges) ||
      _.isEmpty(includeCancerTypes) ||
      _.isEmpty(includeMedications) ||
      _.isEmpty(includeTreatments)
    ) {
      setTextBoxLoading(false)
      return setErrorMessage(
        "Please fill in all the filters in the Filters(include) section."
      );
    }
    if (_.isEmpty(message)) {
      setTextBoxLoading(false)
      return setErrorMessage("The message cannot be empty.");
    }

    // Initiate Signup Request
    const requestBody = {
      includeGenders,
      includeAges,
      includeCancerTypes,
      excludeCancerTypes,
      includeMedications,
      excludeMedications,
      includeTreatments,
      excludeTreatments,
      message,
    };
    console.log(requestBody)
    socket.emit("admin_send_msg", requestBody);

  };


  return loading ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
      <MainContainer>
        <FiltersContainer>
          <SectionContainer>
            <SectionTitle>Filters(include):</SectionTitle>

            <Space height="12px" />
            <MultiCardSelection
              label="Genders:"
              selections={includeGenders}
              allowSelectAll
              updateSelections={setIncludeGenders}
              options={userDetailSelections.genderOptions || []}
              roundedCard
              sectionLabelSize="18px"
              cardLabelSize="18px"
            />
            <SliderSelection
              sectionLabelSize="18px"
              label="Ages"
              includeAges={includeAges}
              setIncludeAges={setIncludeAges}
            />
            <MultiSelectionDropdown
              label="Types of Cancer:"
              selections={includeCancerTypes}
              allowSelectAll
              updateSelections={setIncludeCancerTypes}
              options={userDetailSelections.cancerTypeOptions}
              sectionLabelSize="18px"
            />
            <MultiSelectionDropdown
              label="Types of Treatments:"
              selections={includeTreatments}
              allowSelectAll
              updateSelections={setIncludeTreatments}
              options={userDetailSelections.treatmentTypeOptions}
              sectionLabelSize="18px"
            />
            <MultiSelectionDropdown
              label="Types of Medications:"
              selections={includeMedications}
              allowSelectAll
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
          {textBoxLoading ? (
            <LoadingMessageInputArea>
              <PulseLoader
                css={loaderCSS}
                size={40}
                loading={textBoxLoading}
                color="rgb(172, 102, 104)"
              ></PulseLoader>
            </LoadingMessageInputArea>
          ) : (<MessageInputArea
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />)}
          {!_.isEmpty(errorMessage) && (
            <>
              <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
              <Space height="24px" />
            </>
          )}
          <Space height="12px" />
          <ButtonGroupContainer>
            <UpdateButton onClick={handleSendMessage}>Send message</UpdateButton>
          </ButtonGroupContainer>
        </MessagesContainer>
      </MainContainer>
    );
};

export default AdminSendMessages;
