import React from "react";
import Search from "../Search/Search";
import UserHeader from "./Header/UserHeader";
import {useFetch} from "../../useFetch";

function UserHome(props) {
    return (
        <div className="home-wrapper">
            <UserHeader handlerLogOut={props.handlerLogOut} handlerSettings={props.handlerSettings}
                        data={props.data}/>
            <Search data={props.data} isHome={props.isHome} id={props.id}/>
        </div>
    );
}

export default UserHome;
