import React from "react";
import LoginTab from "../../components/LoginTab";
import { ProtectRoute } from "../../auth/authContext";

import LoginComponent from "./components/LoginComponent"
import TitleFragment from "../TitleFragment"

class LoginPage extends React.Component {
  render() {
    return(
      <TitleFragment title="Login">
        <LoginComponent />
      </TitleFragment>
    );
  }
}

export default LoginPage;
