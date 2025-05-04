import React ,{useState, useEffect} from 'react'
import { useAuth } from '../../../appwrite/AuthContext';
import st from '../../../appwrite/storage';

function Preview({ title="Title",  category = 'Nature', content ="Write the content", image}) {
  const {user} = useAuth()
  const [uploadedUrl, setUploadedUrl] = useState(null)
  const fetchExistingImage = async () => {
    try {
      const url = st.profileImages.getPreview(user.$id);

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
   

  fetchExistingImage();


    return (
      <div className="preview-wrapper p-5 bg-[var(--secondary-color)] rounded-lg flex flex-col items-center relative">
          <div className="person-image-name flex items-center justify-center gap-3 absolute left-5 top-2 z-10">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img
              src={uploadedUrl}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <span className="text-xs text-[var(--text-color1)]">
            {user.name}
          </span>
        </div>
        {/* Title Section */}
        <div className="preview-title mb-4 mt-7">
          <h1 className="text-[var(--text-color1)] text-2xl break-all">{title || "No title provided"}</h1>
        </div>
  
        {/* Image Section */}
        <div className="preview-image mb-4">
          {image ? (
            <img
              src={image}
              alt="Uploaded Preview"
              className="w-full max-w-sm rounded-lg"
            />
          ) : (
            <p className="text-[var(--text-color2)]">No image uploaded</p>
          )}
        </div>
  
        {/* Category Section */}
        {/* <div className="preview-category mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-color1)]">Category:</h2>
          <p className="text-[var(--text-color2)]">{category || "No category provided"}</p>
        </div> */}
  
        {/* Blog Content Section */}
        <div className="preview-content">
          <div
            className="text-[var(--text-color1)]"
            dangerouslySetInnerHTML={{ __html: content || "<p>No content provided</p>" }}
          ></div>
        </div>
      </div>
    );
  }
  
  export default Preview;