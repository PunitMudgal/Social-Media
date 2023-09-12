import React from "react";
import avatar from "../../assets/profile.png";
import { useSelector } from "react-redux";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import ArticleIcon from "@mui/icons-material/Article";
// import {
//   ArticleIcon,
//   InsertPhotoRoundedIcon,
//   AttachFileRoundedIcon,
//   KeyboardVoiceRoundedIcon,
// } from "@mui/icons-material";

function PostWidget() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="dark:bg-gray-900 bg-gray-100 p-5 w-full rounded-xl relative shadow-md ">
      <form className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <img
            src={user?.picturePath || avatar}
            alt="profile"
            className="w-12 object-cover h-12 rounded-full"
          />
          <input
            type="text"
            className="dark:bg-slate-700 bg-slate-300 rounded-3xl py-3 w-full px-6"
            placeholder="What's on your mind today...!"
          />
        </div>
        <div className="flex w-full ">
          <label
            htmlFor="post"
            className="border-2 border-dotted border-cyan-400 p-3 w-full h-14 cursor-pointer"
          >
            Tap to add image...
          </label>
          <input
            id="post"
            type="file"
            placeholder="Add Image Here"
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
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded-md"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostWidget;
