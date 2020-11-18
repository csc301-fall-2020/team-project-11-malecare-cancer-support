import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../utils/helpers";
import { UserContext } from "../../../contexts/UserContext";
import MyProfile from "./MyProfile";

const MyProfileContainer = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  // useEffect(() => {
  //   // if (!user) {
  //   //   history.push("/login");
  //   // }
  //   const fetchUser = async () => {
  //     const fetchedUser = await getCurrentUser();
  //     console.log(fetchedUser);
  //     if (fetchedUser) {
  //       console.log(fetchedUser)
  //       setUser(fetchedUser);
  //     } else {
  //       history.push("/login");
  //     }
  //   };
  //   fetchUser();
  // }, [user, history]);
  useEffect(() => {
    // if (!user) {
    //   history.push("/login");
    // }
    const fetchUser = async () => {
      const fetchedUser = await getCurrentUser();
      console.log(fetchedUser);
      if (fetchedUser) {
        console.log(fetchedUser)
        setUser(fetchedUser);
      } else {
        history.push("/login");
      }
    };
    fetchUser();
  }, []);
  console.log(user);
  return user && <MyProfile user={user} setUser={setUser}></MyProfile>;
};

export default MyProfileContainer;
