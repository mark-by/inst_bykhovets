import React from "react";
import Button from "../../../Button/Button";
import "./Post.css";
import user_svg from "../../../../imgs/user.svg";
import more_horizontal_svg from "../../../../imgs/more_horizontal.svg";
import fire_svg from "../../../../imgs/fire.svg";
import comment_svg from "../../../../imgs/comment.svg";
import bookmark_svg from "../../../../imgs/bookmark.svg";
import send_svg from "../../../../imgs/send.svg";

class Post extends React.Component {
    constructor(props) {
        super(props);
        // if (this.props.id) {
        //     fetch('api/post?id='+props.id).then(res => {
        //         if (res.ok) {
        //             return res.json()
        //         }
        //     }).then( res => {
        //         this.state = res;
        //     })
        // } else {

            this.state = {
                content: props.imgSrc,
                username: "user_name",
                description: "Lorem ipsum pricsndf eioask dfjejo dklf djiwoeovmoc dihevo",
                comments: [
                    ["SomeUser", "Some coment iansodiunqweiupfqw"],
                    ["maskara", "Some coment apsoidcp inp"],
                    ["yeskonfess", "Some coment paosidpoinpqoi we"],
                    ["polinkadot", "Some coment aposdipiosdncpi nq"],
                    ["panarenko", "Some coment asidfqiuewn iuqwe re"],
                    ["denis_official", "Some coment asdifpipq weoifhi"],
                    ["hrsmnt", "Some coment spdfoijpif aposdjpwe eqwie1"],
                    ["ikea_rus", "Some coment weq we qwe fr ter wegr"]
                ],
                commentsOpened: false,
                likesCount: 777,
                time: "14.03.20 21:22:15"
            };
        }
    // }

    render() {
        let show_button = (
            <p className="post__view-button" onClick={() => {
                this.setState({commentsOpened: true})
            }}>
                View all {this.state.comments.length.toString()} comments
            </p>
        );
        let hide_button = <p className="post__view-button" onClick={() => {
            this.setState({commentsOpened: false})
        }}>Hide comments</p>;

        let comment_button = null;
        let comments = [];
        if (this.state.comments.length > 3) {
            if (this.state.commentsOpened) {
                comment_button = hide_button;
                comments = this.state.comments;
            } else {
                comment_button = show_button;
                comments = this.state.comments.slice(0, 3);
            }
        } else {
            comments = this.state.comments;
        }

        return (
            <div style={this.props.style} className="post">
                <div className="post__header">
                    <div className="post__header_wrapper">
                        <Button class="post__header_user-avatar" img_src={user_svg}/>
                        <Button
                            class="post__comment_user-name"
                            text={this.state.username}
                        />
                    </div>
                    <Button
                        class="post__header_more-button"
                        img_src={more_horizontal_svg}
                    />
                </div>
                <div className="post__img">
                    <img src={this.state.content}></img>
                </div>
                <div className="post__after-img-zone">
                    <div className="post__controls">
                        <div className="row">
                            <Button img_src={fire_svg}/>
                            <Button img_src={comment_svg}/>
                            <Button img_src={send_svg}/>
                        </div>
                        <Button img_src={bookmark_svg}/>
                    </div>
                    <div className="post__likes-counter">
                        {this.state.likesCount} likes
                    </div>
                    <div className="post__comment">
            <span className="post__comment_user-name">
              {this.state.username}
            </span>
                        &nbsp;
                        <span>{this.state.description}</span>
                    </div>
                    {comment_button}
                    {comments.map((item, index) => {
                        return <p className="post__comment" key={index}><span
                            className="post__comment_user-name">{item[0]}</span> &nbsp;{item[1]}</p>
                    })}
                </div>
            </div>
        );
    }
}

export default Post;
