import React, { useEffect } from 'react'
import Card from "./Card";
import { useBlog } from '../Contexts/BlogContext';
function Herobottom() {
    const {blogs} = useBlog()

  return (
    <div className="hero-bottom-wrapper">
            <div className="hero-bottom flex flex-wrap gap-3 justify-center sm:justify-normal">
            {blogs.map((blog,index) => (
                 <Card key={index} blog={blog}/>
            ))}
            </div>
          </div>
  )
}

export default Herobottom