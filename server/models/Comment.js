import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    picturePath: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      required: true,
    },
    replies: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
