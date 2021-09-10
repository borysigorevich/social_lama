import React, {useContext, useRef} from 'react';
import './register.css'
import {AuthContext} from "../../context/AuthContext";
import {loginCall} from "../../apiCalls";
import axios from "axios";
import {useHistory} from "react-router";

const Register = () => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const history = useHistory()

    const handleClick = async event => {
        console.log(password)
        event.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity('Passwords dont match')
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post('/auth/register', user)
                history.push('/login')
            } catch (error) {
                console.log(error)
            }
        }
    }

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
                        <input placeholder={'Username'} ref={username} required type="text" className="loginInput"/>
                        <input placeholder={'Email'} ref={email} required type="email" className="loginInput"/>
                        <input placeholder={'Password'} minLength={6} ref={password} required type="password"
                               className="loginInput"/>
                        <input placeholder={'Password Again'} ref={passwordAgain} required type="password"
                               className="loginInput"/>
                        <button className="loginButton" type={'submit'}>Sign up</button>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;