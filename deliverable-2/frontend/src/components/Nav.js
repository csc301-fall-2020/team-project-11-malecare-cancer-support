import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

import {
  NavBarContainer,
  NavLinkContainer,
  NavLink,
  LogoutSection,
} from "./share-styled-component";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const logoutUser = async (event) => {
    event.preventDefault();
    const response = await axios.get("/logout");
    if (!response || response.status !== 200 || response.data !== "logout") {
      // placeholder - Adding some error messages here?
    }
    setUser(null);
    history.push("/login");
  };

  const renderNavBarItems = () => {
    if (user.is_admin) {
      return (
        <>
          <NavLink to="/adminHandleReports">
            <li>Reports</li>
          </NavLink>
          <NavLink to="/adminSendMessages">
            <li>Send Messages</li>
          </NavLink>
          <LogoutSection onClick={logoutUser}>Logout</LogoutSection>
        </>
      );
    }

    return (
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
    );
  };

  return (
    <NavBarContainer>
      <NavLink to="/">Cancerchat</NavLink>
      <NavLinkContainer>{user && renderNavBarItems()}</NavLinkContainer>
    </NavBarContainer>
  );
};

export default Nav;
