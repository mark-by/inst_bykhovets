import React from "react";
import "./ChangePassword.css"
import Button from "../../../Button/Button";
import user_svg from "../../../../imgs/user.svg";
import {useFetch} from "../../../useFetch";
import cfetch from "../../../CsrfToken/cfetch";

function ChangePassword() {
    const [data, loading] = useFetch('api/change_password');

    function submitHandler(event) {
        event.preventDefault();
        let formData = new FormData(document.getElementById('password-form'));
        cfetch('api/change_password', {
            method: 'POST',
            body: formData,
        }).then(res=> {
            if (res.ok) {
                console.log('ok')
            } else {
                console.log(res.status);
            }
        })
    }

    let avatarSrc;
    if (!data.avatar) {
        avatarSrc = user_svg
    } else {
        avatarSrc = data.avatar
    }

    function checkPasswords() {
        if (document.getElementById('new_password').value !== document.getElementById('retyped_password')) {
            console.log("Your passwords fuckin");
        }
    }
    return (
        <form className="settings-wrapper-content" id="password-form" onSubmit={submitHandler}>
            <img className="settings-avatar" src={avatarSrc}/>
            <div className="settings__username">{data.username}</div>
            <label >Old Password</label>
            <input type="password" name="password"/>
            <label>New Password</label>
            <input id="new_password" type="password" name="new_password"/>
            <label>Confirm New Password</label>
            <input id="retyped_password" type="password" name="retyped_password" onChange={checkPasswords}/>
            <div className="end-settings-wrapper">
                <Button class="disable-button" text="Forgot Password?"
                        onClick={() => console.log("forgot password")}/>
                <input type="submit" value="Submit"/>
            </div>
        </form>
    )
}

export default ChangePassword;