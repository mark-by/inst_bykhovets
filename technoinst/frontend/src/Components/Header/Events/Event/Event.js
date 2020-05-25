import React from "react";
import "./Event.css"

function Event(props) {

    return (
        <div className="event row">
            <div className="event__user-photo col" style={{backgroundImage: "url(" + props.userPhotoSrc + ")"}}/>
            <div className="event__data col">
                <div className="event__data-wrapper">
                    <span className="event__user-nickname">{props.userNickName}</span>
                    <span className="event__type">{props.type} {props.data}</span>
                    <span className="event__time">{props.time}</span>
                </div>
            </div>
            <div className="event__about-photo col" style={{backgroundImage: "url(" + props.aboutPhotoSrc + ")"}}/>
        </div>
    );
}

export default Event;