import React from "react";
import "./Post.css"

function Post(props) {
   return (
       <div className="browsed-post" style={{backgroundImage: "url("+props.img_src+")"}} href="#"></div>
   )
}

export default Post;