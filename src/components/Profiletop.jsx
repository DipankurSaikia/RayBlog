import React, { useState, useEffect } from "react";
import { useAuth } from "../appwrite/AuthContext";
import { CgProfile } from "react-icons/cg";
import st from "../appwrite/storage"; // Custom Appwrite storage wrapper

function Profiletop({ blogsCount = 0 }) {
  const { user } = useAuth();
  const [preview, setPreview] = useState(null); // For offline preview
  const [file, setFile] = useState(null); // File to upload
  const [uploadedUrl, setUploadedUrl] = useState(null); // URL of uploaded image

  

  // Fetch the existing image when the component mounts
  useEffect(() => {
    const fetchExistingImage = async () => {
      try {
        const url = st.profileImages.getPreview(user.$id);
  
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
  }, [user.$id]);
  // Handle file selection and preview
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result); // Set preview URL
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      // Upload the file using user.$id as the file ID
      await st.profileImages.create(file, user.$id);

      // Generate the file preview URL
      const previewUrl = st.profileImages.getPreview(user.$id);
      setUploadedUrl(previewUrl);
      setFile(null); // Clear the selected file
      setPreview(null); // Clear the preview
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload file!");
    }
  };

  // Handle file deletion
  const handleDelete = async () => {
    try {
      await st.profileImages.delete(user.$id); // Delete file by user.$id
      setUploadedUrl(null); // Remove uploaded URL
      setPreview(null); // Clear preview
      setFile(null); // Clear selected file
      alert("File removed!");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete file!");
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setPreview(null);
    setFile(null);
    alert("File selection canceled!");
  };

  return (
    <div className="profile-top-wrapper bg-[var(--secondary-color)] w-full h-40 rounded-lg p-6">
      <div className="profile-top h-full w-full">
        <div className="profile-image-details-wrapper flex items-center gap-4">
          <div className="profile-image-wrapper">
            <div className="profile-image h-28 w-28 rounded-full overflow-hidden flex justify-center items-center bg-gray-300">
              {/* Show uploaded image, preview, or default icon */}
              {uploadedUrl || preview ? (
                <img
                  src={uploadedUrl || preview}
                  alt="Profile"
                  className="object-cover h-full w-full"
                />
              ) : (
                <CgProfile color="white" size="5em" />
              )}
            </div>
            <div className="upload-edit-delete flex justify-center mt-1 gap-2">
              {/* File Input */}
              {!preview && !uploadedUrl && (
                <label
                  htmlFor="fileInput"
                  className="text-[var(--text-color1)] text-xs bg-green-500 px-2 rounded-lg cursor-pointer"
                >
                  Choose File
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {/* Upload & Cancel Buttons */}
              {preview && !uploadedUrl && (
                <>
                  <button
                    onClick={handleUpload}
                    className="text-[var(--text-color1)] text-xs bg-blue-500 px-2 rounded-lg"
                  >
                    Upload
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-[var(--text-color1)] text-xs bg-gray-500 px-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* Delete Button */}
              {uploadedUrl && (
                <button
                  onClick={handleDelete}
                  className="text-[var(--text-color1)] text-xs bg-red-500 px-2 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="profile-details text-[var(--text-color1)]">
            <h4 className="font-semibold">{user.name}</h4>
            <p className="blog-numbers">
              <span className="mr-2">{blogsCount}</span>Blogs
            </p>
            <h2 className="text-sm">
              User Id: <span>{user.$id}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiletop;
