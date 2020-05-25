import React from "react";
import ShortPost from "./ShortPost/ShortPost";
import "./Search.css"
import {useFetch} from "../../../Utils/useFetch";
import useFetchWithPaginate from "../../../Utils/useFetchWithPaginate";
import useRefLastItem from "../../../Utils/useRefLastItem";
import loader from "../../../imgs/puff.svg";

function Search(props) {
    let [page, setPage] = React.useState(1);
    const {loading, data, hasMore, refresh} = useFetchWithPaginate(props.url, page, 20, props.additionalParams);
    const lastPostElementRef = useRefLastItem(loading, hasMore, setPage);
    // let posts = props.posts;

    return (
        <div className="search-wrapper" id="search-wrapper">
            {data.map((post, idx) => {
                if (idx + 1 === data.length) {
                    return <ShortPost ref={lastPostElementRef} img_src={post.content} id={post.id} key={idx}
                                      handlerGetUser={props.handlerGetUser}
                                      actionAfterDeletePost={() => refresh(setPage)}/>
                } else {
                    return <ShortPost img_src={post.content} id={post.id} key={idx}
                                      handlerGetUser={props.handlerGetUser}
                                      actionAfterDeletePost={() => refresh(setPage)}/>
                }
            })}
            <div id="refresh-button" onClick={() => refresh(setPage)} style={{display: "none"}}/>
        </div>
    );
}

export default Search;