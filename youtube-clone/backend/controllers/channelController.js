import Channel from "../models/Channel.js";

// Create new channel
export const createChannel = async (req, res) => {
  try {
    const newChannel = new Channel({
      channelName: req.body.channelName,
      owner: req.user.id,
      description: req.body.description,
      channelBanner: req.body.channelBanner,
    });

    const savedChannel = await newChannel.save();
    res.status(200).json(savedChannel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get channel by ID
export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate("videos");
    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json(err);
  }
};