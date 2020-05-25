import React from "react";
import "./Events.css";
import Event from "./Event/Event"

function Events(props) {

    return (
        <div className="events-wrapper" onClick={() => props.closeEvents()}>
            <div className="events">
                <Event userPhotoSrc="https://picsum.photos/512"
                       userNickName="lera_bhc"
                       type="commented your photo:"
                       data="some comment impusm lorem and etc ..."
                       time="5h"
                       aboutPhotoSrc="https://picsum.photos/512"/>
                <Event userPhotoSrc="https://picsum.photos/512"
                       userNickName="lera_bhc"
                       type="liked your photo"
                       time="5h"
                       aboutPhotoSrc="https://picsum.photos/512"/>
            </div>
        </div>
    )
}

export default Events;