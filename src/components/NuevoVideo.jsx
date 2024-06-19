import React, { useState } from "react";

import Swal from "sweetalert2"; // Importa SweetAlert2

function VideoForm() {
  const [url, setUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");

  const extractYouTubeVideoId = (url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const videoId = extractYouTubeVideoId(url);

    if (!videoId) {
      console.error("URL de video de YouTube no válida");
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    const videoData = {
      url: embedUrl, // Usar la URL de embed en lugar de la URL original
      descripcion,
      categoria,
      titulo,
    };

    fetch(
      "https://raw.githubusercontent.com/jaycode404/api_jayflix/main/db.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Video enviado con éxito:", data);
        // Mostrar Sweet Alert
        Swal.fire({
          icon: "success",
          title: "Enviado Con Éxito",
          text: "El video se ha enviado con éxito.",
        }).then(() => {
          // Redireccionar a la página de inicio después de hacer clic en "OK" en Sweet Alert
          window.location.href = "/"; // Cambia la URL de redirección según tu configuración
        });
      })
      .catch((error) => {
        console.error("Error al enviar el video:", error);
      });
  };

  return (
    <section>
      <h2 style={{textAlign: 'center'}}>Nuevo Video</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="styled-field-text">
            <label>URL de YouTube:</label>
            <input
              type="text"
              value={url}
              // placeholder="https://www.youtube.com/watch?v=rtq2dNEyhCU"
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
          <div
            className="form-control"
            style={{ width: "100%", margin: "1rem 0" }}
          >
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
