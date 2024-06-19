import React from 'react';
import VideoCard from './VideoCard';


export default function Seccion() {
  return (
    <div className="seccion-container">
      <h4 className="seccion-title">Categoria</h4>
      <div className="seccion-grid">
        <div className="seccion-item">
          <VideoCard />
        </div>
        <div className="seccion-item">
          <VideoCard />
        </div>
        <div className="seccion-item">
          <VideoCard />
        </div>
        <div className="seccion-item">
          <VideoCard />
        </div>
      </div>
    </div>
  );
}
