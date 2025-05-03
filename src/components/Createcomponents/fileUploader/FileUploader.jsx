import React, { useCallback, useRef, useState } from "react";
import { UploadIcon } from "./UploadIcon";
import { UploadText } from "./UploadText";
import { FILE_UPLOAD_MAX_SIZE } from "./types";

export function FileUploader({
  maxSize = FILE_UPLOAD_MAX_SIZE,
  onDrop,
  className = "",
  setImage,
  image,
  file,
  setFile
}) {
  const fileInputRef = useRef(null);
  // const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const isImage = (file) => file.type.startsWith("image/");

  const handleFileValidation = (file) => {
    if (!isImage(file)) {
      setError("Only image files are allowed.");
      return false;
    }
    setError("");
    return true;
  };

  const saveImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setImage(base64String)
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && handleFileValidation(droppedFile)) {
        setFile(droppedFile);
        saveImage(droppedFile);
        if (onDrop) onDrop([droppedFile]);
      }
    },
    [onDrop]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleClick();
      }
    },
    [handleClick]
  );

  const handleFileChange = useCallback(
    (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && handleFileValidation(selectedFile)) {
        setFile(selectedFile);
        saveImage(selectedFile)
        if (onDrop) onDrop([selectedFile]);
      }
    },
    [onDrop]
  );

  const handleReset = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImage("")
  };

  return (
    <div className={`file-uploader ${className}`}>
      {!image ? (
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={handleKeyPress}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`flex flex-col justify-center items-center px-6 py-5 w-full 
            text-center rounded-3xl border-2 border-sky-600 border-dashed transition-all
            cursor-pointer bg-zinc-900 bg-opacity-30 duration-[0.3s] ease-[ease]
            text-white text-opacity-30 hover:border-sky-400 hover:bg-opacity-40
            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent`}
          aria-label="File upload area"
        >
          <input
            ref={fileInputRef}
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            aria-label="File input"
            accept="image/*"
          />
          <div className="flex flex-col items-center max-w-full">
            <UploadIcon />
            <UploadText
              text="Drag & Drop"
              className="mt-2 text-2xl font-semibold text-white"
            />
            <UploadText
              text="or select files from device"
              className="mt-3 text-base text-white text-opacity-30"
            />
            <UploadText
              text={`max. ${maxSize}MB`}
              className="mt-4 text-sm text-white text-opacity-30"
            />
          </div>
        </div>
      ) : (
        <div className="relative mx-auto mt-4 w-full h-52">
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden h-full">
            <img
              src={image}
              alt='Image'
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={handleReset}
            className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-500"
          >
            Remove
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
