import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Videos from './components/Videos';
import AcercaDe from './components/AcercaDe';
import Navbar from './components/Navbar';
import NuevoVideo from './components/NuevoVideo';
import VideoSlider from './components/VideoSlider';
import { obtenerVideos } from './helpers/functions';

function App() {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    obtenerVideos().then(data => {
      setVideos(data);
      const categoriasUnicas = [...new Set(data.map((video) => video.categoria))];
      setCategorias(categoriasUnicas);
    });
  }, []);

  return (
    <Router>
      <Navbar className='componente__uno' />
      <Routes>
        <Route path="/" element={<Home categorias={categorias} videos={videos} />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/nuevo-video" element={<NuevoVideo />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
      </Routes>
    </Router>
  );
}

function Home({ categorias, videos }) {
  return (
    <>
      <Banner />
      {categorias.map((categoria) => (
        <VideoSlider key={categoria} categoria={categoria} videos={videos.filter(video => video.categoria === categoria)} />
      ))}
    </>
  );
}

export default App;
