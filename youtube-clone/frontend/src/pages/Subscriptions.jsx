// pages/Subscriptions.jsx
import React from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { videos } from "../data/sampleVideos.js";

const Subscriptions = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="main-content">
        <h2 style={{ marginBottom: "20px" }}>Subscriptions</h2>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.videoId} className="video-card">
              <img src={video.thumbnailUrl} alt={video.title} />
              <h4>{video.title}</h4>
              <p>{video.channelName}</p>
              <p>{video.views} views</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Subscriptions;