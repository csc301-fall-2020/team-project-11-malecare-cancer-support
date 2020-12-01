import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../../../../contexts/UserContext";
import { getAge, getCurrentUser } from "../../../utils/helpers";
import { filterMatches } from "./helper";
import styled from "styled-components";
import RegionDropdown from "../../../component-library/RegionDropdown";
import SliderSelection from "../../../component-library/SliderSelection";
import img from "../../../../assets/UserPhoto.png";
import MultiCardSelection from "../../../component-library/MultiCardSelection";
import {
  PageTitleSection,
  Space,
  PrimaryButton,
} from "../../../share-styled-component";

import _ from "lodash";
import { message } from "antd";
import { message as alertMessage } from "antd";

import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";

import { getUserDetailOptions } from "../../common-page/signup-page/helper";
import { HOST_URL } from "../../../utils/sharedUrl";

const loaderCSS = css`
  margin-top: 300px;
  margin-bottom: 50px;
  flex: 1;
`;

const MatchesPageContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  margin: 0px auto;
  flex-direction: row;
  padding: 10px 0px;
  border-radius: 4px;
`;
const FilterContainer = styled.div`
  flex-direction: column;
  width: 600px;
  height: 750px;
  text-align: left;
  padding: 0px 10px;
`;

const MatchContainer = styled.div`
  margin: 50px 50px 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SmallButton = styled.button`
  border-radius: 50px;
  background-color: #d54e54;
  color: #ffffff;
  border: 2px solid #d54e54;
  font-size: 16px;
  width: 100px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const BigButton = styled.button`
  border-radius: 50px;
  background-color: #d54e54;
  color: #ffffff;
  border: 2px solid #d54e54;
  font-size: 20px;
  width: 200px;
  height: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const BorderContainer = styled.div`
  display: flex;
  border-radius: 15px;
  border: 6px solid #d54e54;
  padding: 20px;
  width: 720px;
  height: 480px;
`;

const PhotoContainer = styled.div`
  flex: 1;
  flex-direction: column;
  margin-right: 20px;
`;

const EmptyMatch = styled.div`
  font-size: 25px;
  margin-left: 25px;
  margin-top: 180px;
  font-weight: bold;
  color: #4d222a;
`;

const InfoContainer = styled.div`
  flex: 1;
  flex-direction: column;
  float: right;
  padding: 0px 15px;
  position: relative;
  height: 420px;
  width: 350px;
`;

const picStyle = {
  height: "320px",
  margin: "10px",
};

const info = {
  display: "block",
  margin: "10px 10px",
  fontSize: "20px",
  textAlign: "left",
};

const label = {
  display: "block",
  fontSize: "20px",
  background: "#F5F5F5",
};

const profileButton = {
  position: "absolute",
  right: "0px",
  bottom: "0px",
};

const buttons = {
  margin: "20px 0px",
  left: "15px",
  width: "720px",
};

const alignedButton = {
  display: "inline-block",
  margin: "0px 30px",
};

