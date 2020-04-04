import React from "react";
import Button from "../../Button/Button";

function SignIn(props) {
    function submitHandler(event) {
        event.preventDefault();
        props.handlerAuthorize();
    }

    console.log(props.data);
    return (
        <div className="login-wrapper">
            <div className="header__logo" onClick={() => console.log("Hello, dude!")}>Techno<span>Inst</span></div>
            <div className="greetings">Hello! Who are you?</div>
            <form className="login-form" onSubmit={submitHandler}>
                <input type="text" placeholder="Email or user name"/>
                <input type="password" placeholder="Your password"/>
                <input type="submit" value="Log in"/>
            </form>
            <Button class="forgot-button" text="Forgot Password?" onClick={() => console.log("forgot password")}/>
            <div className="not-familiar-wrapper">
                <div className="not-familiar">Are we not familiar?</div>
                <Button class="register-button" text="Sign up" onClick={props.handlerSignUp}/>
            </div>
        </div>
    );
}

export default SignIn;