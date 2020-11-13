import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import {
  NavBarContainer,
  NavLinkContainer,
  NavLink,
  LogoutSection,
} from "./share-styled-component";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    history.push("/");
  }, [user, history]);

  const logoutUser = async (event) => {
    event.preventDefault();
    const response = await axios.get("/logout");
    if (!response || response.status !== 200 || response.data !== "logout") {
      // placeholder - Adding some error messages here?
    }
    setUser(null);
  };

  return (
    <NavBarContainer>
      <NavLink to="/">Cancerchat</NavLink>
      <NavLinkContainer>
        {user && (
          <>
            <NavLink to="/">
              <li>Matches</li>
            </NavLink>
            <NavLink to="/messages">
              <li>Messages</li>
            </NavLink>
            <NavLink to="/me">
              <li>My Profile</li>
            </NavLink>
            <NavLink to="/requests">
              <li>Requests</li>
            </NavLink>
            <LogoutSection onClick={logoutUser}>Logout</LogoutSection>
          </>
        )}
      </NavLinkContainer>
    </NavBarContainer>
  );
};

export default Nav;