const Matches = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [filterSexOrientation, setFilteredSexOrientation] = useState([
    "heterosexual",
  ]);
  const [region, setRegion] = useState({});
  const [includeAges, setIncludeAges] = useState([18, 100]);
  const [filterGender, setFilterGender] = useState(["male"]);
  const [filterPurpose, setFilterPurpose] = useState(["looking for love"]);
  const [matches, setMatches] = useState([]);
  const [userDetailSelections, setUserDetailSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [matchesIndex, setMatchesIndex] = useState(0);
  const [mSocket, setMSocket] = useState(null);

  const handleApply = async () => {
    if (
      _.isEmpty(filterGender) ||
      _.isEmpty(filterPurpose) ||
      _.isEmpty(includeAges) ||
      _.isEmpty(filterSexOrientation)
    ) {
      message.warning("Empty filter");
      // TODO: Maybe fill the filter item? Make it filter nothing?
    } else {
      setLoading(true);
      console.log("SELECTOR REGION", region)
      const myMatches = await filterMatches(
        filterSexOrientation,
        filterGender,
        filterPurpose, 
        includeAges,
        region
      );
      console.log(myMatches);
      if (myMatches) {
        setMatches(myMatches);
        console.log("match", myMatches);
      }
    }
    console.log("update");
    setLoading(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getCurrentUser();
      if (!fetchedUser) {
        // User not logged in
        history.push("/");
      } else if (fetchedUser.is_admin) {
        // User is admin
        history.push("/adminSendMessages");
      } else {
        // User fetched and updated
        // setRegion(fetchedUser.region)
        setUser(fetchedUser);
        // console.log("FETCHED USER REGION", fetchedUser.region)
        const myMatches = await filterMatches(
          filterSexOrientation,
          filterGender,
          filterPurpose,
          includeAges,
          {}
        );
        console.log("match", myMatches);
        if (myMatches) {
          setMatches(myMatches);
        }
        // setLoading(false);
      }
    };

    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
      setLoading(false);
    };

    // const findMatches = async (mRegion) => {
    //   console.log(mRegion)
    //   const myMatches = await filterMatches(
    //     filterSexOrientation,
    //     filterGender,
    //     filterPurpose,
    //     includeAges,
    //     mRegion
    //   );
    //   console.log("match", myMatches);
    //   if (myMatches) {
    //     setMatches(myMatches);
    //   }
    // };

    const socket = io.connect(HOST_URL, { reconnection: true });
    socket.emit("save_session");
    setMSocket(socket);

    fetchUser();
    // findMatches();
    fetchUserDetailSelections();

    return () => {
      socket.close();
      setMSocket(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, setUser]);

  const handleViewProfile = () => {
    if (matches.length !== 0) {
      const w = window.open("about:blank");
      w.location.href = "/profile/" + matches[matchesIndex].user_id;
    }
  };

  const handleGotoPrevious = () => {
    if (matches.length !== 0 && matchesIndex !== 0) {
      console.log("match index: ", matchesIndex);
      setMatchesIndex(matchesIndex - 1);
    }
  };

  const handleGotoNext = () => {
    if (matches.length !== 0 && matchesIndex !== matches.length - 1) {
      console.log("match index: ", matchesIndex);
      setMatchesIndex(matchesIndex + 1);
    }
  };

  const handleSendRequest = (receiverId) => {
    mSocket.emit("new_friend_request", {
      receiver: receiverId,
    });
    alertMessage.success("Request has been sent.");
  };

  return loading ? (
    <PulseLoader
      css={loaderCSS}
      size={40}
      loading={loading}
      color="rgb(172, 102, 104)"
    ></PulseLoader>
  ) : (
    <MatchesPageContainer>
      <FilterContainer>
        <PageTitleSection>Filter</PageTitleSection>
        <MultiCardSelection
          label="Gender:"
          selections={filterGender}
          updateSelections={setFilterGender}
          roundedCard
          options={userDetailSelections.genderOptions || []}
        />
        <Space height="12px" />
        <MultiCardSelection
          label="Target:"
          selections={filterPurpose}
          updateSelections={setFilterPurpose}
          roundedCard
          options={userDetailSelections.purposeOptions || []}
        />
        <Space height="12px" />
        <SliderSelection
          sectionLabelSize="24px"
          label="Ages: "
          includeAges={includeAges}
          setIncludeAges={setIncludeAges}
        />
        <Space height="12px" />
        <MultiCardSelection
          label="Sex orientation:"
          selections={filterSexOrientation}
          updateSelections={setFilteredSexOrientation}
          roundedCard
          options={userDetailSelections.sexualOrientationOptions || []}
        />
        <Space height="12px" />
        <RegionDropdown
          label="Location:"
          region={region}
          setRegion={setRegion}
        />
        <Space height="36px" />
        <div>(Your current location by default)</div>
        <Space height="36px" />
        <PrimaryButton onClick={handleApply}>Apply</PrimaryButton>
        <Space height="24px" />
      </FilterContainer>
      <MatchContainer>
        <BorderContainer>
          {matches.length !== 0 && (
            <PhotoContainer>
              <img style={picStyle} src={img} alt="user" />
              <span style={label}>
                {matches[matchesIndex].purpose &&
                  matches[matchesIndex].purpose.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}{" "}
              </span>
            </PhotoContainer>
          )}
          {matches.length !== 0 ? (
            <InfoContainer>
              <span style={info}>Name: {matches[matchesIndex].username} </span>
              <span style={info}>
                Age:
                {getAge(matches[matchesIndex].date_of_birth)}
              </span>
              <span style={info}>Gender: {matches[matchesIndex].gender}</span>
              <span style={info}>
                Cancer Type(s): 
                {matches[matchesIndex].cancer &&
                  (matches[matchesIndex].cancer.length <= 3
                    ? matches[matchesIndex].cancer
                    : matches[matchesIndex].cancer.slice(0, 3).concat(["..."])
                  ).map((item, index) => <div key={index}>{item}</div>)}
              </span>
              <span style={info}>
                Greeting message: {matches[matchesIndex].short_intro}
              </span>
              <SmallButton style={profileButton} onClick={handleViewProfile}>
                full profile
              </SmallButton>
            </InfoContainer>
          ) : (
            <EmptyMatch>
              It is sad but no one is here. Maybe try another filter?
            </EmptyMatch>
          )}
        </BorderContainer>
        {matches.length !== 0 && (
          <div style={buttons}>
            <SmallButton style={alignedButton} onClick={handleGotoPrevious}>
              previous
            </SmallButton>
            <BigButton
              style={alignedButton}
              onClick={() => {
                handleSendRequest(matches[matchesIndex].user_id);
              }}
            >
              request to chat
            </BigButton>
            <SmallButton style={alignedButton} onClick={handleGotoNext}>
              next
            </SmallButton>
          </div>
        )}
      </MatchContainer>
    </MatchesPageContainer>
  );
};

export default Matches;
