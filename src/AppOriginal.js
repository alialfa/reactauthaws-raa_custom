// https://ui.docs.amplify.aws/?platform=react
import React, { useState, useEffect } from "react";
import "./App.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AuthenticatorLR from "./Auth/AuthenticatorLR";
import Users from "./components/Users";
import UsersOriginal from "./components/UsersOriginal";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import TestPage from "./components/TestPage";
import PageNotFound from "./components/PageNotFound";
import In from "./components/In";
import Out from "./components/Out";

function App() {
  const [user, setUser] = useState(null);
  const { signOut } = useAuthenticator((context) => [context.user]);
  const { route } = useAuthenticator((context) => [context.route]);
  //console.log("<route-app>: ", route);

  /*   const hLogin = (usr) => {
    setUser(usr);
    console.log("<LOGGED IN > USER>: ", user);
  };
 */ const hLogout = (e) => {
    signOut(e);
    setUser(null);
  };

  useEffect(() => {
    // const checkUser = () => {
    //   Auth.currentAuthenticatedUser({
    //     bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    //   })
    //     .then((user) => {
    //       setUser(user);
    //       console.log("<user-app>: ", user);
    //     })
    //     .catch((err) => console.log(err));
    // };

    let active = true;
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (active) {
          setUser(user);
          console.log("<user-app>: ", user);
        }
      } catch (error) {
        if (active) {
          setUser(null);
          console.log(error);
        }
      }
    };

    checkUser();

    //return () => (active = false);
  }, [setUser]);
  //}, [user]);

  // Use the value of route to decide which page to render
  //return route === 'authenticated' ? <Home /> : <Authent

  return (
    <div className="app">
      <Navbar route={route} user={user} hLogout={hLogout} />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/" element={<Landing />} />
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
            <ProtectedRoute user={user}>
              {/* <Users user={user} />
                {/* <UsersOriginal /> */}
              {/* <Students user={user} /> */}
            </ProtectedRoute>
          }
        ></Route>
        {/* <Route path="users" element={<Users />}>
            <Route path="student" element={<Students />} />
            <Route path="teacher" element={<Teachers />} />
          </Route> */}
        <Route path="test" element={<TestPage />} />
        <Route path="auth" element={<AuthenticatorLR />} />
        <Route path="auth-fail" element={<Out />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

// ProtectedRoute --- https://www.robinwieruch.de/react-router-private-routes/
const ProtectedRoute = ({ user, redirectPath = "/auth-fail", children }) => {
  //console.log("<protected-user>: ", user);
  // const { state } = useLocation();
  // console.log("app-state", state);
  // if (!state) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  if (!user) {
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

// https://stackoverflow.com/questions/69868011/react-router-v6-routing
// https://stackoverflow.com/questions/69868956/how-to-redirect-in-react-router-v6
// route === "authenticated" ? <Users /> : <AuthenticatorLR />
//function Authify({ children, redirectTo }) {
//function Authify() {
//function Authify(route, user) {
//console.log("<route-authify>: ", route);
//console.log("<route-authify-user>: ", user);
/*   return routee === "authenticated" ? (
    <TestPage />
  ) : (
    <Navigate to={"/auth-sso-lr"} />
  ); */

/*   return route === "authenticated" ? (
    <Navigate to={"/users"} />
  ) : (
    <Navigate to={"/auth-sso-lr"} />
  );
 */
//return route === "authenticated" ? <TestPage /> : <AuthenticatorLR />;
//return route === "authenticated" ? children : <Navigate to={redirectTo} />;

//   if (route === "authenticated") {
//     console.log(1);
//     <Navigate to={"/test"} />;
//   } else {
//     console.log(0);
//     return <AuthenticatorLR />;
//   }
// }

{
  /* <Route path="/users/student" element={<Students />} />
        <Route path="/users/teacher" element={<Teachers />} /> */
}
