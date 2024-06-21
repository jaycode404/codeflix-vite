import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, handleLogout }) {
  const navlist = ["Videos", "Acerca De"];

  // Función para transformar el título del enlace
  const transformLink = (link) => {
    return link.toLowerCase().split(' ').join('-');
  };

  return (
    <nav className="nav-bar">
      <Link to="/" className="title">
        CODEFLIX
      </Link>
      
      <div className="nav-list">
        {navlist.map((link, index) => (
          <Link key={index} to={transformLink(link)} className="nav-button">
            {link}
          </Link>
        ))}
        {user ? (
          <>
            <Link to="/nuevo-video" className="nav-button">Nuevo Video</Link>
            <button onClick={handleLogout} className="nav-button">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" className="nav-button">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
