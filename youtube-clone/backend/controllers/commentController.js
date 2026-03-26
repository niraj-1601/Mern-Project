import Comment from "../models/Comment.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const newComment = new Comment({
      videoId: req.body.videoId,
      userId: req.user.id,
      text: req.body.text,
    });

    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get comments for a video
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).populate("userId", "username avatar");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update comment
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: { text: req.body.text } },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};