import React from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const Students = (props) => {
  return (
    <div style={{ backgroundColor: "darkgreen" }}>
      <div style={{ textAlign: "right" }}>
        <h2 style={{ color: "white" }}>STUDENT DASHBOARD</h2>
        <Link to="/test">
          <h2>TESTS&nbsp;&nbsp;&nbsp;&nbsp;</h2>
        </Link>
      </div>
      <Profile user={props.user} signOut={props.signOut} />
    </div>
  );
};

export default Students;
