import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import ArticleIcon from "@mui/icons-material/Article";
import { postImage } from "../../helper/helper";
import { setPosts } from "../../store/authSlice";
import toast, { Toaster } from "react-hot-toast";
import Avatar from "../Avatar";
import avatar from "../../assets/profile.png";

function UploadPhotoWidget() {
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  // const [isImage, setIsImage] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handlePost = async () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const responsePromise = postImage(formData);
    toast.promise(responsePromise, {
      loading: "uploading...",
      success: "uploaded successfully",
      error: "couldn't post",
    });
    responsePromise.then(dispatch(setPosts({ responsePromise })));
    setPost("");
    setImage(null);
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 p-5 w-full rounded-xl relative shadow-md ">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Avatar picturePath={user?.picturePath || avatar} />
          <input
            type="text"
            className="dark:bg-slate-700 bg-slate-300 rounded-3xl py-3 w-full px-6"
            placeholder="What's on your mind today..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className="flex w-full ">
          <label
            htmlFor="post"
            className="border-2 border-dotted border-cyan-400 p-3 w-full h-14 cursor-pointer"
          >
            {image?.name || "Tap to add image..."}
          </label>
          <input
            id="post"
            type="file"
            placeholder="Add Image Here"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <hr />
        <div className="addPost flex gap-3 text-sm justify-between items-center text-gray-800 dark:text-gray-300">
          <span>
            <InsertPhotoRoundedIcon /> Image{" "}
          </span>
          <span>
            <ArticleIcon /> Clip{" "}
          </span>
          <span>
            <AttachFileRoundedIcon /> Attachment{" "}
          </span>
          <span>
            <KeyboardVoiceRoundedIcon /> Audio{" "}
          </span>
          <button
            disabled={!post}
            onClick={handlePost}
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded-md"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPhotoWidget;
