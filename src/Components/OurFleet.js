import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState } from "react";
import "../Style/main.scss";
import FeeltItem from "./FeeltItem";
import { useTranslation } from "react-i18next";
import axios from "axios";

function OurFleet() {
  const { t, i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const [allCars, setAllCars] = useState();
  const [allTypes, setAllTypes] = useState();
  const [loding, setloding] = useState();
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    setloding(true);
    const fetchData = async () => {
      try {
        const data = await getData("https://localhost:44316/api/Car", "");
        if (data.data) {
          setloding(false);
          setAllCars(data.data);
        }
      } catch (error) {
        setloding(false);
        console.error(error);
      }
      try {
        const data = await getData("https://localhost:44316/api/CarTypes", "");
        if (data.data) {
          setAllTypes(data.data);
          setloding(false);
        }
      } catch (error) {
        setloding(false);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const changeType = async (e, type) => {
    setloding(true);
    const navs = Array.from(document.querySelectorAll(".nav-link"));
    navs.map((nav) => {
      nav.classList.remove("active");
    });
    e.target.classList.add("active");
    console.log(type);
    if (type) {
      try {
        const res = await getData("", type);
        setAllCars(res.data);
        setloding(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const data = await getData("https://localhost:44316/api/Car", "");
        if (data.data) {
          setAllCars(data.data);
          setloding(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    // get cars by type
  };

  const getData = async (url, type) => {
    if (type) {
      const res = await axios.get(
        `https://localhost:44316/api/Car/CarsByType/${type}`
      );
      if (res.data) return res;
    } else {
      try {
        const res = await axios.get(url);
        if (res.data) return res;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="row">
      <h2 className="head-title title">{t("feelt_title")}</h2>
      <div className="car-types justify-content-center d-flex">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              onClick={(e) => changeType(e, "")}
              className="nav-link active"
              aria-current="page"
            >
              {t("all")}
            </a>
          </li>
          {allTypes?.map((type) => {
            return (
              <li key={type.carTypeId} className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  onClick={(e) => changeType(e, type.carTypeId)}
                >
                  {i18n.language == "ar" ? type?.carTypeAr : type?.carTypeEn}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {loding ? (
        <div className="row lodaing-container">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : allCars?.length > 0 ? (
        <Carousel interval={50000} activeIndex={index} onSelect={handleSelect}>
          {allCars?.map((car) => {
            return (
              <Carousel.Item key={car.carId}>
                <FeeltItem car={car} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <div className="no-cars f-center">
          <h4>No Cars!!</h4>
        </div>
      )}
    </div>
  );
}

export default OurFleet;
