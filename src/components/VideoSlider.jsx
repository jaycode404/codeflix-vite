import React, { useState, useEffect, useRef } from "react";
import VideoCard from "./VideoCard";
import Slider from "react-slick";
import "../Slider.css";
import Skeleton from "./Skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { debounce } from "lodash";

export default function VideoSlider({ categoria }) {
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
  const urlVideos =
    "https://raw.githubusercontent.com/jaycode404/api_jayflix/main/db.json";

  const [videos, setVideos] = useState([]);
  const videosCache = useRef({});
  const fetchVideos = useRef(debounce(fetchVideosFromApi, 300)); // Debounce with 300ms delay
  const numVideos = videos.length;
  const lengthAllow = videos.length > 1;
  // Configura slidesToShow para ser 1 si hay 1 video, 2 si hay 2, o máximo 3
  const slidesToShow = numVideos === 1 ? 1 : Math.min(4, numVideos);
  const rtl = Math.floor(Math.random() * 10) < 5 ? true : false;
  var settings = {
    infinite: lengthAllow,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    centerMode: videos.length < 3, // Activar centerMode cuando hay menos de 3 videos
    centerPadding: "50px", // Ajustar el padding central según sea necesario
    variableWidth: videos.length < 3, //
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    rtl: rtl,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetchVideos.current(categoria);
  }, [categoria]);

  function fetchVideosFromApi(categoria) {
    if (videosCache.current[categoria]) {
      setVideos(videosCache.current[categoria]);
    } else {
      fetch(urlVideos)
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.videos)) {
            const filteredVideos = data.videos.filter((video) => {
              return video.categoria === categoria;
            });
            setVideos(filteredVideos);
            videosCache.current[categoria] = filteredVideos;
          } else {
            console.log("los datos no tienen la estructura adecuada", data);
          }
        })
        .catch((err) => {
          console.log("hubo un error:", err);
        });
    }
  }

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
    <div className="slider-container">
      <h2 className="categoria-title">{categoria}</h2>
      <Slider {...settings}>{videoCards}</Slider>
    </div>
  );
}
