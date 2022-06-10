import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Header, Footer } from "./AuthenticatorComponents/HeaderFooter";
import { SignInHeader, SignInFooter } from "./AuthenticatorComponents/SignIn";
import { SignUpHeader, SignUpFooter } from "./AuthenticatorComponents/SignUp";
import { CSUHeader, CSUFooter } from "./AuthenticatorComponents/SignUpConfirm";
import { FormFields } from "./AuthenticatorComponents/FormFields";
import { FormFields_FNP } from "./AuthenticatorComponents/FormFields_FNP";
import { services } from "./AuthenticatorComponents/_services";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import Students from "../components/Students";
import Teachers from "../components/Teachers";
import In from "../components/In";
import TestPage from "../components/TestPage";

const AuthenticatorLR = (props) => {
  //let navigate = useNavigate();

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
        components={{
          Header,
          Footer,
          SignIn: { Header: SignInHeader, Footer: SignInFooter },
          SignUp: { Header: SignUpHeader, Footer: SignUpFooter, FormFields },
          ConfirmSignUp: { Header: CSUHeader, Footer: CSUFooter },
          ForceNewPassword: { FormFields: FormFields_FNP },
        }}
        services={services}
      >
        {({ user }) => (
          <>
            {/* <Navbar route={route} user={user} hLogout={hLogout} />
            <h3> Hey, {user.username}</h3> */}
            {/* <button onClick={navigate(`/users/student`)}>
              Navigate to User center
            </button> */}
            <Navbar route="authenticated" />
            <Routes>
              <Route
                path="in"
                element={
                  <>
                    {/*amplify bug trick for authenticator */}
                    <Authenticator className="hidden" />
                    <In user={user} />
                  </>
                }
              />
              <Route path="test" element={<TestPage />} />
              <Route path="users" element={<Users user={user} />}>
                <Route path="student" element={<Students user={user} />} />
                <Route path="teacher" element={<Teachers user={user} />} />
              </Route>
              <Route path="*" element={<Navigate to="/users" replace />} />
            </Routes>
          </>
        )}
      </Authenticator>
    </div>
  );
};

export default AuthenticatorLR;
