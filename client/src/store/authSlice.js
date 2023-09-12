import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  user: null,
  posts: [],
  data: { loading: false, apiData: undefined, status: null, serverError: null },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non existent");
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
    setData: (state, action) => {
      state.data.apiData = action.payload.apiData;
      state.data.loading = action.payload.loading;
      state.data.serverError = action.payload.serverError;
      state.data.status = action.payload.status;
    },
  },
});

export const { setMode, setUser, setFriends, setPosts, setPost, setData } =
  authSlice.actions;
export default authSlice.reducer;
