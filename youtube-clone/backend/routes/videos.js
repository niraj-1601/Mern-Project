import express from "express";
import Video from "../models/Video.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE video
router.post("/", verifyToken, async (req, res) => {
    try {
        const newVideo = new Video({ ...req.body, uploader: req.user.id });
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all videos
router.get("/", async (req, res) => {
    try {
        const videos = await Video.find().populate("channelId").populate("uploader");
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single video
router.get("/:id", async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .populate("channelId")
            .populate("uploader")
            .populate({ path: "comments", populate: { path: "userId" } });
        res.status(200).json(video);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE video
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json("Video not found");
        if (video.uploader.toString() !== req.user.id)
            return res.status(403).json("You can update only your videos");

        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedVideo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE video
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json("Video not found");
        if (video.uploader.toString() !== req.user.id)
            return res.status(403).json("You can delete only your videos");

        await video.deleteOne();
        res.status(200).json("Video deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;