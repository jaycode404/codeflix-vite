import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Videos from './components/Videos';
import AcercaDe from './components/AcercaDe';
import Navbar from './components/Navbar';
import NuevoVideo from './components/NuevoVideo';
import VideoSlider from './components/VideoSlider';

function App() {
  const urlVideos = "https://raw.githubusercontent.com/jaycode404/api_jayflix/main/db.json";

  // Estado para almacenar la lista de categorías disponibles
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Realizar la solicitud a la URL para obtener los datos
    fetch(urlVideos)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.videos)) {
          // Obtener las categorías únicas de los videos
          const categoriasUnicas = [...new Set(data.videos.map((video) => video.categoria))];
          setCategorias(categoriasUnicas);
        } else {
          console.error("Los datos no tienen la estructura adecuada:", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la lista de categorías:", error);
      });
  }, []);

  return (
    <Router>
      <Navbar className='componente__uno' />
      <Routes>
        <Route path="/" element={<Home categorias={categorias} />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/nuevo-video" element={<NuevoVideo />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
      </Routes>
    </Router>
  );
}

function Home({ categorias }) {
  return (
    <>
      <Banner />
      {categorias.map((categoria) => (
        <VideoSlider key={categoria} categoria={categoria} />
      ))}
    </>
  );
}

export default App;
