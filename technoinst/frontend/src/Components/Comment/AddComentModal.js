import React from 'react'
import img_svg from "../../imgs/img.svg";
import cfetch from "../CsrfToken/cfetch";
import Button from "../Button/Button";
import close_svg from "../../imgs/close.svg";
import setUploadedImage from "../Forms/setUploadedImage";
import './AddCommentModal.css'

function AddCommentModal(props) {

    function submitHandler(e) {
        e.preventDefault();
        let formData = new FormData(document.getElementById('comment-add-form'));
        cfetch('api/comment', {
            method: 'POST',
            body: formData,
        }).then(res => {
            if (res.ok) {
                props.toggle(false);
                res.json().then(comments => props.setComments(comments));
            } else {
                console.log(res.status)
            }
        })
    }


    return (
        <div className="comment-add-form-wrapper" onClick={(e) => {
            if (e.target === document.getElementsByClassName('comment-add-form-wrapper')[0]) {
                props.toggle(false);
            }
        }}>
            <form id="comment-add-form" encType="multipart/form-data" onSubmit={submitHandler}>
                <Button class="close-button" img_src={close_svg} onClick={() => props.toggle(false)}/>
                <input name="id" defaultValue={props.postId} hidden/>
                <textarea style={{height: "100px"}} name="comment" placeholder="Leave a comment..."/>
                <div className="comment-add-form-button-wrapper">
                    <input type="submit" value="Post"/>
                </div>
            </form>
        </div>
    )
}

export default AddCommentModal;