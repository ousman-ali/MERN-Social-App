import React, { useContext, useEffect, useState } from 'react'
import "./rightbar.css";
import { Users } from "../../dummyData.js"
import Online from '../online/Online.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import { Add, Remove } from '@mui/icons-material';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(()=>{
    const getFriends = async () => {
      try {
        const friendLists = await axios.get("/users/friends/"+user._id);
        setFriends(friendLists.data);
        setIsFollowed(user?.followers?.includes(currentUser._id));
      } catch (error) {
        console.log(error)
      }
    }
    getFriends();
}, [user, currentUser])

// useEffect(()=>{
//   setIsFollowed(user?.followers?.includes(currentUser._id));
// }, [currentUser._id])

const handleFollow = async () => {
  try {
    if (isFollowed){
      await axios.put("/users/"+user._id+"/unfollow", {userId: currentUser._id});
    }else {
      await axios.put("/users/"+user._id+"/follow", {userId: currentUser._id});;
    }
  } catch (error) {
    console.log(error)
  }
  setIsFollowed(!isFollowed);
}

  const HomeRightbar =()=> {
    return (
        <>
          <div className="birthDayContainer">
              <img className='birthdayImg' src={`${PF}gift.png`} alt="" />
              <span className="birthdayText"><b>mohammed</b> and <b>3 other friends</b> have birthday today</span>
          </div>
            <img className='rightbarAd' src={`${PF}ad.png`} alt="" />
            <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendsList">
              {Users.map(u=>(
                <Online key={u.id} user={u} />
              ))}
          </ul>
        </>
    );
  }

  const ProfileRightbar =()=> {
      return (
        <>
          {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleFollow}>
              {isFollowed ? "Unfollow" : "follow"}
              {isFollowed ? <Remove className='followIcon'/> : <Add className='followIcon'/>}
            </button>
          )}
          <h4 className="rightbarTitle">User Information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">
              {
                user.relationship === 1 ? "Single" 
                : user.relationship === 2 
                ? "Married" : "" 
              }
              </span>
            </div>
          </div>
          <h4 className="rightbarTitle">User Friends</h4>
          <div className="rightbarFollowings">
            {friends.map(f=>(
              <Link to={"/profile/"+f.username} style={{textDecoration: "none"}}>
                <div className="rightbarFollowing"> 
                <img className='rightbarFollowingImg' src={f.profilePicture ? f.profilePicture : PF+"noprofile.jpg"} alt="" />
                <span className="rightbarFollowingName">{f.username}</span>
              </div>
            </Link>
          ))}
          </div>
        </>
      );
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
