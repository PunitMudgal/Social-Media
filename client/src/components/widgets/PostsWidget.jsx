import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { GetUserPosts, GetPosts } from "../../helper/helper";
import PostWidget from "./PostWidget";
import toast, { Toaster } from "react-hot-toast";
import { setPosts } from "../../store/authSlice";
import axios from "axios";
import { PostLoading } from "../Loading";

function PostsWidget({ isProfile, userId }) {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.auth.posts);
  const token = localStorage.getItem("token");
  const [postsRes, setPostsRes] = useState({
    loading: false,
    apiError: null,
  });

  const getPosts = async () => {
    try {
      setPostsRes({ loading: true });
      const response = await axios.get("http://localhost:5000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPostsRes({ loading: false });
      dispatch(setPosts(response.data));
    } catch (error) {
      setPostsRes({ loading: false, apiError: error });
    }
  };

  const getUserPosts = async () => {
    try {
      setPostsRes({ loading: true });
      const response = await axios.get(
        `http://localhost:5000/posts/${userId}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPostsRes({ loading: false });
      dispatch(setPosts(response.data));
    } catch (error) {
      setPostsRes({ loading: false, apiError: error });
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  if (postsRes?.apiError)
    return (
      <div className="p-5 bg-rose-700 text-white">
        Error Occured while fetching the posts: {postsRes?.apiError?.message}
      </div>
    );
  if (postsRes?.loading) return <PostLoading />;
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      {posts?.map((data) => (
        <PostWidget {...data} key={data._id} postUserId={data.userId} />
      ))}
    </>
  );
}

export default PostsWidget;
