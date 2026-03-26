import express from "express";
import Channel from "../models/Channel.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE channel
router.post("/", verifyToken, async (req, res) => {
    try {
        const newChannel = new Channel({ ...req.body, owner: req.user.id });
        const savedChannel = await newChannel.save();
        res.status(201).json(savedChannel);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all channels
router.get("/", async (req, res) => {
    try {
        const channels = await Channel.find().populate("owner").populate("videos");
        res.status(200).json(channels);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single channel
router.get("/:id", async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.id)
            .populate("owner")
            .populate("videos");
        res.status(200).json(channel);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE channel
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return res.status(404).json("Channel not found");
        if (channel.owner.toString() !== req.user.id)
            return res.status(403).json("You can update only your channel");

        const updatedChannel = await Channel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedChannel);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE channel
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return res.status(404).json("Channel not found");
        if (channel.owner.toString() !== req.user.id)
            return res.status(403).json("You can delete only your channel");

        await channel.deleteOne();
        res.status(200).json("Channel deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;