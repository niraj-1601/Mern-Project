import express from "express";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ADD comment
router.post("/", verifyToken, async (req, res) => {
    try {
        const { videoId, text } = req.body;
        const newComment = new Comment({
            userId: req.user.id,
            videoId,
            text
        });
        const savedComment = await newComment.save();

        // Add comment to Video
        await Video.findByIdAndUpdate(videoId, { $push: { comments: savedComment._id } });

        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET comments for a video
router.get("/:videoId", async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
            .populate("userId", "username avatar");
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE comment
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json("Comment not found");
        if (comment.userId.toString() !== req.user.id)
            return res.status(403).json("You can update only your comment");

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: { text: req.body.text } },
            { new: true }
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE comment
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json("Comment not found");
        if (comment.userId.toString() !== req.user.id)
            return res.status(403).json("You can delete only your comment");

        await comment.deleteOne();
        // Remove comment from Video
        await Video.findByIdAndUpdate(comment.videoId, { $pull: { comments: req.params.id } });

        res.status(200).json("Comment deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;