import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: { type: String },
    videoUrl: { type: String },
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    category: { type: String },
}, { timestamps: true });

export default mongoose.model("Video", VideoSchema);