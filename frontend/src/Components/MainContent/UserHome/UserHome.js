import React from "react";
import Search from "../Search/Search";
import UserHeader from "./Header/UserHeader";
import {useFetch} from "../../useFetch";
import searchPosts from "../../../Utils/utils"

function UserHome(props) {
    return (
        <div className="home-wrapper">
            <UserHeader handlerLogOut={props.handlerLogOut} handlerSettings={props.handlerSettings}
                        data={props.data} isHome={props.isHome} id={props.id} is_following={props.is_following}/>
            <Search data={props.data} posts={props.posts} isHome={props.isHome} id={props.id}
                    handlerGetUser={props.handlerGetUser} actionAfterDeletePost={props.refresh}/>
        </div>
    );
}

export default UserHome;
