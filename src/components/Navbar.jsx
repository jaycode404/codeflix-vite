import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navlist = ["Videos", "Nuevo Video", "Acerca De"];

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
        {navlist.map((link, index) => {
          return (
            <Link key={index} to={transformLink(link)} className="nav-button">
              {link}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
