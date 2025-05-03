import { useContext, useState, useEffect, createContext } from "react";
import db from "../appwrite/databases";
import { Query } from "appwrite";

const BlogContext = createContext()

export const BlogProvider = ({children}) => {
  const [blogs, setBlogs] = useState([]);

useEffect(() => {
  init()
}, []);

const init = async () => {
  const response = await db.articles.list(
      [Query.orderDesc('$createdAt')]
  )

  setBlogs(response.documents)
}

    const addBlog = async (payload) => {
        try {
          let response = await db.articles.create(payload)
          console.log(response)
          setBlogs((prev) => [response, ...prev])
          return response
        } catch (error) {
          console.log(error)
        }
    }

    const updateBlog = async (id, payload) => {
       try{
        let response = await db.articles.update(id, payload)
        console.log(response)
        setBlogs((prev) =>
          prev.map((blog) => (blog.$id === id ? response : blog))
        );
        return response
       } catch(error){
         console.log(error)
       }
    }

    const deleteBlog = async (id) => {
       try{
        let response = await db.articles.delete(id)
        setBlogs((prev) =>
          prev.filter((blog) => (blog.$id !== id))
        );
        return response
       } catch(error){
         console.log(error)
       }
    }
  

   const contextData = {
         blogs,
         setBlogs,
         addBlog,
         updateBlog,
         deleteBlog
   }

 return(
   <BlogContext.Provider value = {contextData}>
        {children}
   </BlogContext.Provider>
 )
}

export const useBlog = () => {return useContext(BlogContext)}

export default BlogContext