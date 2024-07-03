import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import VideoCard from "./VideoCard";
import { keyBy } from "lodash";

function Videos({ categoria, videos }) {
  const handleDeleteVideo = (videoID) => {
    // Aquí puedes agregar la lógica para eliminar un video si tu API lo admite
    // Por ejemplo:
    // fetch(`https://api-tu-servidor.com/videos/${videoId}`, {
    //   method: 'DELETE',
    // })
    // .then(() => {
    //   setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
    // })
    // .catch((error) => {
    //   console.error('Error al eliminar el video:', error);
    // });
    Swal.fire({
      title: "Eliminar video",
      text: "¿Estás seguro de que deseas eliminar este video?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica de eliminación real, como el fetch de arriba
        // y actualizar el estado después de eliminar el video
        console.log(`Eliminar video con ID ${videoID}`);
      }
    });
  };

  return (
    <section className="container">
      <h2>Todos los Videos</h2>

      <div className="videos-container">
        {videos.map(({ id, titulo, descripcion, url, categoria }) => (
          <VideoCard
            key={id} // Asegúrate de usar key prop en elementos de lista
            id={id}
            titulo={titulo}
            descripcion={descripcion}
            url={url}
            categoria={categoria}
          />
        ))}
      </div>
    </section>
  );
}

export default Videos;
