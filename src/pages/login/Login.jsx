import React from 'react'
import "./login.css"

export default function Login() {
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
                <input placeholder='email' className="loginInput" />
                <input placeholder='password' className="loginInput" />
                <button className="loginButton">Login</button>
                <span className='forgot'>forgot Password?</span>
                <button className="loginRegisterButton">Create New Account</button>
            </div>
        </div>
      </div>
    </div>
  )
}
