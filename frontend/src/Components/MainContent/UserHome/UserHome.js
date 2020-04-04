import React from "react";
import Search from "../Search/Search";
import UserHeader from "./Header/UserHeader";

function UserHome(props) {

    let userData = {
        userNickName : "mark-by",
        userName : "Быховец Марк",
        userAvatarSrc : "https://picsum.photos/512",
        userDescription : "Some description lorem ipsum and etc",
        postCounter : 32,
        followersCounter : 256,
        followingCounter : 128,
    };
    return (
        <div className="home-wrapper">
            <UserHeader handlerLogOut={props.handlerLogOut} handlerSettings={props.handlerSettings} data={ userData }/>
            <Search data="home data"/>
        </div>
    );
}

export default UserHome;
