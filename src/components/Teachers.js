import React from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const Teachers = (props) => {
  return (
    <div style={{ backgroundColor: "darkgrey" }}>
      <div style={{ textAlign: "right" }}>
        <h2 style={{ color: "white" }}>TEACHER DASHBOARD</h2>
        <Link to="/test">
          <h2>TESTS&nbsp;&nbsp;&nbsp;&nbsp;</h2>
        </Link>
      </div>
      <Profile user={props.user} signOut={props.signOut} />
    </div>
  );
};

export default Teachers;
