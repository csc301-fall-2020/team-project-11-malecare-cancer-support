import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";
import { getAge, getCurrentUser } from "../../utils/helpers";

const Matches = () => {
  // const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getCurrentUser();
      console.log(fetchedUser);
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        history.push("/login");
      }
    };

    fetchUser();
  }, [history]);
  // return user ? <div>username: {user.username}
  //   <br></br> cancer: {user.cancer}
  // </div> : null;
  return user ?
    <div>
      username: {user.username}<br></br>
      gender: {user.gender}<br></br>
      sexual preference: {user.sex_orientation}<br></br>
      cancer: {user.cancer}<br></br>
      age: {getAge(user.date_of_birth)}<br></br>
      {user.short_intro}<br></br>
      labels: {user.purpose}
      
    </div>:null;
}

export default Matches;
