//import "./PageNotFound.css";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = (props) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>404 Error</h1>
        <h1>Page Not Found</h1>
        <h4>
          <Link to="/"> Back To HomePage</Link>
        </h4>
      </div>
    </>
  );
};

export default PageNotFound;
