import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Profile = (props) => {
  const usr = useAuthenticator((context) => [context.user]).user;
  const [user, setUser] = useState(usr);
  const [users, setUsers] = useState([]);

  // custom attribues
  const category = user.signInUserSession.idToken.payload["custom:category"];
  const schoolid = user.signInUserSession.idToken.payload["custom:schoolid"];
  const [email, setEmail] = useState(user.attributes.email);
  const [gender, setGender] = useState(user.attributes.gender);
  const [name, setName] = useState(user.attributes.given_name);
  const [surname, setSurname] = useState(user.attributes.family_name);
  const [schoolID, setSchoolID] = useState(schoolid);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e, keyName) => {
    let newValue = e.target.value;
    if (keyName === "email") setEmail(newValue);
    if (keyName === "gender") setGender(newValue);
    if (keyName === "name") setName(newValue);
    if (keyName === "surname") setSurname(newValue);
    if (keyName === "schoolid") setSchoolID(newValue);
    if (keyName === "oldPassword") setOldPassword(newValue);
    if (keyName === "newPassword") setNewPassword(newValue);
    if (keyName === "confirmPassword") setConfirmPassword(newValue);
  };

  /** SINGLE ATTRIBUTES */
  const updateEmail = async () => {
    try {
      let data = await Auth.updateUserAttributes(user, { email: email });
      console.log(data); // SUCCESS
      cognitoRefresh();
      //history.push("/confirm-register");
    } catch (err) {
      console.log("error", err);
    }
  };

  const updateGender = async () => {
    try {
      let data = await Auth.updateUserAttributes(user, { gender: gender });
      console.log(data);
      cognitoRefresh();
    } catch (err) {
      console.log("error", err);
    }
  };

  /** MULTIPLE ATTRIBUTES */
  const updateUserAttr = async () => {
    try {
      // Auth.currentAuthenticatedUser({ bypassCache: true });
      let data = await Auth.updateUserAttributes(user, {
        given_name: name,
        family_name: surname,
        "custom:schoolid": schoolID,
      });
      console.log(data); // SUCCESS
      cognitoRefresh();
    } catch (err) {
      console.log("error", err);
    }
  };

  /** GET UPDATED ATTRIBUTES FROM COGNITO (COMPONENT DOM) */
  const cognitoRefresh = () => {
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => setUser(user)) // console.log(user))
      .catch((err) => console.log(err));
  };

  /** PASSWORD */
  const updateUserPassword = async (e) => {
    e.preventDefault();
    console.log("oldPassword:", oldPassword);
    console.log("newPass:", newPassword, "confirmPass:", confirmPassword);

    if (newPassword === confirmPassword && newPassword !== "") {
      console.log("passwords matched!");

      try {
        let data = await Auth.changePassword(user, oldPassword, newPassword);
        console.log(data); // SUCCESS
      } catch (err) {
        console.log("error", err);
      }
    } else {
      console.log("passwords didn't match!");
    }
  };

  /*************************************************************************************************
   *  AMPLIFY ADMIN QUERIES
   *  https://docs.amplify.aws/cli/auth/admin/#enable-admin-queries
   *************************************************************************************************
   */

  async function addToGroup() {
    let apiName = "AdminQueries";
    let path = "/addUserToGroup";
    let myInit = {
      body: {
        username: "alphan.mongi@gmail.com",
        groupname: "TEACHERS",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };

    // return await API.post(apiName, path, myInit);
    try {
      const response = await API.post(apiName, path, myInit);
      console.log(response);
    } catch (err) {
      console.log(err.response); //console.log(err.response.data.message);
    }
  }

  let nextToken;

  async function listUsersInGroup(limit) {
    let apiName = "AdminQueries";
    let path = "/listUsersInGroup";
    let myInit = {
      queryStringParameters: {
        groupname: "TEACHERS",
        limit: limit,
        token: nextToken,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };

    try {
      const { NextToken, ...rest } = await API.get(apiName, path, myInit);
      nextToken = NextToken;

      setUsers(rest.Users);
      console.log(rest); //console.log(await API.get(apiName, path, myInit));

      return rest;
    } catch (err) {
      console.log(err.response); //console.log(err.response.data.message);
    }
  }

  async function getUser() {
    let apiName = "AdminQueries";
    let path = "/getUser";
    let myInit = {
      queryStringParameters: {
        username: "alymongi@gmail.com",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };

    try {
      const response = await API.get(apiName, path, myInit);
      console.log(response);
    } catch (err) {
      console.log(err.response); //console.log(err.response.data.message);
    }
  }

  async function getUserb() {
    let apiName = "AdminQueries";
    let path = "/getUserb";
    let myInit = {
      queryStringParameters: {
        //given_name: "Kahendar",
        //given_name: "254705877708", //"Ali",
        //email: "alphan.mongi@gmail.com",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };

    try {
      const response = await API.get(apiName, path, myInit);
      console.log(response);
    } catch (err) {
      //console.log(err.response);
      console.log(err.response.data.message);
    }
  }

  async function getUserc() {
    let apiName = "AdminQueries";
    let path = "/getUserc";
    let myInit = {
      queryStringParameters: {
        //phone_number: "+254705877708",
        phone_number: "2fea6dca-68d3-44c5-8752-29d8dc39b678",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };

    try {
      const response = await API.get(apiName, path, myInit);
      console.log(response);
    } catch (err) {
      //console.log(err.response);
      console.log(err.response.data.message);
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "lightcoral" }}>
        <h1>Hello, {user.username}</h1>
        <b>AWS ID: </b>
        {user.attributes.sub}
        <br />
        <b>Name: </b>
        {user.attributes.given_name}
        <br />
        <b>Surname: </b>
        {user.attributes.family_name}
        <br />
        <b>Email: </b>
        {user.attributes.email}
        <br />
        <b>Gender: </b>
        {user.attributes.gender}
        <br />
        <b>Category: </b>
        {category}
        <br />
        <b>School ID: </b>
        {schoolid}
        <br></br>
        <br></br>
      </div>
      <div style={{ backgroundColor: "lightcyan" }}>
        CHANGE SINGLE ATTRIBUTE <hr />
        <table>
          <tbody>
            <tr>
              <td>
                <b>Email: </b>
              </td>
              <td>
                <input
                  value={email}
                  onChange={(e) => handleInputChange(e, "email")}
                />
              </td>
              <td>
                <button onClick={updateEmail}>SAVE</button>
              </td>
            </tr>
            <tr>
              <td>
                <b>Gender: </b>
              </td>
              <td>
                <input
                  value={gender}
                  onChange={(e) => handleInputChange(e, "gender")}
                />
              </td>
              <td>
                <button onClick={updateGender}>SAVE</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
      </div>
      <div style={{ backgroundColor: "lightblue" }}>
        CHANGE MULTIPLE ATTRIBUTES <hr />
        <table>
          <tbody>
            <tr>
              <td>
                <b>Name [given_name]: </b>
                <input
                  value={name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </td>
              <td>
                <b>Surname [family_name]: </b>
                <input
                  value={surname}
                  onChange={(e) => handleInputChange(e, "surname")}
                />
              </td>
              <td>
                <b>Sch.ID: </b>
                <input
                  value={schoolID}
                  onChange={(e) => handleInputChange(e, "schoolid")}
                />
              </td>
              <td>
                <button onClick={updateUserAttr}>SAVE CHANGES</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
      </div>
      <div style={{ backgroundColor: "lightgoldenrodyellow" }}>
        CHANGE PASSWORD <hr />
        <table>
          <tbody>
            <tr>
              <td>
                <b>Current Password: </b>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  value={oldPassword}
                  onChange={(e) => handleInputChange(e, "oldPassword")}
                  //type="password"
                  placeholder="enter your current password"
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>New Password: </b>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  value={newPassword}
                  onChange={(e) => handleInputChange(e, "newPassword")}
                  //type="password"
                  placeholder="enter a new password"
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Confirm New Password: </b>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  value={confirmPassword}
                  onChange={(e) => handleInputChange(e, "confirmPassword")}
                  //type="password"
                  placeholder="enter the new password again"
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={(e) => updateUserPassword(e)}>
                  UPDATE PASSWORD
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
      </div>
      <div style={{ backgroundColor: "gold" }}>
        AMPLIFY ADMIN QUERIES API <hr />
        <button onClick={addToGroup}>Add to Group</button>
        <button onClick={() => listUsersInGroup(10)}>List Users</button>
        <br></br>
        {/* {Array.isArray(users) && users.length ? ( */}
        {users.length !== 0 ? (
          <table>
            <tbody>
              {users.map((u, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{u.Username}</td>
                    {<td>{JSON.stringify(u.Attributes[6].Value)}</td>}
                    {/* {<td>{JSON.stringify(u.Attributes["Name:email"])}</td>} */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <>load...</>
        )}
        <hr></hr>
        <h3>FIND A USER</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <b>Search Name: </b>
                <input
                  value={name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </td>
              <td>
                <button onClick={getUser}>SEARCH USER</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
    </>
  );
};

export default Profile;
