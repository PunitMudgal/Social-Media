import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  user: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state, action) => {
      // state.mode = state.mode === "light" ? "dark" : "light";
      state.darkMode = !state.darkMode;
    },
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("first friends non existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatePosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatePosts;
    },
  },
});

export const { setMode, setLogin, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
