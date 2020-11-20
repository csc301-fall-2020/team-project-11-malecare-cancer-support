import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";
import { getAge, getCurrentUser } from "../../utils/helpers";
import { filterMatches } from "./helper";
import styled from "styled-components";
import img from "./sample_pic.png"

const MatchesPageContainer = styled.div`
  padding: 24px 30px;
`;

const FilterContainer = styled.div`
  float: left;
  width: 150px;
  text-align: left;
`;

const SmallButton = styled.button`
  border: 2px solid #d54e54;
  border-radius: 50px;
  background-color: #d54e54;
  color: #ffffff;
  font-size: 16px;
  width: 100px;
  height: 30px;
`;

const MatchContainer = styled.div`
  float: left;
`;

const BorderContainer = styled.div`
  display: block;
  border: 6px solid #d54e54;
  border-radius: 15px;
  padding: 20px;
  width: 500px;
  height: 400px;
`;

const InfoContainer = styled.div`
  float: left;
  padding: 0px 15px;
`;

const picStyle = {
  float: "left",
  width: "200px",
}

const info = {
  display: "block",
  margin: "10px 0px",
  fontSize: "25px",
  textAlign: "left",
}

const filterTitle = {
  fontSize: "30px",
}

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
      if (!fetchUser) {
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
  // return user ? <div>username: {user.username}
  //   <br></br> cancer: {user.cancer}
  // </div> : null;
  return user ? (
    <MatchesPageContainer>
      <FilterContainer>
        <span>Filter</span>
      </FilterContainer>
      <MatchContainer>
        <BorderContainer>
          <img style={picStyle} src={img} alt="user picture"/>
          <span style={info}>labels: {user.purpose} </span>
          <InfoContainer>
            <span style={info}>Name: {user.username} </span>
            <span style={info}>Age: {getAge(user.date_of_birth)}</span>
            <span style={info}>Gender: {user.gender}</span>
            <span style={info}>Cancer Type(s): {user.cancer}</span>
            <span style={info}>{user.short_intro}</span>
            <SmallButton>full profile</SmallButton>
          </InfoContainer>
        </BorderContainer>
      </MatchContainer>
    </MatchesPageContainer>
  ) : null;
};

export default Matches;
