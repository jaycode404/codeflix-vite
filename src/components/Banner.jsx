import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

export default function Banner() {
  const urlVideos =
    "https://raw.githubusercontent.com/jaycode404/api_jayflix/main/db.json";

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);


  const videoUrl = videos.length > 0 ? videos[videos.length - 1].url : ''

  const videoId = videos.length > 0 ? videos[videos.length - 1].url.split('/').pop() : ''
  // Construir la URL de la imagen del video (thumbnail)
  const imageUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  useEffect(() => {
    fetch(urlVideos)
      .then((response) => response.json())
      .then((data) => {
        const videoList = data.videos || [];
        setVideos(videoList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de videos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <header className="banner-container">
      <div className="banner-info">
        <h2 className="banner-title">
          El mejor contenido para <span>Coders</span>
        </h2>
      </div>

      <div className="video-container">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="video-card-media">
            <a href={videoUrl}>
              <img
                className="video-card-image"
                src={imageUrl}
                
              />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
