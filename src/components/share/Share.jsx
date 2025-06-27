import React, { useContext, useRef, useState } from 'react'
import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile]=useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }
    if(file){
        const data = new FormData();
        const fileName = Date.now() + '-' + file.name; // Unique file name
        data.append("file", file);
        data.append("name", fileName);
        newPost.img = fileName;
        console.log('filename', fileName);

       try {
          await axios.post("/upload", data);
          await axios.post("/posts/create", newPost);
          window.location.reload();
       } catch (error) {
         console.log(error)
       }
    }
  }

  //   try {
  //     await axios.post("/posts/create", newPost);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img 
              className='shareProfileImg' 
              src={user.profilePicture ? 
              user.profilePicture : PF+"noprofile.jpg"} alt="" 
            />
            <input ref={desc} 
              placeholder={"what's in your mind "+user.username+"?"}  
              className="shareInput" 
            />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className="shareImgContainer">
            <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
            <Cancel className='shareCancelImg' onClick={()=>setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler} >
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                    <PermMedia htmlColor='tomato' className='shareIcon' />
                    <span className='shareOptionText'>Photo or Video</span>
                    <input 
                      type="file"
                      id='file' 
                      accept='.jpg,.jpeg,.png' 
                      placeholder='choose file' 
                      className="" onChange={(e)=>setFile(e.target.files[0])} 
                      style={{display: "none"}}
                    />
                </label>
                <div className="shareOption">
                    <Label htmlColor='blue' className='shareIcon' />
                    <span className='shareOptionText'>Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor='green' className='shareIcon' />
                    <span className='shareOptionText'>Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                    <span className='shareOptionText'>Feelings</span>
                </div>
            </div>
            <button type='submit' className="shareButton">Share</button>
        </form>
      </div>
    </div>
  )
}
