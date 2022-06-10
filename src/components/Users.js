import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import UsersHeader from "./UsersHeader";

const Users = (props) => {
  let navigate = useNavigate();
  // user groups
  const group =
    props.user.signInUserSession.idToken.payload["cognito:groups"][0];
  console.log("user-group:", group);

  // https://stackoverflow.com/questions/69868956/how-to-redirect-in-react-router-v6
  useEffect(() => {
    // URL ==  to={`/users/${group.substring(0, group.length - 1).toLowerCase()}`}
    if (group === "STUDENTS") {
      return navigate(`/users/student`); //return <Students user={props.user} />;
    }
    if (group === "TEACHERS") {
      //console.log("url", url);
      return navigate(`/users/teacher`);
    }
  }, [group]);

  return (
    <>
      {/* <UsersHeader /> */}
      <Outlet />
    </>
  );
};

export default Users;
