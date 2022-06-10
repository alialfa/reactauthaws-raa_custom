import React from "react";

const Out = (props) => {
  return (
    <div style={{ textAlign: "center", marginTop: 120 }}>
      <br />
      <h1 style={{ color: "red" }}>ACCESS DENIED!</h1>
      <h3 style={{ color: "green" }}>
        <i>PLEASE LOG IN</i>
      </h3>
      <hr style={{ width: "70px" }} />
    </div>
  );
};

export default Out;
