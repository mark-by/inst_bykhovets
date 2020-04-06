import React from "react";
import Button from "../../Button/Button";
import cfetch from "../../CsrfToken/cfetch";

function SignUp(props) {
    function submitHandler(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementsByClassName('login-form')[0]);
        localStorage.setItem('username', formData.get('username'));
        cfetch('api/register', {
            method: 'POST',
            body: formData,
        }).then((response) => {
            if (response.ok) {
                props.handlerAuthorize();
            }
        });
    }

    return (
        <div className="login-wrapper">
            <div className="header__logo" onClick={() => console.log("Hello, dude!")}>Techno<span>Inst</span></div>
            <div className="greetings">Nice to meet you!</div>
            <form className="login-form" onSubmit={submitHandler}>
                <input name='email' type="email" placeholder="Email"/>
                <input name='name' type="text" placeholder="Full Name"/>
                <input name='username' type="text" placeholder="Username"/>
                <input name='password' type="password" placeholder="Your password"/>
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