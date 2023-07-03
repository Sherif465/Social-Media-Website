import React, { useState, useEffect ,useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Topics } from "./Topics";
import { Activity } from "./Activity";
import { UserApi } from '../API/userAPI';
import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { PostApi } from '../API/PostAPI';
import moment from 'moment';

export  function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [userInfo , setUserInfo] = useState({})
  const [userPosts , setUserPosts] = useState([])
  let { id } = useParams();
  const getUserInfo = async () => {
    try {
      const res = await UserApi.userProfile({id});
      setUserInfo(res.data);
    }
    catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
  const getUserPosts = async () => {
    try {
      const res = await PostApi.userPosts({id});
      setUserPosts(res.data);
    }
    catch (error) {
      console.error('Error fetching user info:', error);
    }
  } 
    useEffect(() => {
    getUserInfo();
    getUserPosts();
  }, []);
  return (
    <main className="profile-page layout layout--3 text-white ">
   
    <div className="container">
      {/* Topics Start */}
      <Topics />
  {/* Topics End */}


{/* Room List Start */}
<div className="roomList my-3">
 <div className="profile">
   <div className="profile__avatar">
     <div className="avatar avatar--large active">
     <img
        src={userInfo.avatar? `http://127.0.0.1:8000${userInfo.avatar}`
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
        alt="Avatar"/>
     </div>
   </div>
   <div className="profile__info">
     <h3>{userInfo.username}</h3>

     <div style={{ fontSize: '2rem' }}>Techbin: <span>{userInfo.techbin}</span></div>

     {user?.id === userInfo.id && (
  <NavLink to="/editprofile">
    <p className="btn btn--main btn--pill text-white">Edit Profile</p>
  </NavLink>
)}

   </div>
   <div className="profile__about">
     <h3>About</h3>
     <p>
       {userInfo.bio}
     </p>
   </div>
 </div>
{/* Posts starts here */}
{userPosts.map((post) => (
  <div className="roomListRoom" key={post.id}>
  <div className="roomListRoom__header">
    <a href="profile.html" className="roomListRoom__author text-decoration-none">
      <div className="avatar avatar--small active">
        <img src="https://randomuser.me/api/portraits/men/11.jpg" />
      </div>
      <span>@{userInfo.username}</span>
    </a>
    <div className="roomListRoom__actions">
      <span>{moment(post.created_at).fromNow(true)} ago</span>
    </div>
  </div>
  <div className="roomListRoom__content">
    <a href="room.html">{post.title}</a>
    <p>
      {post.content}
    </p>
  </div>
  <div className="roomListRoom__meta">
    <a className="roomListRoom__joined">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <title>user-group</title>
        <path
          d="M30.539 20.766c-2.69-1.547-5.75-2.427-8.92-2.662 0.649 0.291 1.303 0.575 1.918 0.928 0.715 0.412 1.288 1.005 1.71 1.694 1.507 0.419 2.956 1.003 4.298 1.774 0.281 0.162 0.456 0.487 0.456 0.85v4.65h-4v2h5c0.553 0 1-0.447 1-1v-5.65c0-1.077-0.56-2.067-1.461-2.584z"
        ></path>
        <path
          d="M22.539 20.766c-6.295-3.619-14.783-3.619-21.078 0-0.901 0.519-1.461 1.508-1.461 2.584v5.65c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-5.651c0-1.075-0.56-2.064-1.461-2.583zM22 28h-20v-4.65c0-0.362 0.175-0.688 0.457-0.85 5.691-3.271 13.394-3.271 19.086 0 0.282 0.162 0.457 0.487 0.457 0.849v4.651z"
        ></path>
        <path
          d="M19.502 4.047c0.166-0.017 0.33-0.047 0.498-0.047 2.757 0 5 2.243 5 5s-2.243 5-5 5c-0.168 0-0.332-0.030-0.498-0.047-0.424 0.641-0.944 1.204-1.513 1.716 0.651 0.201 1.323 0.331 2.011 0.331 3.859 0 7-3.141 7-7s-3.141-7-7-7c-0.688 0-1.36 0.131-2.011 0.331 0.57 0.512 1.089 1.075 1.513 1.716z"
        ></path>
        <path
          d="M12 16c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.859 0-7 3.141-7 7s3.141 7 7 7zM12 4c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5c0-2.757 2.243-5 5-5z"
        ></path>
      </svg>
      Number of posts OR no. of members
    </a>
    <p className="roomListRoom__topic">Group Name</p>
  </div>
</div>
))}
 
{/* Posts ends here */}
</div>
{/* Room List End */}

{/* Activities Start */}
<Activity />
{/* Activities End */}
</div>
</main>     
  )
}
