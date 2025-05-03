import React,{useState, useEffect} from "react";
import Profiletop from "../components/Profiletop";
import Profilebottom from "../components/Profilebottom";
import { useBlog } from '../Contexts/BlogContext'
import { useAuth } from '../appwrite/AuthContext'
import { CgProfile } from "react-icons/cg";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import st from "../appwrite/storage";
import db from "../appwrite/databases";

function User() {
    const {id} = useParams()
    const {blogs} = useBlog()
    const userBlogs = blogs.filter((blog) => (blog.userid == id))
    const blogsCount = userBlogs.length
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const fetchAndSetUser = async () => {
          try {
            const response = await db.userProfile.get(id); // Ensure 'await' is used
            setUserName(response.userName); // Set the username with the response
            console.log('Users:', response); // Log after fetching successfully
          } catch (error) {
            console.error('Error fetching users:', error); // Handle errors properly
          }
        };
      
        fetchAndSetUser(); // Call the asynchronous function inside useEffect
      }, []); // Dependency array ensures it runs once
    

    useEffect(() => {
        const fetchExistingImage = async () => {
          try {
            const url = st.profileImages.getPreview(id);
      
            // Validate the URL points to an accessible image
            const response = await fetch(url, { method: "HEAD" });
            console.log(response)
            if (response.ok && response.headers.get("content-type").includes("image")) {
              setUploadedUrl(url); // Set the valid image URL
            } else {
              setUploadedUrl(null); // Invalid or non-existent image
            }
          } catch (error) {
            console.log("Error fetching or validating profile image:", error);
            setUploadedUrl(null);
          }
        };
      
        fetchExistingImage();
      }, [id]);
  return (
    <div className="profile-wrapper">
      <div className="profile-top-wrapper bg-[var(--secondary-color)] w-full h-40 rounded-lg p-6">
            <div className="profile-top h-full w-full">
              <div className="profile-image-details-wrapper flex items-center gap-4">
                <div className="profile-image-wrapper">
                  <div className="profile-image h-28 w-28 rounded-full overflow-hidden flex justify-center items-center bg-gray-300">
                    {/* Show uploaded image, preview, or default icon */}
                    {uploadedUrl ? (
                      <img
                        src={uploadedUrl}
                        alt="Profile"
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <CgProfile color="white" size="5em" />
                    )}
                  </div>
                </div>
                <div className="profile-details text-[var(--text-color1)]">
                  <h4 className="font-semibold">{userName}</h4>
                  <p className="blog-numbers">
                    <span className="mr-2">{blogsCount}</span>Blogs
                  </p>
                  <h2 className="text-sm">
                    User Id: <span>{id}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
      <div className="blogs-line mt-2 mb-4">
        <h1 className="text-[var(--text-color1)] text-sm">Blogs</h1>
        <div className="bg-[var(--secondary-color)] h-[2px] w-full rounded"></div>
      </div>
      <div className="profile-bottom-wrapper">
         <div className="profile-bottom w-full h-full flex flex-wrap gap-3 justify-center sm:justify-normal">
         {userBlogs.map((blog,index) => (
                 <Card key={index} blog={blog}/>
            ))}
          </div>
      </div>
    </div>
  );
}

export default User;
