import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../utils/helpers";
import { UserContext } from "../../../contexts/UserContext";
import MyProfile from "./MyProfile";

const MyProfileContainer = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

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
    fetchUser();
  }, [user, history]);

  return user && <MyProfile user={user} setUser={setUser}></MyProfile>;
};

export default MyProfileContainer;
