import React from "react";
import Post from "./Post/Post"
import "./Lenta.css"
import {useFetch} from "../../../Utils/useFetch";
import useFetchWithPaginate from "../../../Utils/useFetchWithPaginate";
import loader from "../../../imgs/puff.svg"
import useRefLastItem from "../../../Utils/useRefLastItem";

function Lenta(props) {
    let [page, setPage] = React.useState(1);
    const {loading, data, hasMore} = useFetchWithPaginate('/api/index', page, 5);
    const lastPostElementRef = useRefLastItem(loading, hasMore, setPage);

    return (
        <div className="lenta-wrapper">
            {data.map((post, index) => {
                if (index + 1 === data.length) {
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