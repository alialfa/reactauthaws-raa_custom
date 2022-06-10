import React, { useState, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Header, Footer } from "./AuthenticatorComponents/HeaderFooter";
import { SignInHeader, SignInFooter } from "./AuthenticatorComponents/SignIn";
import { SignUpHeader, SignUpFooter } from "./AuthenticatorComponents/SignUp";
import { CSUHeader, CSUFooter } from "./AuthenticatorComponents/SignUpConfirm";
import { FormFields } from "./AuthenticatorComponents/FormFields";
import { FormFields_FNP } from "./AuthenticatorComponents/FormFields_FNP";
import { services } from "./AuthenticatorComponents/_services";
import Users from "../components/Users";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TestPage from "../components/TestPage";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import In from "../components/In";

const AuthenticatorLR = (props) => {
  let navigate = useNavigate();
  const redirectToDash = (user, category) => {
    const { attributes, signInUserSession } = user;
    var stateDash = {
      usr: {
        attributes: attributes,
        signInUserSession: signInUserSession,
      },
      //signOut: signOut(),
    };
    console.log(stateDash);
    //navigate(`/${category}`, { state: { stateDash } });
    //navigate(`/${category}`, { state: { user: user.username, stateDash } });
    //navigate(`/users/${category}`, { state: stateDash });
    //navigate(`/users/${category}`);
    window.location.reload();
  };

  return (
    <div className="app">
      <Authenticator
        variation="default" // default or modal
        initialState="signIn"
        loginMechanisms={["email"]} //  A username, email, or phone_number value is required for Cognito User Pools.
        signUpAttributes={["given_name"]} // or empty
        //socialProviders={["google"]}
        //hideSignUp={true}
        //components={components}
        // components={{
        //   Header,
        //   Footer,
        //   SignIn: { Header: SignInHeader, Footer: SignInFooter },
        //   SignUp: { Header: SignUpHeader, Footer: SignUpFooter, FormFields },
        //   ConfirmSignUp: { Header: CSUHeader, Footer: CSUFooter },
        //   ForceNewPassword: { FormFields: FormFields_FNP },
        // }}
        // services={services}
      >
        {({ user }) => (
          <>
            {/* <Navbar route={route} user={user} hLogout={hLogout} />
            <h3> Hey, {user.username}</h3> */}
            {/* <button onClick={navigate(`/users`)}>
             Navigate to User center
           </button>  */}
            <Routes>
              <Route
                path="in"
                element={
                  <>
                    <Authenticator className="hidden" />
                    <In user={user} />
                  </>
                }
              />
              <Route
                path="users"
                element={
                  <>
                    AAAAAA
                    {/* <Users user={user} /> */}
                    {/* <UsersOriginal /> */}
                    {/* <Students user={user} /> */}
                  </>
                }
              />
            </Routes>
          </>
        )}
      </Authenticator>
    </div>
  );
};

export default AuthenticatorLR;

// 1 - fail refresh
//  {({ signOut, user }) => <Users user={user} />}

// 2 - fail refresh
// ({ signOut, user }) => <Navigate to="/users/student" />}

//console.log(user);
//navigate("/users", { state: user });

//<>
//{/* <Users user={user} redirect={redirectToReport} /> */}
//{}
//{/* <Navigate to="/users" /> */}
//</> // <Users /> // state={{ from: location }} replace // // {state:{user:user}}

// {/* or just start up here for single users in no groups */}
// REACT DOCS -
/*       {({ signOut, user, todos }) => (
        <div>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}> Sign out</button>
          <br />
          <h2>Amplify Todos</h2>
          <input
            //onChange={(event) => setInput("name", event.target.value)}
            //value={formState.name}
            placeholder="Name"
          />
          <input
            //onChange={(event) => setInput("description", event.target.value)}
            //value={formState.description}
            placeholder="Description"
          />
          <button>Create Todo</button>\
        </div>
      )}
 */

// MINE ATTEMPTS
{
  /* {({ signOut, user }) => {
        //--------------------------------------------------------------------------------------------------------------------///
        //setUser(user);
        //console.log("SSO", user);
        //--------------------------------------------------------------------------------------------------------------------///
        // return <>{JSON.stringify(user)}</>;
        // return <>{user.username}</>;
        //return <Users user={user} />;
        //return <Navigate to="/users/student" />;
        //--------------------------------------------------------------------------------------------------------------------///
        // redirectToDash("student", { state: stateDash });
        const { attributes, signInUserSession } = user;

        var stateDash = {
          usr: {
            attributes: attributes,
            signInUserSession: signInUserSession,
          },
          //signOut: signOut(),
        };
        navigate(`/users`, { state: stateDash });
        //navigate(`/test`, { state: stateDash });
        window.location.reload();
        //--------------------------------------------------------------------------------------------------------------------///
      }} */
}
