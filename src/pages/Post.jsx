import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import db from "../appwrite/databases";
import { CgProfile } from "react-icons/cg";
import st from "../appwrite/storage";

function Post({
  title = "Title",
  category = "",
  content = "Write the content",
  image,
}) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false); // State to track if the post is not found

  const [uploadedUrl, setUploadedUrl] = useState(null)



  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await db.articles.get(id);
      setPost(response);
      setError(false); // Reset error if post is found
    } catch (error) {
      console.error(error);
      setError(true); // Set error if post is not found
    }
  };

  const fetchExistingImage = async () => {
    try {
      const url = st.profileImages.getPreview(post.userid);

      // Validate the URL points to an accessible image
      const response = await fetch(url, { method: "HEAD" });
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

  useEffect(() => {
    if (post && post.userid) {
      fetchExistingImage();
    }
  }, [post]);


  if (error) {
    // Render 404 when post is not found
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[var(--secondary-color)] text-center p-5">
        <h1 className="text-[var(--text-color1)] text-6xl font-bold mb-4">
          404
        </h1>
        <h2 className="text-[var(--text-color1)] text-2xl mb-6">
          Oops! Page not found.
        </h2>
        <p className="text-[var(--text-color1)] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-[var(--text-color1)] text-[var(--secondary-color)] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return post ? (
    <div className="preview-wrapper p-5 bg-[var(--secondary-color)] rounded-lg flex flex-col items-center min-h-full relative">
      <Link to={`/user/${post.userid}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from bubbling up
        }}
      >
        <div className="person-image-name flex items-center gap-3 absolute left-5 top-2">
          <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
            {uploadedUrl ? (
              <img
                src={uploadedUrl}
                alt="Profile"
                className="object-cover h-full w-full"
              />
            ) : (
              <CgProfile color="white" size="1.5em" />
            )}
          </div>
          <span className="text-xs text-[var(--text-color1)]">
            {post.userName}
          </span>
        </div>
      </Link>
      {/* Title Section */}
      <div className="preview-title mb-4 mt-7">
        <h1 className="text-[var(--text-color1)] text-2xl font-semibold break-all">
          {post.title || title}
        </h1>
      </div>

      {/* Image Section */}
      <div className="preview-image mb-4 w-full max-w-sm max-h-[50vh] flex items-center justify-center bg-[var(--secondary-color)] rounded-lg overflow-hidden">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt="Uploaded Preview"
            className="w-full h-auto max-h-[50vh] object-contain"
          />
        ) : (
          <p className="text-[var(--text-color2)]">No image uploaded</p>
        )}
      </div>

      {/* Blog Content Section */}
      <div className="preview-content">
        <div
          className="text-[var(--text-color1)]"
          dangerouslySetInnerHTML={{ __html: post.content || content }}
        ></div>
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center text-[var(--text-color1)]">
      Loading...
    </div>
  );
}

export default Post;
