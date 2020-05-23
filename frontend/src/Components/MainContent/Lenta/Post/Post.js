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
import AddCommentModal from "../../../Comment/AddComentModal";
import Modal from "../../../Modal/Modal";

const Post = React.forwardRef((props, ref) => {
    const [commentsState, setCommentState] = React.useState({isOpened: false});
    const [loading, setLoading] = React.useState(!props.data);
    const [data, setData] = React.useState(props.data ? props.data.post : {
        author: {
            avatar: null,
            username: "user"
        },
        comments: []
    });
    const [likes, setLikes] = React.useState(props.data ? props.data.post.total_likes : 0);
    const [is_liked, setIsLiked] = React.useState(props.data ? props.data.is_liked : false);
    let [comments, setComments] = React.useState(props.data ? props.data.post.comments : []);
    const [AddCommentModalIsOpen, toggleAddCommentModal] = React.useState(false);
    const [modalIsOpen, toggleModal] = React.useState(false);
    const [is_owner, setIsOwner] = React.useState(props.data ? props.data.is_owner : false);
    const [deleted, deletePost] = React.useState(false);

    async function fetchUrl(url) {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            setData(json.post);
            setComments(json.post.comments);
            setLikes(json.post.total_likes);
            setIsLiked(json.is_liked);
            setIsOwner(json.is_owner);
            setLoading(false);
        }
    }

    const post_id = props.data ? props.data.post.id : props.id;
    if (!props.data) {
        React.useEffect(() => {
            fetchUrl('api/post?id=' + props.id);
        }, []);
    }

    let selfComment;
    if (data.description) {
        selfComment = <div className="post__comment">
            <span className="post__comment_user-name"
                  onClick={() => props.handlerGetUser(data.author.id)}>{data.author.username}</span>&nbsp;
            <span>{data.description}</span>
        </div>
    }

    let show_button = (
        <p className="post__view-button" onClick={() => {
            setCommentState({isOpened: true})
        }}>
            View all {comments.length} comments
        </p>
    );
    let hide_button = <p className="post__view-button" onClick={() => {
        setCommentState({isOpened: false})
    }}>Hide comments</p>;

    let comment_button = null;
    let displayedComments = comments;
    if (displayedComments.length > 3) {
        if (commentsState.isOpened) {
            comment_button = hide_button;
        } else {
            comment_button = show_button;
            displayedComments = comments.slice(0, 3);
        }
    }

    let avatar = user_svg;
    if (data.author.avatar) {
        avatar = data.author.avatar;
    }

    let fire = fire_svg;
    if (is_liked) {
        fire = fire_fill_svg;
    }

    let modalButtons = [
        {title: "Report", function: () => console.log('report')},
    ];

    const ownerModalButtons = [
        {
            title: "Delete", function: () => cfetch('api/delete_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: post_id}),
            }).then(response => {
                if (response.ok) {
                    deletePost(true);
                    if (props.actionAfterDeletePost) {
                        props.actionAfterDeletePost();
                    }
                }
            })
        },
    ];

    if (is_owner) {
        modalButtons = ownerModalButtons;
    }

    let content =
        <div ref={ref}>
            {modalIsOpen && <Modal buttons={modalButtons} cancelAction={() => toggleModal(false)}/>}
            {AddCommentModalIsOpen && <AddCommentModal postId={post_id} toggle={toggleAddCommentModal}
                                                       setComments={setComments}/>}
            <div style={props.style} className="post">
                <div className="post__header">
                    <div className="post__header_wrapper">
                        <Button class="post__header_user-avatar" noFilterOnHover={true} img_src={avatar}
                                onClick={() => props.handlerGetUser(data.author.id)}/>
                        <Button
                            class="post__comment_user-name"
                            text={data.author.username}
                            onClick={() => props.handlerGetUser(data.author.id)}
                        />
                    </div>
                    <Button
                        class="post__header_more-button"
                        img_src={more_horizontal_svg}
                        onClick={() => toggleModal(true)}
                    />
                </div>
                <div className="post__img">
                    <img src={data.content}></img>
                </div>
                <div className="post__after-img-zone">
                    <div className="post__controls">
                        <div className="row">
                            <Button img_src={fire} onClick={() => {
                                cfetch('api/like', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({id: post_id})
                                }).then(response => {
                                    if (response.ok) {
                                        response.json().then(res => setLikes(res.likes));
                                    }
                                });
                                setIsLiked(!is_liked)
                            }}/>
                            <Button img_src={comment_svg} onClick={() => toggleAddCommentModal(true)}/>
                            <Button img_src={send_svg}/>
                        </div>
                        <Button img_src={bookmark_svg}/>
                    </div>
                    <div className="post__likes-counter">
                        {likes} likes
                    </div>
                    {selfComment}
                    {comment_button}
                    {displayedComments.map((comment, index) => {
                        return <p className="post__comment" key={index}><span
                            className="post__comment_user-name"
                            onClick={() => props.handlerGetUser(comment.author.id)}>{comment.author.username}</span> &nbsp;{comment.comment}
                        </p>
                    })}
                </div>
            </div>
        </div>

    if (deleted) {
        content = null
    }

    return content;
});

export default Post;
