import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const UsersHeader = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          textAlign: "center",
        }}
      >
        <h1>USERS</h1>
        <Link to="/users/student">Student Dashboard</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/users/teacher">Teacher Dashboard</Link>
        <br /> <br />
        <button
          style={{ height: "50px" }}
          onClick={(e) => navigate(`/users/student`)}
        >
          STUDENT DASHBOARD
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          style={{ height: "50px" }}
          onClick={(e) => navigate(`/users/teacher`)}
        >
          TEACHER DASHBOARD
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

export default UsersHeader;
