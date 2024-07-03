import React from "react";
import VideoCard from "./VideoCard";
import Slider from "react-slick";
import "../Slider.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function VideoSlider({ categoria, videos }) {
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slider-arrow prev-arrow" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slider-arrow next-arrow" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const numVideos = videos.length;
  const lengthAllow = videos.length > 1;
  const slidesToShow = numVideos === 1 ? 1 : Math.min(4, numVideos);
  const rtl = Math.floor(Math.random() * 10) < 5;

  const settings = {
    infinite: lengthAllow,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    centerMode: numVideos > 1 && numVideos < 3,
    centerPadding: numVideos > 1 && numVideos < 3 ? "50px" : "0px",
    variableWidth: numVideos > 1 && numVideos < 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    rtl: rtl,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, numVideos),
          slidesToScroll: 3,
          infinite: lengthAllow,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, numVideos),
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: numVideos > 2 ? 2 : 1,
          slidesToScroll: numVideos > 2 ? 2 : 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: numVideos > 2 ? 2 : 1,
          slidesToScroll: numVideos > 2 ? 2 : 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const videoCards = videos.map((video) => (
    <VideoCard
      width="300px"
      height="230px"
      margin="1rem"
      key={video.id}
      titulo={video.titulo}
      descripcion={video.descripcion}
      url={video.url}
    />
  ));

  return (
    <div className="slider-container container">
      <h2 className="categoria-title">{categoria}</h2>
      <Slider {...settings}>{videoCards}</Slider>
    </div>
  );
}
