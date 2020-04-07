import React from "react";
import Post from "./Post/Post"
import "./Lenta.css"

function Lenta () {

    return (
        <div className="lenta-wrapper">
            <Post  imgSrc="https://picsum.photos/512"/>
            <Post imgSrc="https://picsum.photos/512"/>
            <Post imgSrc="https://picsum.photos/512"/>
            <Post imgSrc="https://picsum.photos/512"/>
            <Post imgSrc="https://picsum.photos/512"/>
            <Post imgSrc="https://picsum.photos/512"/>
            <Post imgSrc="https://picsum.photos/512"/>
        </div>
    )
}

export default Lenta;