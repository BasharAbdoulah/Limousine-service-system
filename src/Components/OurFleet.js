import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState } from "react";
import FeeltItem from "./FeeltItem";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useFetch from "../localHooks/useFetch";

function OurFleet() {
  const { t, i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const [allCars, setAllCars] = useState();
  const [allTypes, setAllTypes] = useState();
  const [loding, setloding] = useState();
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Get Cars
  const {
    data: carsData,
    loading: carsLoding,
    error: carsErr,
    excuteFetch: excuteGetCars,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CAR}`,

    "get",
    true
  );

  // Get Cars types
  const {
    data: carsTypesData,
    loading: carsTypesLoading,
    error: carsTypesErr,
    excuteFetch: excuteCarsTypes,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CARTYPE}`,
    "get",
    true
  );

  // Get Cars by types
  let cType;
  const {
    data: carsByTypeData,
    loading: carsByTypeLoading,
    error: carsByTypeErr,
    excuteFetch: excuteGetCarsByType,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CARBYTYPE}`,
    "get",
    true
  );

  useEffect(() => {
    excuteGetCars(false);
    excuteCarsTypes(false);
  }, []);

  useEffect(() => {
    if (carsData != null) {
      let carsAfterDecode = decodeUrls(carsData);
      setAllCars(carsAfterDecode);
    } else if (carsErr != null) console.log(carsErr);
    setloding(carsLoding);
  }, [carsData]);

  useEffect(() => {
    if (carsTypesData != null) setAllTypes(carsTypesData);
    if (carsTypesErr !== null) console.error(carsTypesData);
  }, [carsTypesData]);

  useEffect(() => {
    if (carsByTypeData != null) {
      let carsAfterDecode = decodeUrls(carsByTypeData);
      console.log(carsAfterDecode);
      setAllCars(carsAfterDecode);
    } else if (carsTypesErr != null) console.error(carsByTypeErr);

    setloding(carsByTypeLoading);
  }, [carsByTypeData]);

  const changeType = async (e, type) => {
    setloding(true);
    const navs = Array.from(document.querySelectorAll(".nav-link"));
    navs.map((nav) => {
      nav.classList.remove("active");
    });
    e.target.classList.add("active");

    if (type) {
      try {
        // const res = await getData("", type);
        excuteGetCarsByType(false, `/${type}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        excuteGetCars(false, undefined);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const decodeUrls = (list) => {
    let carsAfterDecode = [];
    list.map((car) => {
      let decodedMainImgUrl = decodeURIComponent(car.carImg);
      let decodedSubImgUrl = decodeURIComponent(car.carSubImg);
      car.carImg = decodedMainImgUrl;
      car.carSubImg = decodedSubImgUrl;
      carsAfterDecode?.push(car);
    });
    return carsAfterDecode;
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
              <li key={type.id} className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  onClick={(e) => changeType(e, type.id)}
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
              <Carousel.Item key={car.id}>
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
