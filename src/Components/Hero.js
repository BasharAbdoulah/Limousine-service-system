import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import cadilac from "../images/Cadillac-CT6-EU-spec-2016-2560x1600-001.jpg";

function Hero() {
  const [index, setIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const [windowSizes, setWindowSizes] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSizes([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  });
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1589148938909-4d241c91ee52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      caption: "Caption",
      description: "Description Here",
    },
    {
      image: "../../public/2020-impala-2lz-gpj-colorizer.jpg",
      caption: "Caption",
      description: "Description Here",
    },
    {
      image:
        "https://images.unsplash.com/photo-1589148938909-4d241c91ee52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      caption: "Caption",
      description: "Description Here",
    },
  ];
  return (
    <>
      <div className="liener f-center">
        <p>{t("hero_text")}</p>
        <p className="line-around">
          <i className="bi bi-geo-alt"></i>
        </p>
        <h3>{t("hero_title")}</h3>
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {data.map((slide, i) => {
          return (
            <Carousel.Item key={i}>
              <img
                className="d-block  hero-img"
                src={cadilac}
                alt="slider image"
                width={`${windowSizes[0] + 30}px`}
                height={`${windowSizes[0] / 2 - 100}px`}
              />
              <Carousel.Caption>
                <h3>{slide.caption}</h3>
                <p>{slide.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}

export default Hero;
