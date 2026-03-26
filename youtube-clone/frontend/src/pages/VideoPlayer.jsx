import React from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Video Player: {id}</h1>
      <div style={{background:'#000', height:'300px', margin:'20px 0'}}></div>
      <p>Description goes here...</p>
    </div>
  );
};

export default VideoPlayer;