import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AmplifyProvider, Authenticator } from "@aws-amplify/ui-react";
//import { Amplify } from "aws-amplify";
import { Amplify, Auth, API } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css"; // default theme
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
API.configure(awsExports);

ReactDOM.render(
  <AmplifyProvider>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </AmplifyProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
