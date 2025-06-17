import React from 'react'
import "./closeFriends.css";

export default function CloseFriends({user}) {
  return (
        <li className="sidebarFriendListItem">
            <img className='sidebarFriendImg' src={user.profilePicture} alt="" />
            <span className='sidebarFriendName' >{user.username}</span>
        </li>
     )
}
