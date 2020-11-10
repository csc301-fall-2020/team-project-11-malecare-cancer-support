import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import {
  NavBarContainer,
  NavLinkContainer,
  NavLink,
} from "./share-styled-component";

const Nav = () => {
  const { user } = useContext(UserContext);

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
          </>
        )}
      </NavLinkContainer>
    </NavBarContainer>
  );
};

export default Nav;
