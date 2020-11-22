import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { UserContext } from "../../../contexts/UserContext";
import { getAge, getCurrentUser } from "../../utils/helpers";
import { filterMatches } from "./helper";
import styled from "styled-components";
import img from "../../../assets/UserPhoto.png";
import MultiCardSelection from "../../component-library/MultiCardSelection";
import { Space, PrimaryButton } from "../../share-styled-component";
import { getUserDetailOptions } from "../signup-page/helper";
import _ from "lodash";
import { message } from "antd";
import { message as alertMessage } from "antd"

import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import { socketUrl } from "../../utils/sharedUrl";

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
  position: "relative",
  margin: "20px",
  left: "15px",
};

const alignedButton = {
  display: "inline-block",
  margin: "0px 30px",
};

// const filterTitle = {
//   fontSize: "30px",
// };

const Title = styled.div`
  font-size: 38px;
  font-weight: bold;
  color: #4d222a;
`;

const Matches = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [filterSexOrientation, setFilteredSexOrientation] = useState([
    "heterosexual",
  ]);
  const [filterGender, setFilterGender] = useState(["male"]);
  const [filterPurpose, setFilterPurpose] = useState(["looking for love"]);
  // const [filterCanerType, setFilterCanerType] = useState([]);
  // const [filterDistance, setFilteredDistance] = useState([]);
  const [matches, setMatches] = useState([]);
  const [userDetailSelections, setUserDetailSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [matchesIndex, setMatchesIndex] = useState(0);
  const [mSocket, setMSocket] = useState(null)

  const handleApply = async () => {
    if (
      _.isEmpty(filterGender) ||
      _.isEmpty(filterPurpose) ||
      _.isEmpty(filterSexOrientation)
    ) {
      message.warning("Empty filter");
      // TODO: Maybe fill the filter item? Make it filter nothing?
    } else {
      const myMatches = await filterMatches(
        filterSexOrientation,
        filterGender,
        filterPurpose
      );
      console.log(myMatches);
      if (myMatches) {
        setMatches(myMatches);
        console.log("match", myMatches);
      }
    }
    console.log("update");
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
        setUser(fetchedUser);
      }
    };

    const fetchUserDetailSelections = async () => {
      setUserDetailSelections(await getUserDetailOptions());
      setLoading(false);
    };

    const findMatches = async () => {
      const myMatches = await filterMatches(
        filterSexOrientation,
        filterGender,
        filterPurpose
      );
      console.log("match", myMatches);
      if (myMatches) {
        setMatches(myMatches);
      }
    };

    const socket = io.connect(socketUrl, {reconnection: true})
    socket.emit("save_session")
    setMSocket(socket)

    fetchUser();
    findMatches();
    fetchUserDetailSelections();

    return () => {
      socket.close();
      setMSocket(undefined);
    };
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

  // const send = () => {
  //   if (!user) return;
  //   const socket = io.connect(socketUrl, {reconnection: true})
  //   socket.emit('new_friend_request', {
  //     receiver: user.user_id
  //   });
  // };

  const handleSendRequest = (receiverId) => {
    mSocket.emit('new_friend_request', {
      receiver: receiverId
    });
    alertMessage.success("Request has been sent.")
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
        <Title>Filter</Title>
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
        <MultiCardSelection
          label="Sex orientation:"
          selections={filterSexOrientation}
          updateSelections={setFilteredSexOrientation}
          roundedCard
          options={userDetailSelections.sexualOrientationOptions || []}
        />
        <Space height="24px" />
        <PrimaryButton onClick={handleApply}>Apply</PrimaryButton>
        <Space height="24px" />
      </FilterContainer>
      <MatchContainer>
        <BorderContainer>
          {matches.length !== 0 && (
            <PhotoContainer>
              <img style={picStyle} src={img} alt="user picture" />
              <span style={label}>{matches[matchesIndex].purpose} </span>
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
                Cancer Type(s): {matches[matchesIndex].cancer}
              </span>
              <span style={info}>{matches[matchesIndex].short_intro}</span>
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
            <BigButton style={alignedButton} onClick={()=>{handleSendRequest(matches[matchesIndex].user_id)}}>
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
