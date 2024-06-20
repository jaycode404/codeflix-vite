// src/components/VideoForm.js

import React, { useState } from "react";
import Swal from "sweetalert2";
import { ref, push, set } from "firebase/database"; // Agrega 'set' para actualizar con un ID personalizado
import { db } from "../helpers/firebase";

function VideoForm() {
  const [url, setUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("FrontEnd");
  const [titulo, setTitulo] = useState("");

  const extractYouTubeVideoId = (url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const generarIdUnico = () => {
    return '_' + Math.random().toString(36).substr(2, 9); // Genera un ID único al estilo Firebase
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const videoId = extractYouTubeVideoId(url);

    if (!videoId) {
      console.error("URL de video de YouTube no válida");
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    const id = generarIdUnico(); // Genera un ID único para el video

    const videoData = {
      id,
      url: embedUrl,
      descripcion,
      categoria,
      titulo,
    };

    const videosRef = ref(db, 'videos/' + id); // Usa el ID como parte del path
    set(videosRef, videoData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Enviado Con Éxito",
          text: "El video se ha enviado con éxito.",
        }).then(() => {
          window.location.href = "/"; // Redirige a la página de inicio después del éxito
        });

        // Limpia los campos del formulario después de enviar
        setUrl("");
        setDescripcion("");
        setCategoria("FrontEnd");
        setTitulo("");
      })
      .catch((error) => {
        console.error("Error al enviar el video:", error);
      });
  };

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Nuevo Video</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="styled-field-text">
            <label>URL de YouTube:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="styled-field-text">
            <label>Descripción:</label>
            <textarea
              rows={5}
              placeholder="Un video genial..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="form-control" style={{ width: "100%", margin: "1rem 0" }}>
            <label>Categoría:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="FrontEnd">FrontEnd</option>
              <option value="BackEnd">BackEnd</option>
              <option value="DevOps">DevOps</option>
              <option value="Diseño">Diseño</option>
              {/* Agrega más opciones de categoría si es necesario */}
            </select>
          </div>
          <div className="styled-field-text">
            <label>Título:</label>
            <input
              type="text"
              placeholder="Aprende git..."
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <button className="button" type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}

export default VideoForm;
