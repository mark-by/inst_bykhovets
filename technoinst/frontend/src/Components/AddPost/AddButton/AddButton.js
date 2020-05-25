import React from 'react'
import './AddButton.css'
import CreationPostForm from "../CreationPostForm/CreationPostForm";

function AddButton(props) {
    const button =
        <div className="main-add-button" onClick={() => setState({isOpen: true})}>
            <span></span>
            <span></span>
        </div>;

    const [state, setState] = React.useState({
        isOpen: false,
        content: button,
    });

    function closeHandler() {
        setState({isOpen : false})
    }

    if (state.isOpen) {
        state.content = <CreationPostForm getState={props.getState} closeHandler={closeHandler}/>
    } else {
        state.content = button;
    }

    return (
        <div>
            {state.content}
        </div>
    );
}

export default AddButton;