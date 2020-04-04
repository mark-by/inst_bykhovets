import React from "react";
import Button from "../../Button/Button";

function SignUp(props) {
    function submitHandler(event) {
       event.preventDefault();
       props.handlerAuthorize();
    }

    return (
        <div className="login-wrapper">
            <div className="header__logo" onClick={() => console.log("Hello, dude!")}>Techno<span>Inst</span></div>
            <div className="greetings">Nice to meet you!</div>
            <form className="login-form" onSubmit={submitHandler}>
                <input type="email" placeholder="Email"/>
                <input type="text" placeholder="Full Name"/>
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Your password"/>
                <input type="submit" value="Sign up"/>
            </form>
            <div className="not-familiar-wrapper">
                <div className="not-familiar">Are we already familiar?</div>
                <Button class="register-button" text="Sign in" onClick={props.handlerSignIn}/>
            </div>
        </div>
    )
}

export default SignUp;