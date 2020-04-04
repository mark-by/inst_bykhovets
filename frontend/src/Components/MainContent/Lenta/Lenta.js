import React from "react";
import Post from "./Post/Post"
import "./Lenta.css"

function Lenta () {

    return (
        <div className="lenta-wrapper">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default Lenta;