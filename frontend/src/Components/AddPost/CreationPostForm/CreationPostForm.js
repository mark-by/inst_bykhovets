import React from 'react'
import setUploadedImage from "../../Forms/setUploadedImage";
import Button from "../../Button/Button";
import './CreationPostForm.css'
import img_svg from '../../../imgs/img.svg'
import close_svg from '../../../imgs/close.svg'
import cfetch from "../../CsrfToken/cfetch";

function CreationPostForm(props) {
    const [postImage, setPostImage] = React.useState({
        src: img_svg,
        isUploaded: false,
    });

    function handlerImage(src) {
        setPostImage({src: src, isUploaded: true});
    }

    function submitHandler(e){
       e.preventDefault();
       let formData = new FormData(document.getElementById('post-add-form'));
       cfetch('api/post', {
           method: 'POST',
           body: formData,
       }).then(res => {
           if (res.ok) {
               props.closeHandler();
               let post_counter = document.getElementById('post-counter');
               if (post_counter) {
                   post_counter.innerText = (parseInt(post_counter.innerText) + 1).toString()
               }
               if (props.getState().type === "userhome") {
                   props.searchPostHandler();
               }
           } else {
               console.log(res.status)
           }
       })

    }


    return (
        <div className="creation-post-form-wrapper" onClick={(e) => {
            if (e.target === document.getElementsByClassName('creation-post-form-wrapper')[0]) {
                props.closeHandler()
            }
        }}>
            <form id="post-add-form" encType="multipart/form-data" onSubmit={submitHandler}>
                <Button class="close-button" img_src={close_svg} onClick={props.closeHandler}/>
                <div className="post-add-description-wrapper">
                    <img className="post-image" src={postImage.src}/>
                    <textarea name="description" placeholder="Write a caption..."/>
                </div>
                <input name="image" type="file" id="post-image-input" style={{display: "none"}}
                       onChange={(event) => setUploadedImage(event, handlerImage)}/>
                <div className="buttons-wrapper">
                    <Button class="upload-image-button" text="Upload Image"
                            onClick={() => document.getElementById('post-image-input').click()}/>
                    <input type="submit" className={!postImage.isUploaded ? "deactivate" : ""} value="Post"
                           disabled={!postImage.isUploaded}/>
                </div>
            </form>
        </div>
    )
}

export default CreationPostForm;