import React from "react";
import ShortPost from "./ShortPost/ShortPost";
import "./Search.css"
import {useFetch} from "../../useFetch";

function Search(props) {
    let posts = props.posts;

    let content;
    if (posts) {
        content = posts.map((post, idx) => {
            return (
                <ShortPost img_src={post.content} id={post.id} key={idx} handlerGetUser={props.handlerGetUser}
                actionAfterDeletePost={props.actionAfterDeletePost}/>
            )
        })
    }

    return (
        <div className="search-wrapper" id="search-wrapper">
            {content}
        </div>
    );
}

export default Search;