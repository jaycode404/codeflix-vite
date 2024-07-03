import React from "react";
import Navbar, { NavList } from "./Navbar";

export default function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <h3>CodeFlix</h3>
        <NavList />
        <p className="firma">Diseñado y programado por Jcode</p>
      </div>
    </footer>
  );
}
