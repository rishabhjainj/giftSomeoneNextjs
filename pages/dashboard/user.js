import React from "react";
import {ProtectRoute} from "../../auth/authContext";
import BaseTemplate from "./components/BaseTemplate"

class User extends React.Component {
    render() {
        return (
            <BaseTemplate
                content={
                    <div> This is your User!</div>
                }
            />

        );
    }
}

export default User;
