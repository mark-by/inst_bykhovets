import React from "react";
import './Settings.css';
import Button from "../../Button/Button";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./Change Password/ChangePassword";

function Settings(props) {
    const [state, setState] = React.useState({
        settings: <EditProfile avatar={props.avatar} avatarHandler={props.avatarHandler}/>,
    });

    if (props.type === "changePassword") {
        state.settings = <ChangePassword avatar={props.avatar}/>
    }

    return(
        <div className="settings-wrapper">
            <div className="settings-controls">
                <Button class="settings-controls__button"
                        text="Edit Profile"
                        onClick={()=>setState({settings:<EditProfile avatar={props.avatar} avatarHandler={props.avatarHandler}/>})}/>
                <Button
                    class="settings-controls__button"
                    text="Change Password"
                    onClick={()=>setState({settings: <ChangePassword avatar={props.avatar}/>})}/>
            </div>
            {state.settings}
        </div>
    );
}

export default Settings;