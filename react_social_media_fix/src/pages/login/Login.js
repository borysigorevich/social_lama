import React, {useContext, useRef} from 'react';
import './login.css'
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core";

const Login = () => {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, error, dispatch} = useContext(AuthContext)
    const handleClick = (e) => {
        e.preventDefault()
        loginCall({email: email.current.value, password: password.current.value}, dispatch)
    }

    console.log(user)
    return (
        <div className={'login'}>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Kay&Bee</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Kay&Bee.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input ref={email} required placeholder={'Email'} type="email" className="loginInput"/>
                        <input ref={password} required minLength={5} placeholder={'Password'} type="password"
                               className="loginInput"/>
                        <button className="loginButton" type={'submit'} disabled={isFetching}>{isFetching ? <CircularProgress size={25} color={'white'}/> : 'Log in'}</button>
                        <span className={'loginForgot'}>Forgot Password?</span>
                        <button className="loginRegisterButton">{isFetching ? <CircularProgress size={25} color={'white'}/> : 'Create a New Account'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;