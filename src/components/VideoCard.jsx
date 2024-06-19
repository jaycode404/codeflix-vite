import React from "react";
import { extractYouTubeVideoId } from "../helpers/utils";

function VideoCard({ id, titulo, descripcion, url, categoria }) {
  const videoId = url.split("/").pop(); // Obtiene el último segmento de la URL

  // Construir la URL de la imagen del video (thumbnail)
  const imageUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <div className="video-card">
      {/* Imagen o video de portada */}
      <div className="video-card-media">
        <a href={url}>
          <img className="video-card-image" src={imageUrl} alt={titulo} />
        </a>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="video-card-content">
        <h6 className="video-card-title">{titulo}</h6>
        <p className="video-desc">{descripcion}</p>
        
      </div>
    </div>
  );
}

export default VideoCard;
