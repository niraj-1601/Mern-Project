import Video from "../models/Video.js";

// Create new video
export const createVideo = async (req, res) => {
  try {
    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.body.videoUrl,
      thumbnailUrl: req.body.thumbnailUrl,
      uploader: req.user.id,
      channelId: req.body.channelId,
    });

    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get single video
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update video
export const updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("Video deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};