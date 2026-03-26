import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => (
  <Link to={`/video/${video.videoId}`} className="video-card">
    <img src={video.thumbnailUrl} alt={video.title}/>
    <div className="video-info">
      <h3>{video.title}</h3>
      <p>{video.channelName}</p>
      <p>{video.views} views</p>
    </div>
  </Link>
);

export default VideoCard;