import React from "react";
import {
  FavoriteBorderRounded,
  FavoriteRounded,
  InsertCommentOutlined,
  NearMeOutlined,
  TurnedInNotRounded,
} from "@mui/icons-material";
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
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="border p-2 rounded-lg bg-white dark:border-gray-800 dark:bg-slate-950 ">
      <Friend
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
                <FavoriteRounded className="cursor-pointer" />
              ) : (
                <FavoriteBorderRounded className="cursor-pointer" />
              )}
            </span>
            <p>
              {" "}
              <InsertCommentOutlined className="cursor-pointer" />
              {comments?.map((comment) => (
                <p>{comment}</p>
              ))}
            </p>
            <p>
              <NearMeOutlined className="cursor-pointer" />
            </p>
          </div>
          <TurnedInNotRounded className="cursor-pointer" />
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
