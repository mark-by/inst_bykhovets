import React from "react";
import Button from "../../../Button/Button";
import "./Post.css";
import user_svg from "../../../../imgs/user.svg";
import more_horizontal_svg from "../../../../imgs/more_horizontal.svg";
import fire_svg from "../../../../imgs/fire.svg";
import fire_fill_svg from "../../../../imgs/fire_fill.svg"
import comment_svg from "../../../../imgs/comment.svg";
import bookmark_svg from "../../../../imgs/bookmark.svg";
import send_svg from "../../../../imgs/send.svg";
import cfetch from "../../../CsrfToken/cfetch";

function Post(props) {
    const [commentsState, setCommentState] = React.useState({isOpened: false});
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({
        author: {
            avatar: null,
            username: "user"
        },
        comments: []
    });
    const [likes, setLikes] = React.useState( 0);
    const [is_liked, setIsLiked] = React.useState(false);
    async function fetchUrl(url) {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            setData(json.post);
            setLikes(json.post.total_likes);
            setIsLiked(json.is_liked);
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchUrl('api/post?id=' + props.id);
    }, []);

    let selfComment;
    if (data.description) {
        selfComment = <div className="post__comment">
            <span className="post__comment_user-name" onClick={() => props.handlerGetUser(data.author.id)}>{data.author.username}</span>&nbsp;<span>{data.description}</span>
        </div>
    }

    let show_button = (
        <p className="post__view-button" onClick={() => {
            setCommentState({isOpened: true})
        }}>
            View all {data.comments.length} comments
        </p>
    );
    let hide_button = <p className="post__view-button" onClick={() => {
        setCommentState({isOpened: false})
    }}>Hide comments</p>;

    let comment_button = null;
    let comments = [];
    if (data.comments.length > 3) {
        if (commentsState.isOpened) {
            comment_button = hide_button;
            comments = data.comments;
        } else {
            comment_button = show_button;
            comments = data.comments.slice(0, 3);
        }
    } else {
        comments = data.comments;
    }

    let avatar = user_svg;
    if (data.author.avatar) {
        avatar = data.author.avatar;
    }

    let fire = fire_svg;
    if (is_liked) {
        fire = fire_fill_svg;
    }
    return (
        <div style={props.style} className="post">
            <div className="post__header">
                <div className="post__header_wrapper">
                    <Button class="post__header_user-avatar" noFilterOnHover={true} img_src={avatar}/>
                    <Button
                        class="post__comment_user-name"
                        text={data.author.username}
                        onClick={() => props.handlerGetUser(data.author.id)}
                    />
                </div>
                <Button
                    class="post__header_more-button"
                    img_src={more_horizontal_svg}
                />
            </div>
            <div className="post__img">
                <img src={data.content}></img>
            </div>
            <div className="post__after-img-zone">
                <div className="post__controls">
                    <div className="row">
                        <Button img_src={fire} onClick={() => {cfetch('api/like', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: props.id
                            })
                        }).then(response => {
                            if (response.ok) {
                                response.json().then(res => setLikes(res.likes));
                            }
                        });
                        setIsLiked(!is_liked)}}/>
                        <Button img_src={comment_svg}/>
                        <Button img_src={send_svg}/>
                    </div>
                    <Button img_src={bookmark_svg}/>
                </div>
                <div className="post__likes-counter">
                    {likes} likes
                </div>
                {selfComment}
                {comment_button}
                {comments.map((comment, index) => {
                    return <p className="post__comment" key={index}><span
                        className="post__comment_user-name" onClick={() => props.handlerGetUser(comment.author.id)}>{comment.author.username}</span> &nbsp;{comment.comment}</p>
                })}
            </div>
        </div>
    );
}

export default Post;
