import React from 'react'
import Card from './Card'


function Profilebottom({userBlogs}) {
    
  return (
    <div className="profile-bottom-wrapper">
         <div className="profile-bottom w-full h-full flex flex-wrap gap-3 justify-center sm:justify-normal">
         {userBlogs.map((blog,index) => (
                 <Card key={index} blog={blog} editStatus={true}/>
            ))}
          </div>
      </div>
  )
}

export default Profilebottom