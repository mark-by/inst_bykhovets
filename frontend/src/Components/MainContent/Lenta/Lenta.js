import React from "react";
import Post from "./Post/Post"
import "./Lenta.css"
import {useFetch} from "../../useFetch";
import usePostSearch from "./usePostSearch";
import loader from "../../../imgs/puff.svg"

function Lenta(props) {
    let [page, setPage] = React.useState(1);
    const {loading, posts, hasMore} = usePostSearch(page);

    const observer = React.useRef();
    const lastPostElementRef = React.useCallback(node => {
        if (loading) {
            return
        }
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1)
            }
        })
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    return (
        <div className="lenta-wrapper">
            {posts.map((post, index) => {
                if (index + 1 === posts.length) {
                    return <Post ref={lastPostElementRef} data={post} handlerGetUser={props.handlerGetUser}
                                 key={index}/>;
                } else {
                    return <Post data={post} handlerGetUser={props.handlerGetUser} key={index}/>;
                }
            })}
            {loading && <img src={loader} style={{
                width: "40px",
                height: "40px",
                filter: "invert(28%) sepia(67%) saturate(5858%) hue-rotate(264deg) brightness(89%) contrast(100%)"
            }}/>}
        </div>
    )
}

export default Lenta;