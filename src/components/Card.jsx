import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useBlog } from "../Contexts/BlogContext";
import st from "../appwrite/storage";
import { CgProfile } from "react-icons/cg";

function Card({ blog, editStatus = false }) {
  const [uploadedUrl, setUploadedUrl] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const url = st.profileImages.getPreview(blog.userid);
        setUploadedUrl(url);
      } catch (error) {
        console.log("Error fetching profile image:", error);
        setUploadedUrl(null);
      }
    };

    fetchProfileImage();
  }, [blog.userid]);

  const { deleteBlog } = useBlog();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${blog.$id}`);
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    navigate("/create", { state: blog });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      if (blog.imageid) {
        const deleteImage = await st.blogImages.delete(blog.imageid);
        if (!deleteImage) {
          throw new Error("Failed to delete the image.");
        }
      }

      const deleteBlogResponse = await deleteBlog(blog.$id);
      if (!deleteBlogResponse) {
        throw new Error("Failed to delete the blog.");
      }

      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  return (
    <div
      className="card h-72 w-[80%] sm:w-52 sm:h-60 bg-[var(--secondary-color)] rounded-lg overflow-hidden cursor-pointer shadow-sm relative"
      onClick={handleClick}
    >
      <div className="image w-full h-40 sm:h-32">
        <img
          src={blog.imageUrl}
          alt=""
          className="object-cover h-full w-full"
        />
      </div>

      <div className="card-bottom px-3 pt-1">
        <h5 className="font-bold text-[var(--text-color1)] mb-3 overflow-hidden break-all line-clamp-2">
          {blog.title}
        </h5>

        <div className="person-image-name flex items-center gap-3 absolute bottom-4">
          <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
            {uploadedUrl ? (
              <img
                src={uploadedUrl}
                alt="Profile"
                className="object-cover h-full w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  setUploadedUrl(null);
                }}
              />
            ) : (
              <CgProfile color="white" size="1.5em" />
            )}
          </div>
          <span className="text-xs text-[var(--text-color1)]">
            {blog.userName}
          </span>
        </div>
      </div>

      {editStatus && (
        <div className="edit-delete-wrapper absolute right-3 bottom-6 flex gap-1">
          <span onClick={handleNavigate}>
            <FaEdit color="var(--primary-color)" />
          </span>
          <span onClick={handleDelete}>
            <MdDelete color="red" />
          </span>
        </div>
      )}
    </div>
  );
}

export default Card;
