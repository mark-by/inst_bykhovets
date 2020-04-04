import React from "react";
import "./Login.css"
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

function LogIn(props) {
    const [state, setState] = React.useState({
        content: <SignIn data={props.data} handlerAuthorize={props.handlerAuthorize} handlerSignUp={handlerSignUp}/>
    });

    function handlerSignUp() {
        setState({
            content: <SignUp handlerAuthorize={props.handlerAuthorize} handlerSignIn={handlerSignIn}/>
        })
    }

    function handlerSignIn() {
        setState({
            content: <SignIn data={props.data} handlerAuthorize={props.handlerAuthorize} handlerSignUp={handlerSignUp}/>
        })
    }

    return (
        state.content
    );
}

export default LogIn;