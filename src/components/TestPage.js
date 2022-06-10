import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TestPage = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("test-state", state);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>TestPage</h1>
      <br />
      <button
        onClick={(e) => {
          //navigate("/users/student");
          navigate(-1);
        }}
      >
        back
      </button>
    </div>
  );
};

export default TestPage;
