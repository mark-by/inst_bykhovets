import React from "react";
import "./ChangePassword.css"
import Button from "../../../Button/Button";

function ChangePassword() {
    const data = {
        userName: "mark-by",
        photoSrc: "http://picsum.photos/512"
    };

    return (
        <form className="settings-wrapper-content">
            <div className="settings-avatar" style={{backgroundImage: "url(" + data.photoSrc + ")"}}/>
            <div className="settings__username">{data.userName}</div>
            <label>Old Password</label>
            <input type="password"/>
            <label>New Password</label>
            <input type="password"/>
            <label>Confirm New Password</label>
            <input type="password"/>
            <div className="end-settings-wrapper">
                <Button class="disable-button" text="Forgot Password?"
                        onClick={() => console.log("forgot password")}/>
                <input type="submit" value="Submit"/>
            </div>
        </form>
    )
}

export default ChangePassword;