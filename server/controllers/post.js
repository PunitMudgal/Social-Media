import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

/** POST --> /posts */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    return res.status(409).json({ msg: error.message });
  }
};

/** GET --> /posts */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

/** GET --> /posts/:userId/posts" */
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

/** PATCH --> /posts/:id/like" */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.like.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

/** DELETE ->  /posts/:postId */
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) res.status(404).send({ err: "post not found!" });

    if (req.user.userId === post.userId) {
      await Post.findByIdAndDelete(postId);
      await Comment.deleteMany({ postId });
      res.status(200).json("post deleted successfully");
    } else {
      res.status(403).send({ err: "you cannot delete someone else's post" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
