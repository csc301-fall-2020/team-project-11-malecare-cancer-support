import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";
import { getAge, getCurrentUser } from "../../utils/helpers";
import { filterMatches } from "./helper";
import styled from "styled-components";
import img from "../../../assets/UserPhoto.png";
import { FaFileExcel } from "react-icons/fa";

const MatchesPageContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  margin: 24px auto;
  flex-direction: row;
  padding: 10px 0px;
  border-radius: 4px;
`;
const FilterContainer = styled.div`
  flex-direction: column;
  width: 300px;
  text-align: left;
  padding: 0px 10px;
`;

const MatchContainer = styled.div`
  margin: 20px auto;
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
  font-size: 18px;
  width: 180px;
  height: 40px;
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
  margin: "10px",
  right: "180px",
};

const alignedButton = {
  display: "inline-block",
  margin: "0px 20px",
};

const filterTitle = {
  fontSize: "30px",
};

const Matches = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [filteredSexOrientation, setFilteredSexOrientation] = useState([
    "homosexual",
  ]);
  const [filteredGender, setFilteredGender] = useState(["male"]);
  const [filteredPurpose, setFilteredPurpose] = useState(["looking for love"]);
  const [matches, setMatches] = useState([]);

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

    const findMatches = async () => {
      const myMatches = await filterMatches(
        filteredSexOrientation,
        filteredGender,
        filteredPurpose
      );
      console.log(myMatches);
      if (myMatches) {
        setMatches(myMatches);
      }
    };

    fetchUser();
    findMatches();
  }, [
    filteredGender,
    filteredPurpose,
    filteredSexOrientation,
    history,
    setUser,
  ]);

  const handleViewProfile = () => {
    history.push("/profile/" + user.user_id);
  };

  const handleGotoPrevious = () => {
    history.push("/profile/" + user.user_id);
  };

  const handleGotoNext = () => {
    history.push("/profile/" + user.user_id);
  };

  const handleSendRequest = () => {
    history.push("/profile/" + user.user_id);
  };

  return user ? (
    <MatchesPageContainer>
      <FilterContainer>
        <span style={filterTitle}>Filter</span>
      </FilterContainer>
      <MatchContainer>
        <BorderContainer>
          <PhotoContainer>
            <img style={picStyle} src={img} alt="user picture" />
            <span style={label}>{user.purpose} </span>
          </PhotoContainer>
          <InfoContainer>
            <span style={info}>Name: {user.username} </span>
            <span style={info}>Age: {getAge(user.date_of_birth)}</span>
            <span style={info}>Gender: {user.gender}</span>
            <span style={info}>Cancer Type(s): {user.cancer}</span>
            <span style={info}>{user.short_intro}</span>
            <SmallButton style={profileButton} onClick={handleViewProfile}>
              full profile
            </SmallButton>
          </InfoContainer>
        </BorderContainer>
        <div style={buttons}>
          <SmallButton style={alignedButton} onClick={handleViewProfile}>
            previous
          </SmallButton>
          <BigButton style={alignedButton} onClick={handleViewProfile}>
            request to chat
          </BigButton>
          <SmallButton style={alignedButton} onClick={handleViewProfile}>
            next
          </SmallButton>
        </div>
      </MatchContainer>
    </MatchesPageContainer>
  ) : null;
};

export default Matches;
