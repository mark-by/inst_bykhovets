import React from "react";
import Search from "../Search/Search";
import UserHeader from "./Header/UserHeader";

function UserHome(props) {
    return (
        <div className="home-wrapper">
            <UserHeader handlerLogOut={props.handlerLogOut} handlerSettings={props.handlerSettings}
                        data={props.data}/>
            <Search data="home data"/>
        </div>
    );
}

export default UserHome;
