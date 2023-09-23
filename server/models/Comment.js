import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  replies: {
    type: Array,
    default: [],
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
