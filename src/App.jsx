// src/App.jsx

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Banner from "./components/Banner";
import Videos from "./components/Videos";
import AcercaDe from "./components/AcercaDe";
import Navbar from "./components/Navbar";
import { NavList } from "./components/Navbar";
import NuevoVideo from "./components/NuevoVideo";
import VideoSlider from "./components/VideoSlider";
import Login from "./components/Login";
import { obtenerVideos } from "./helpers/functions";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Footer from "./components/Footer";

function App() {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    obtenerVideos().then((data) => {
      setVideos(data);
      const categoriasUnicas = [
        ...new Set(data.map((video) => video.categoria)),
      ];
      setCategorias(categoriasUnicas);
    });

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="container">
      <Router>
        <Navbar
          user={user}
          handleLogout={handleLogout}
          className="componente__uno"
        />
        <Routes>
          <Route
            path="/"
            element={<Home categorias={categorias} videos={videos} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/videos" element={<Videos videos={videos} />} />
          <Route
            path="/nuevo-video"
            element={user ? <NuevoVideo /> : <Navigate to="/login" />}
          />
          <Route path="/acerca-de" element={<AcercaDe />} />
        </Routes>
      </Router>
    </div>
  );
}

function Home({ categorias, videos }) {
  return (
    <div className="">
      <Banner />
      {categorias.map((categoria) => (
        <VideoSlider
          key={categoria}
          categoria={categoria}
          videos={videos.filter((video) => video.categoria === categoria)}
        />
      ))}
    </div>
  );
}

export default App;
