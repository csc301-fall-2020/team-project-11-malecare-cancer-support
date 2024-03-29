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
import { HOST_URL } from "./utils/sharedUrl";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const logoutUser = async (event) => {
    event.preventDefault();
    const response = await axios.get(HOST_URL + "/logout");
    if (!response || response.status !== 200 || response.data !== "logout") {
      // placeholder - Adding some error messages here?
    }
    setUser(null);
    history.push("/");
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
          <NavLink to="/adminDeleteUser">
            <li>Delete User</li>
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
        <NavLink to="/account">
          <li>Account</li>
        </NavLink>
        <LogoutSection onClick={logoutUser}>Logout</LogoutSection>
      </>
    );
  };

  return (
    <NavBarContainer>
      <NavLink to="/">CancerChat</NavLink>
      <NavLinkContainer>{renderNavBarItems()}</NavLinkContainer>
    </NavBarContainer>
  );
};

export default Nav;
