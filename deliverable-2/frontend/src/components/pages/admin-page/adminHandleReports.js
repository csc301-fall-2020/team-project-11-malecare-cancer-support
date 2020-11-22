import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../../contexts/UserContext";

const AdminHandleReports = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);
  console.log(user);
  return user && <div>{user.username}</div>;
};

export default AdminHandleReports;
