import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MainPageContainer } from "./share-styled-component";
import Nav from "./Nav";
// Common pages
import Welcome from "./pages/common-page/welcome-page/Welcome";
import Login from "./pages/common-page/login-page/Login";
import SignUp from "./pages/common-page/signup-page/SignUp";

// Customer pages
import Account from "./pages/customer-page/account-page/Account";
import Matches from "./pages/customer-page/matches-page/Matches";
import Messages from "./pages/customer-page/messages-page/Messages";
import UserProfile from "./pages/customer-page/profile-page/UserProfile";
import MyProfileContainer from "./pages/customer-page/profile-page/MyProfileContainer";
import Requests from "./pages/customer-page/requests-page/Requests";

// Admin pages
import AdminSendMessages from "./pages/admin-page/adminSendMessage";
import AdminHandleReports from "./pages/admin-page/adminHandleReports";

import { UserContext } from "../contexts/UserContext";

const App = () => {
  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  // console.log(user);

  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <MainPageContainer>
          {user && <Nav />}
          <Switch>
            {/* Common routes */}
            <Route path="/" component={Welcome} exact />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />

            {/* Customer routes */}
            <Route path="/account" component={Account} />
            <Route path="/matches" component={Matches} />
            <Route path="/messages" component={Messages} />
            <Route path="/me" component={MyProfileContainer} />
            <Route path="/requests" component={Requests} />
            <Route path="/profile/:id" component={UserProfile} />

            {/* Admin routes */}
            <Route path="/adminHandleReports" component={AdminHandleReports} />
            <Route path="/adminSendMessages" component={AdminSendMessages} />
          </Switch>
        </MainPageContainer>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
