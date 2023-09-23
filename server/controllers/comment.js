import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

/** POST --> /comment/ */
export async function addComment(req, res) {
  try {
    // const { text, postId, userId } = req.body;
    const newComment = new Comment({ ...req.body, userId: req.user.id });

    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/** POST --> /comment/reply/:commentId */
export async function addReply(req, res) {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/** GET --> /comment/:postId */
export async function getComments(req, res) {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    if (!comments) return res.status(400).send({ err: "no comments found" });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/** DELETE --> /comment/:id */
export async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    const post = await Post.findById(id);

    if (!comment && !post)
      return res.status(400).send({ error: "post or comment not found!" });

    if (req.user.id === comment.userId || req.user.id === post.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment Deleted Successfully");
    } else {
      return res.status(403).send("You cannot delete someone else's comment!");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
