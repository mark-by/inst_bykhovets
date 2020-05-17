import React from "react";
import Post from "./Post/Post"
import "./Lenta.css"

function Lenta (props) {
    return (
        <div className="lenta-wrapper">
            <Post id={1134951} handlerGetUser={props.handlerGetUser}/>
            <Post id={2} handlerGetUser={props.handlerGetUser}/>
            <Post id={3} handlerGetUser={props.handlerGetUser}/>
            <Post id={4} handlerGetUser={props.handlerGetUser}/>
            <Post id={5} handlerGetUser={props.handlerGetUser}/>
        </div>
    )
}

export default Lenta;