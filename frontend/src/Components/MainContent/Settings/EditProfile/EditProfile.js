import React from "react";
import "./EditProfile.css"
import Button from "../../../Button/Button";
import user_svg from '../../../../imgs/user.svg'
import {useFetch} from "../../../useFetch";
import cfetch from "../../../CsrfToken/cfetch";
import Select from "../../../Forms/Select/Select";
import setUploadedImage from "../../../Forms/setUploadedImage";

function EditProfile(props) {
    const [data, loading] = useFetch('api/settings');
    const [avatar, setAvatar] = React.useState({
        src: props.avatar.src,
        changed: false,
    });


    function submitHandler(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById('settings-form'));
        cfetch('api/settings', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                console.log('ok');
                props.avatarHandler(avatar.src, false);
            } else {
                console.log(response.status)
            }
        })
    }

    // if (avatar && !avatar.changed) {
    //     avatar.src = data.avatar;
    // }

    function avatarHandler(src) {
        setAvatar({src: src, changed: true});
    }

    let options = [
        {value: "m", title: "Male"},
        {value: "f", title: "Female"},
        {value: "o", title: "Other"},
        {value: "p", title: "Prefer not to say"},
    ];


    return (
        <form className="settings-wrapper-content" id="settings-form" onSubmit={submitHandler}
              encType="multipart/form-data">
            <img className="settings-avatar" src={avatar.src}/>
            <div className="edit-profile-info-wrapper">
                <div className="settings__username">{data.username}</div>
                <input type="file" name="avatar" style={{display: "none"}} id="input-avatar"
                       onChange={(e) => setUploadedImage(e, avatarHandler)}/>
                <Button text="Change Profile Photo" class="edit-profile__change-photo"
                        onClick={() => document.getElementById("input-avatar").click()}/>
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