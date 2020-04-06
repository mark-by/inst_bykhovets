import React from "react";
import Search from "../Search/Search";
import UserHeader from "./Header/UserHeader";
import {useFetch} from "../../useFetch";

function UserHome(props) {
    const [data, loading] = useFetch('api/user');
    return (
        <div className="home-wrapper">
            <UserHeader handlerLogOut={props.handlerLogOut} handlerSettings={props.handlerSettings}
                        data={props.data}/>
            <Search data="home data"/>
        </div>
    );
}

export default UserHome;
