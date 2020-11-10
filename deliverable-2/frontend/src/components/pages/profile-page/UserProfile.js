import React, { useEffect } from "react";

const UserProfile = ({ match }) => {
  useEffect(() => {
    console.log(match);
  }, []);

  return <div>User Profile</div>;
};

export default UserProfile;
