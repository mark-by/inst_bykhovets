import React from "react";
import './Settings.css';
import Button from "../../Button/Button";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./Change Password/ChangePassword";

function Settings(props) {
    const [state, setState] = React.useState({
        settings: <EditProfile/>,
    });

    if (props.type === "changePassword") {
        state.settings = <ChangePassword/>
    }

    return(
        <div className="settings-wrapper">
            <div className="settings-controls">
                <Button class="settings-controls__button"
                        text="Edit Profile"
                        onClick={()=>setState({settings:<EditProfile/>})}/>
                <Button
                    class="settings-controls__button"
                    text="Change Password"
                    onClick={()=>setState({settings: <ChangePassword/>})}/>
            </div>
            {state.settings}
        </div>
    );
}

export default Settings;