import React from 'react';
import Banner from './Banner';
import VideoSlider from './VideoSlider';

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

export default Home;
