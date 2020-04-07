import React from "react";
import "./Post.css"
import Post from "../../Lenta/Post/Post";

function ShortPost(props) {
    const init_content = <div onClick={() => setState({isOpen: true})} className="browsed-post"
                              style={{backgroundImage: "url(" + props.img_src + ")"}}/>;
    const [state, setState] = React.useState({
        id: props.id,
        isOpen: false,
        content: init_content,
    });

    let wrapper_styles = {
        position: "fixed",
        left: "0",
        top: "0",
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: "1600",
        overflowY: "scroll",
    };

    const post_styles = {
        boxShadow: "unset",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate( -50%, -50%)"
    };

    function close(event) {
        if (event.target.id === "opened-post-wrapper"){
            setState({isOpen: false})
        }
    }

    const openedpost =
        <div>
            {init_content}
            <div style={wrapper_styles} id="opened-post-wrapper" onClick={(event) => close(event)}>
                <Post style={post_styles} id={props.id} imgSrc={props.img_src}/>
            </div>
        </div>


    if (state.isOpen) {
        state.content = openedpost
    } else {
        state.content = init_content
    }
    return (
        <div>
            {state.content}
        </div>
    )
}

export default ShortPost;