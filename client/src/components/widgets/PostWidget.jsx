import React from "react";

import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../store/authSlice";
import Friend from "../Friend";

function PostWidget({
  likes,
  firstName,
  lastName,
  location,
  comments,
  createdAt,
  postUserId,
  _id: postId,
  picturePath,
  description,
  userPicturePath,
}) {
  const token = localStorage.getItem("token");
  const logedInUserId = useSelector((state) => state.auth.user?._id);
  const isLiked = Boolean(likes[logedInUserId]);
  const dispatch = useDispatch();

  const likePost = async () => {
    const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: logedInUserId }),
    });
    const updatedPost = await response.json();
    // console.log("inside likepost", updatedPost);
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="border p-2 rounded-lg bg-white dark:border-gray-800 dark:bg-slate-950 ">
      <Friend
        // friends={friends}
        // userId={_id}
        picturePath={userPicturePath}
        location={location}
        firstName={firstName}
        lastName={lastName}
        friendId={postUserId}
        createdAt={createdAt}
      />
      {picturePath && (
        <img
          onDoubleClick={likePost}
          className="rounded-md object-cover max-h-[30rem] flex justify-center"
          src={`http://localhost:5000/assets/${picturePath}`}
          alt="post"
        />
      )}

      <div className="mx-3 my-2">
        <div className="flex justify-between items-centers mb-2">
          <div className="flex gap-2">
            <span onClick={likePost}>
              {isLiked ? (
                <FavoriteRoundedIcon className="cursor-pointer" />
              ) : (
                <FavoriteBorderRoundedIcon className="cursor-pointer" />
              )}
            </span>
            <p>
              {" "}
              <InsertCommentOutlinedIcon className="cursor-pointer" />
              {comments?.map((comment) => (
                <p>{comment}</p>
              ))}
            </p>
            <p>
              <NearMeOutlinedIcon className="cursor-pointer" />
            </p>
          </div>
          <TurnedInNotRoundedIcon className="cursor-pointer" />
        </div>
        <p>{Object.keys(likes).length} Likes</p>
        <p className="mb-2">{`${firstName}: ${description}.`}</p>
        <input
          type="text"
          placeholder="Write a comment..."
          className="bg-transparent focus:border-none p-2 w-[60%]"
        />
      </div>
    </div>
  );
}

export default PostWidget;
