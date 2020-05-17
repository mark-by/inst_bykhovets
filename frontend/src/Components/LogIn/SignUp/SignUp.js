import React from "react";
import Button from "../../Button/Button";
import cfetch from "../../CsrfToken/cfetch";
import Input from "../../Forms/Input/Input";

function SignUp(props) {
    const [errors, setErrors] = React.useState({});

    function submitHandler(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementsByClassName('login-form')[0]);
        localStorage.setItem('username', formData.get('username'));
        cfetch('api/register', {
            method: 'POST',
            body: formData,
        }).then((response) => {
            if (response.ok) {
                setErrors({});
                props.handlerAuthorize();
            } else {
                response.json().then(err => {
                    setErrors(err);
                    console.log(err);
                })
            }
        });
    }

    return (
        <div className="login-wrapper">
            <div className="header__logo" onClick={() => console.log("Hello, dude!")}>Techno<span>Inst</span></div>
            <div className="greetings">Nice to meet you!</div>
            <form className="login-form" onSubmit={submitHandler}>
                <Input name='email' type="email" placeholder="Email" error={errors.email}/>
                <Input name='name' type="text" placeholder="Full Name" error={errors.name}/>
                <Input name='username' type="text" placeholder="Username" error={errors.username}/>
                <Input name='password' type="password" placeholder="Your password" error={errors.password}/>
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