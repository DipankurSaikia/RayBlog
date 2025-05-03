import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useBlog } from '../Contexts/BlogContext';
import Card from '../components/Card';

function Home() {
   const { blogs } = useBlog();
   const [searchTerm, setSearchTerm] = useState('');

   // Filter blogs based on search term across multiple attributes
   const filteredBlogs = blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.imageid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.imageUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.userid.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
     <>
          <div className="Hero-top-wrapper bg-[var(--secondary-color)] h-28 rounded-md flex justify-center items-center mb-4">
              <div className="search-wrapper">
                <div className="bg-[var(--input-field)] h-8 w-full max-w-md md:max-w-lg lg:max-w-xl rounded-3xl flex items-center px-4 gap-2">
                  <IoSearch className="text-gray-500" />
                  <input
                    type="text"
                    className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="hero-bottom-wrapper">
            <div className="hero-bottom flex flex-wrap gap-3 justify-center sm:justify-normal">
            {filteredBlogs.map((blog, index) => (
                 <Card key={index} blog={blog}/>
            ))}
            </div>
          </div>
     </>
  )
}

export default Home;
