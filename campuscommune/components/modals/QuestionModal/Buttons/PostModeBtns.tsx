"use client";
import { PiImagesLight } from "react-icons/pi";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

interface PostModeBtnsProps {
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  image: File | undefined;
  handleAddPost: () => void;
}

const PostModeBtns: React.FC<PostModeBtnsProps> = ({
  setImage,
  image,
  handleAddPost,
}) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    //upload the file to the server
    
    const file = acceptedFiles[0];

    setImage(file);
    const reader = new FileReader();
    //convert file into base64 string
    reader.onload = (event: any) => {
      console.log(`Post: ${event.target.result}`);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
  });

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3 ">
        <p
          className="text-neutral-700 font-semibold p-1 cursor-pointer transition-all duration-300 rounded-sm text-sm hover:border-blue-700"
          style={{ borderWidth: "1px" }}
        >
          Aa
        </p>
        <span
          {...getRootProps()}
          className="p-1 rounded-sm hover:border-blue-700 cursor-pointer transition-all duration-300 "
          style={{ borderWidth: "1px" }}
        >
          <input {...getInputProps()} />
          <PiImagesLight size={19} className="text-neutral-700" />
        </span>
      </div>
      <button 
      onClick={handleAddPost}
      className="flex items-center justify-center bg-blue-600 rounded-3xl">
        <p className="text-neutral-100 text-sm font-semibold px-3 py-2">Post</p>
      </button>
    </div>
  );
};

export default PostModeBtns;
