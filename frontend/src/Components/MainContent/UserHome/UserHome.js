import React from "react";
import Search from "../Search/Search";
import UserHeader from "./Header/UserHeader";
import {useFetch} from "../../useFetch";

function UserHome(props) {
    const [state, setState] = React.useState({
        type : props.isHome,
    });
    return (
        <div className="home-wrapper">
            <UserHeader avatar={props.avatar} handlerLogOut={props.handlerLogOut} handlerSettings={props.handlerSettings}
                        data={props.data}/>
            <Search data={props.data} isHome={true}/>
        </div>
    );
}

export default UserHome;
