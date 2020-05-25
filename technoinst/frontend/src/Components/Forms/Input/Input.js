import React from 'react';

function Input(props) {
    let stylesError;
    let stylesInput;
    if (!props.error) {
        stylesError = {display: "none"}
    } else {
        stylesError = {
            color: "red",
            fontSize: "14px",
            marginBottom: "1px",
            marginTop: "0",
            marginLeft: "10px",
        }
        stylesInput = {marginTop: "0", borderColor: "red"}
    }

    return (
        <div className={props.className}>
            <p style={stylesError}>{props.error}</p>
            <input style={stylesInput} id={props.id} name={props.name} type={props.type}
                   defaultValue={props.defaultValue} placeholder={props.placeholder}/>
        </div>
    );
}

export default Input;