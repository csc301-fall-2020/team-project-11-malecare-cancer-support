import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";
import { getCurrentUser } from "../../utils/helpers";

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

  return user ? <div>{user.username}</div> : null;
};

export default Matches;
