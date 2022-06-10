// https://ui.docs.amplify.aws/?platform=react
import React, { useState, useEffect } from "react";
import "./App.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AuthenticatorLR from "./Auth/AuthenticatorLR";
//import PageNotFound from "./components/PageNotFound";
import Out from "./components/Out";

function App() {
  const { route } = useAuthenticator((context) => [context.route]);
  console.log("<route-app>: ", route);

  const AppStart = () => (
    <div className="app">
      <AuthenticatorLR />
    </div>
  );

  const Unauthenticated = () => (
    <div className="app">
      <Navbar route={route} />
      <Routes>
        <Route>
          <Route index element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route path="authify" element={<AuthenticatorLR />} />
          <Route path="auth-fail" element={<Out />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
          {/* <Route path="*" element={<Out />} /> */}
          <Route path="*" element={<AppStart />} />
        </Route>
      </Routes>
    </div>
  );

  // Use the value of route to decide which page to render
  return route === "authenticated" ? <AppStart /> : <Unauthenticated />;
}

// ProtectedRoute --- https://www.robinwieruch.de/react-router-private-routes/
const ProtectedRoute = ({ user, redirectPath = "/auth-fail", children }) => {
  const { route } = useAuthenticator((context) => [context.route]);
  //console.log("<protected-user>: ", user);
  // const { state } = useLocation();
  // console.log("app-state", state);
  // if (!state) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  console.log("<route-app>: ", route);

  if (route !== "authenticated") {
    //if (!user) {
    return <Navigate to={redirectPath} replace />;
    //       <Navigate to={redirectPath} replace state={{ path: location.pathname }} />
  }

  return children;
};

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
export default AppWithRouter;
