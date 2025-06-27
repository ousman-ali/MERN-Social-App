import React, { useRef } from 'react';
import "./register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(confirmPassword.current.value !== password.current.value){
      confirmPassword.current.setCustomValidity("Your password does't match");
    }else{
        const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try {
        await axios.post("/auth/register", user)
        navigate("/login");
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">OAS.</h3>
            <span className="loginDesc">
                Connect with friends and the world around you on <span style={{color: "#1775ee"}}>OAS.</span>
            </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleSubmit} >
                <input 
                  placeholder='username' 
                  ref={username}
                  required
                  className="loginInput" 
                />
                <input
                  placeholder='email' 
                  ref={email}
                  type='email'
                  required
                  className="loginInput" 
                />
                <input 
                  placeholder='password'
                  ref={password} 
                  type='password'
                  min-length="6"
                  required
                  className="loginInput" 
                />
                <input 
                  placeholder='confirm password'
                  ref={confirmPassword}
                  type='password'
                  required 
                  className="loginInput" 
                />
                <button className="loginButton" type='submit'>Sign Up</button>
                <span className='forgot'>Do you have an Account?</span>
                <button className="loginRegisterButton">Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}
