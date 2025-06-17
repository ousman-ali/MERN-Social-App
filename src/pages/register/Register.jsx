import React from 'react'
import "./register.css"

export default function Register() {
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
            <div className="loginBox">
                <input placeholder='username' className="loginInput" />
                <input placeholder='email' className="loginInput" />
                <input placeholder='password' className="loginInput" />
                <input placeholder='confirm password' className="loginInput" />
                <button className="loginButton">Sign Up</button>
                <span className='forgot'>Do you have an Account?</span>
                <button className="loginRegisterButton">Login</button>
            </div>
        </div>
      </div>
    </div>
  )
}
