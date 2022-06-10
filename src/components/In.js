import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";

const In = (props) => {
  let navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]);
  if (typeof user === "undefined") return <h1>Loading user...</h1>;
  return (
    <div>
      YOU ARE INNNNNNNNNNNNNNNNNNNNNNNNNN
      <h3>user type -- {typeof user}</h3>
      <p>user component level -- {user.attributes.given_name}</p>
      <p>user props app level -- {props.user.attributes.given_name}</p>
      <button onClick={navigate(`/users`)}>Navigate to User center</button>
    </div>
  );
};

export default In;
