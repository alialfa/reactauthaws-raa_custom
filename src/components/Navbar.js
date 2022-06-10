import React from "react";
import { useAuthenticator, Button, Image } from "@aws-amplify/ui-react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ route }) => {
  const { signOut } = useAuthenticator((context) => [context.user]);
  //console.log("<route-navbar>: ", route);

  const navigate = useNavigate();
  function redirectToLogin() {
    navigate(`/authify`);
  }
  const styleUl = {
    liststyletype: "none",
    margin: 0,
    padding: 0,
  };
  const styleLi = {
    display: "inline",
  };

  return (
    <div
      style={{
        backgroundColor: "aliceblue",
        color: "darkred",
        borderBottom: "solid 2px",
        padding: "1rem",
        textAlign: "right",
      }}
    >
      <ul style={styleUl}>
        <li style={{ display: "inline", float: "left" }}>
          <Link to="/">
            <Image
              alt="logo"
              src="https://docs.amplify.aws/assets/logo-dark.svg"
              width="40%"
            />
          </Link>
        </li>
        <li style={{ display: "inline", float: "right" }}>
          <Link to="/in">
            <h3>PrivRoute</h3>
          </Link>
        </li>
        <li style={{ display: "inline", float: "right" }}>&nbsp;&nbsp;</li>
        <li style={{ display: "inline", float: "right" }}>
          <Link to="/users">
            <h3>Users</h3>
          </Link>
        </li>

        {route === "authenticated" ? (
          <>
            <li style={styleLi}>
              <Button
                style={{ float: "right" }}
                onClick={(e) => {
                  signOut(e);
                  navigate(`/`);
                  console.log("LOGGED OUT");
                }}
              >
                SIGN OUT
              </Button>
              <br />
              <br />
            </li>
          </>
        ) : (
          <>
            <li style={styleLi}>
              <Link to="/authify">LOGIN / REGISTER</Link>
              {/* <h5>RR - USE LINK -- "Link to="/xxx"X /Link" </h5> */}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </li>
            <li style={styleLi}>
              <button style={{ height: "40px" }} onClick={redirectToLogin}>
                LOGIN / REGISTER
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {/* <h5>RR - USE NAVIGATE -- "navigate(`/xxx`);"</h5>*/}
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
