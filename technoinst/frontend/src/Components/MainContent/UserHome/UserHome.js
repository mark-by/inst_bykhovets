import React from "react";
import Search from "../Search/Search";
import UserHeader from "./Header/UserHeader";
import {useFetch} from "../../../Utils/useFetch";
import searchPosts from "../../../Utils/utils"

function UserHome(props) {
    let urlSearch;
    let additionalParams;
    if (props.isHome) {
        urlSearch = '/api/own_posts';
    } else {
        urlSearch = '/api/user_posts';
        additionalParams = {id: props.id};
    }
    return (
        <div className="home-wrapper">
            <UserHeader handlerLogOut={props.handlerLogOut} handlerSettings={props.handlerSettings} handlerGetUser={props.handlerGetUser}
                        data={props.data} isHome={props.isHome} id={props.id} is_following={props.is_following}/>
            <Search data={props.data} url={urlSearch} additionalParams={additionalParams}
                    handlerGetUser={props.handlerGetUser} actionAfterDeletePost={props.refresh}/>
        </div>
    );
}

export default UserHome;
