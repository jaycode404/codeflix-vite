import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

export default function Banner() {
  const videoUrl = "https://www.youtube.com/watch?v=TlJbu0BMLaY&t=3s";

  const videoIdMatch = videoUrl.match(/v=([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  
  
    const imageUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  
  return (
    <header className="banner-container">
      <div className="banner-info">
        <h2 className="banner-title">
          El mejor contenido para <span>Coders</span>
        </h2>
      </div>

      <div className="video-container">
        <div className="video-card-media">
          <a href={videoUrl}>
            <img className="video-card-image" src={imageUrl} />
          </a>
        </div>
      </div>
    </header>
  );
}
