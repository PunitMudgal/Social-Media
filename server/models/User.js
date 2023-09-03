import mongoose from "mongoose";

const UserScheme = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 35,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserScheme);
export default User;
