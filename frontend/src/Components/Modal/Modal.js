import React from "react";
import './Modal.css'
import Button from "../Button/Button";

function Modal(props) {
    function closeByWrapper(event) {
        if (event.target.className === "modal-wrapper") {
            props.cancelAction();
        }
    }

    return (
     <div className="modal-wrapper" onClick={(e)=>closeByWrapper(e)}>
         <div className="modal">
             {props.buttons.map((button, idx) => {
                 return (
                     <Button class="modal-button" text={button.title} onClick={()=>button.function()} key={idx}/>
                 );
             })}
             <Button class="modal-cancel-button" text="Cancel" onClick={()=>props.cancelAction()}/>
         </div>
     </div>
    );
}

export default Modal;