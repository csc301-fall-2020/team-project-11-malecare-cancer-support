import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../../contexts/UserContext";
import MyProfile from "./MyProfile";

const MyProfileContainer = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);
  console.log(user);
  return user && <MyProfile user={user} setUser={setUser}></MyProfile>;
};

export default MyProfileContainer;
