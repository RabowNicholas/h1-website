import React, { CSSProperties } from "react";

interface VideoGridProps {
  videos: string[];
  style?: CSSProperties;
}

const VideoGrid = ({ videos, style }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full" style={style}>
      {videos.map((video, index) => (
        <div key={index} className="w-full h-full">
          <video className="w-full h-full" autoPlay loop muted playsInline>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
