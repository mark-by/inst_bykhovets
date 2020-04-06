import React from "react";
import "./EditProfile.css"
import Button from "../../../Button/Button";
import user_svg from '../../../../imgs/user.svg'
import {useFetch} from "../../../useFetch";
import cfetch from "../../../CsrfToken/cfetch";
import Select from "../../../Forms/Select/Select";

function EditProfile() {
    const [data, loading] = useFetch('api/settings');

    function submitHandler(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById('settings-form'));
        cfetch('api/settings', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                console.log('ok');
            } else {
                console.log(response.status)
            }
        })
    }

    let options = [
        {value: "m", title: "Male"},
        {value: "f", title: "Female"},
        {value: "o", title: "Other"},
        {value: "p", title: "Prefer not to say"},
    ]

    let avatarSrc;
    if (!data.avatar) {
        avatarSrc = user_svg
    } else {
        avatarSrc = data.avatar
    }
    return (
        <form className="settings-wrapper-content" id="settings-form" onSubmit={submitHandler}>
            <img className="settings-avatar" src={avatarSrc}/>
            <div className="edit-profile-info-wrapper">
                <div className="settings__username">{data.username}</div>
                <Button text="Change Profile Photo" class="edit-profile__change-photo"/>
            </div>
            <label>Name</label>
            <input name="name" type="text" defaultValue={data.name}/>
            <label>Username</label>
            <input name="username" type="text" defaultValue={data.username}/>
            <label>Bio</label>
            <textarea name="description" defaultValue={data.description}/>
            <label>Email</label>
            <input name="email" type="email" defaultValue={data.email}/>
            <label>Gender</label>
            <Select name="gender" id="gender" options={options} selected={data.gender}/>
            <div className="end-settings-wrapper">
                <Button class="disable-button" text="Disable my account"
                        onClick={() => {
                            document.getElementById('disable-account').value = "1"
                        }}/>
                <input name="disable" id="disable-account" type="hidden" defaultValue="0"/>
                <input type="submit" value="Submit"/>
            </div>
        </form>
    )
}

export default EditProfile;