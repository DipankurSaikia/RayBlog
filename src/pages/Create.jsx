import React, { useState, useEffect, useRef } from "react";
import { FileUploader } from "../components/Createcomponents/fileUploader/FileUploader";
import BlogEditor from "../components/tinymceEditor/BlogEditor";
import Preview from "../components/Createcomponents/Preview/Preview";
import { useBlog } from "../Contexts/BlogContext";
import { useAuth } from "../appwrite/AuthContext";
import st from "../appwrite/storage";
import { useLocation } from 'react-router-dom';

function Create() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState(null);
  const [imageid, setImageid] = useState("");
  const { addBlog, updateBlog } = useBlog();
  const [initValue, setInitValue] = useState("");
  const blogEditorRef = useRef(null);

  const location = useLocation();
  const blog = location.state;

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setImage(blog.imageUrl);
      setCategory(blog.category);
      setContent(blog.content);
      setImageid(blog.imageid);
      setInitValue(blog.content);
    }
  }, [location.state]);

  const addImage = async (file) => {
    try {
      const response = await st.blogImages.create(file);
      return response.$id;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      throw error;
    }
  };

  const addImageUrl = async (id) => {
    try {
      const response = await st.blogImages.getPreview(id);
      return response;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      throw error;
    }
  };

  const addImageUrl2 = async (id, file) => {
    try {
      const response = await st.blogImages.update(id, file);
      if (response.ok) return await st.blogImages.getPreview(id);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      throw error;
    }
  };

  const add = async (e) => {
    e.preventDefault();

    if (blogEditorRef.current) {
      blogEditorRef.current.log();
    }

    if (!blog) {
      const imageid = await addImage(file);
      const imageUrl = await addImageUrl(imageid);

      if (!title || !imageUrl || !category || !content) {
        alert("Please fill out all required fields.");
        return;
      }

      try {
        const payload = {
          title,
          category,
          content,
          imageid,
          imageUrl,
          userid: user.$id,
          userName: user.name,
        };

        const response = await addBlog(payload);

        if (response) {
          setTitle("");
          setCategory("");
          setImage("");
          setContent("");
          setPreview(false);
          setInitValue("");
          alert("Blog added successfully!");
        } else {
          alert("There was an issue adding your blog.");
        }
      } catch (error) {
        console.error("Error adding blog:", error);
        alert("There was an issue adding your blog. Please try again.");
      }
    } else {
      const imageUrl = image.includes('https://fra.cloud.appwrite.io/')
        ? image
        : await addImageUrl2(imageid);

      if (!title || !imageUrl || !category || !content) {
        alert("Please fill out all required fields.");
        return;
      }

      try {
        const payload = {
          title,
          category,
          content,
          imageUrl,
        };

        const response = await updateBlog(blog.$id, payload);

        if (response) {
          setTitle("");
          setCategory("");
          setImage("");
          setContent("");
          setPreview(false);
          setInitValue("");
          alert("Blog updated successfully!");
        } else {
          alert("There was an issue updating your blog.");
        }
      } catch (error) {
        console.error("Error adding blog:", error);
        alert("There was an issue adding your blog. Please try again.");
      }
    }
  };

  return (
    <div className="create-wrapper p-5 bg-[var(--secondary-color)] rounded-lg min-h-full">
      <form onSubmit={add} className={`transition-all ${preview ? "hidden" : ""}`} name="createForm" id="createForm">
        <div className="title-input-wrapper flex gap-2 mb-4">
          <label htmlFor="title" className="text-[var(--text-color1)] cursor-pointer">
            Title<span className="text-red-700">*</span>:
          </label>
          <div className="input flex flex-grow border-b-2 border-gray-300">
            <input
              type="text"
              id="title"
              placeholder="Enter the title"
              className="flex-grow bg-transparent outline-none text-[var(--text-color1)] placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="md:flex justify-start items-center gap-3 mb-8">
          <label htmlFor="image" className="text-[var(--text-color1)] cursor-pointer w-32">
            Upload Image <span className="text-red-700">*</span>
          </label>
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mr-16 mt-4" id="image">
            <FileUploader setImage={setImage} image={image} file={file} setFile={setFile} />
          </div>
        </div>

        <div className="title-input-wrapper flex gap-2 mb-4">
          <label htmlFor="category" className="text-[var(--text-color1)] cursor-pointer">
            Category<span className="text-red-700">*</span>:
          </label>
          <div className="input flex flex-grow border-b-2 border-gray-300 w-28">
            <input
              type="text"
              id="category"
              placeholder="Enter the category"
              className="flex-grow bg-transparent outline-none text-[var(--text-color1)] placeholder-gray-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="blog-editor-wrapper mb-4">
          <BlogEditor setContent={setContent} initValue={initValue} ref={blogEditorRef} />
        </div>

        <div className="submit-preview-wrapper text-center">
          <div>
            <button
              type="submit"
              className="bg-[var(--primary-color)] text-[var(--text-color1)] p-1 rounded-2xl px-5 mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-[var(--input-field)] text-[var(--text-color2)] p-1 rounded-2xl px-4 font-semibold"
              onClick={() => setPreview(true)}
            >
              Preview
            </button>
          </div>
        </div>
      </form>

      <div className={`transition-all ${preview ? "" : "hidden"}`}>
        <Preview title={title} image={image} content={content} />
        <div className="back-button text-center">
          <button
            className="text-[var(--text-color1)] bg-red-600 py-1 px-4 rounded-2xl"
            onClick={() => setPreview(false)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
