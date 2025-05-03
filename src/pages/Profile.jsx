import React from "react";
import Profiletop from "../components/Profiletop";
import Profilebottom from "../components/Profilebottom";
import { useBlog } from '../Contexts/BlogContext'
import { useAuth } from '../appwrite/AuthContext'


function Profile() {
    const {user} = useAuth()
    const {blogs} = useBlog()
    const userBlogs = blogs.filter((blog) => (blog.userid == user.$id))
    const blogsCount = userBlogs.length
  return (
    <div className="profile-wrapper">
      <Profiletop blogsCount = {blogsCount}/>
      <div className="blogs-line mt-2 mb-4">
        <h1 className="text-[var(--text-color1)] text-sm">Blogs</h1>
        <div className="bg-[var(--secondary-color)] h-[2px] w-full rounded"></div>
      </div>
       <Profilebottom userBlogs= {userBlogs}/>
    </div>
  );
}

export default Profile;
