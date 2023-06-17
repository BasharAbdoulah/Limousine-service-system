import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import axios from "axios";
import Promise from "../Components/Promise";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModel,
  selectedTripType,
  showModel,
} from "../redux/showModelSlice";
import useFetch from "../localHooks/useFetch";

function Rates() {
  const { t, i18n } = useTranslation();
  const [cars, setCars] = useState([]);
  const state = useSelector((state) => state.showModel1.value);
  const dispatch = useDispatch();

  // Get Cars
  const {
    data: getCarsData,
    loading: getCarsLoding,
    error: getCarsErr,
    excuteFetch: excuteGetCars,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CAR}`,

    "get",
    true
  );

  // Get All cars
  useEffect(() => {
    window.scrollTo(0, 0);
    excuteGetCars(false);
  }, []);

  useEffect(() => {
    if (getCarsData != null) {
      let carsAfterDecode = decodeUrls(getCarsData);
      setCars(carsAfterDecode);
    } else if (getCarsErr != null) console.error(getCarsErr);
  }, [getCarsData]);

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
    <section className=" rates">
      <div className="row title-bg f-center">
        <h3>Services Rates</h3>
      </div>
      <div className="container">
        {/* <div class="col-4">col-4</div>
          <div class="col-8">col-8</div> */}
        {!getCarsLoding ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <i className="bi bi-car-front"></i>
                </th>
                <th scope="col">{t("per_day")}</th>
                <th scope="col">{t("per_hour")}</th>
                <th scope="col">{t("airport")}</th>
              </tr>
            </thead>

            <tbody>
              {cars?.map((car) => {
                return (
                  <tr key={car.id}>
                    <td
                      style={{ backgroundColor: "transparent" }}
                      scope="column"
                    >
                      <img src={car.carImg} height="80" />
                      <h5>{car.carName}</h5>
                    </td>
                    <td>
                      <span>KD {car.perDay}</span> / {t("day")}
                    </td>
                    <td>
                      {" "}
                      <span>KD {car.perHour}</span> / {t("hour")}
                    </td>
                    <td>
                      {" "}
                      <span>KD {car.airportTransfer}</span> / {t("airport_w")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="book d-table-cell"></td>
                <td
                  className="book"
                  onClick={() => {
                    dispatch(showModel());
                    dispatch(selectedTripType("day"));
                  }}
                >
                  {t("book")}
                </td>
                <td
                  className="book"
                  onClick={() => {
                    dispatch(showModel());
                    dispatch(selectedTripType("hour"));
                  }}
                >
                  {t("book")}
                </td>
                <td
                  className="book"
                  onClick={() => {
                    dispatch(showModel());
                    dispatch(selectedTripType("airport"));
                  }}
                >
                  {t("book")}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="w-100 d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border " role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
      </div>
      <div className="check-rates">
        <h2>{t("other_options")}</h2>
        <p>{t("other_options_desc")}</p>
        <a onClick={() => dispatch(showModel())} className="">
          {t("book")}
        </a>
      </div>
      <Promise />
    </section>
  );
}

export default Rates;
