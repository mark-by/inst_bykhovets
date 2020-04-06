import React from "react";
import "./EditProfile.css"
import Button from "../../../Button/Button";
// import ReactImageUploadComponent from "react-images-upload";
import ImageUploader from 'react-images-upload'
import {useFetch} from "../../../useFetch";

function EditProfile() {
    const [data_, loading] = useFetch('api/settings');
    console.log(data_);
    const data = {
        userName: "mark-by",
        photoSrc: "http://picsum.photos/512"
    };
    return(
        <form className="settings-wrapper-content">
            <div className="settings-avatar" style={{backgroundImage: "url("+data.photoSrc+")"}}/>
            <div className="edit-profile-info-wrapper" >
                <div className="settings__username">{data.userName}</div>
                <ImageUploader buttonText='Change Profile Photo' onChange={console.log("HUCKER")}/>
                <Button text="Change Profile Photo" class="edit-profile__change-photo"/>
            </div>
            <label>Name</label>
            <input type="text"/>
            <label>UserName</label>
            <input type="text"/>
            <label>Bio</label>
            <textarea/>
            <label>Email</label>
            <input type="email"/>
            <label>Gender</label>
            <select>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
            </select>
            <div className="end-settings-wrapper">
                <Button class="disable-button" text="Disable my account" onClick={()=>console.log("disable account")} />
                <input type="submit" value="Submit"/>
            </div>
        </form>
    )
}

export default EditProfile;