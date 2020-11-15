import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MainPageContainer } from "./share-styled-component";
import Nav from "./Nav";
import Welcome from "./pages/welcome-page/Welcome";
import Matches from "./pages/matches-page/Matches";
import Messages from "./pages/messages-page/Messages";
import UserProfile from "./pages/profile-page/UserProfile";
import MyProfileContainer from "./pages/profile-page/MyProfileContainer";
import Requests from "./pages/requests-page/Requests";
import Login from "./pages/login-page/Login";
import SignUp from "./pages/signup-page/SignUp";
import AdminSendMessages from "./pages/admin-page/adminSendMessage";
import AdminHandleReports from "./pages/admin-page/adminHandleReports";

import { UserContext } from "../contexts/UserContext";

const App = () => {
  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <MainPageContainer>
          <Nav />
          <Switch>
            {/* Regular User */}
            <Route path="/" component={Welcome} exact />
            <Route path="/matches" component={Matches} />
            <Route path="/messages" component={Messages} />
            <Route path="/me" component={MyProfileContainer} />
            <Route path="/requests" component={Requests} />
            <Route path="/profile/:id" component={UserProfile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />

            {/* Admin User */}
            <Route path="/adminHandleReports" component={AdminHandleReports} />
            <Route path="/adminSendMessages" component={AdminSendMessages} />
          </Switch>
        </MainPageContainer>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
