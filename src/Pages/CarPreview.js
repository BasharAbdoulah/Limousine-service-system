import React, { useEffect, useState } from "react";
import previewImg from "../images/Cadillac-CT6-EU-spec-2016-2560x1600-001.jpg";
import axios from "axios";
import { showModel } from "../redux/showModelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function CarPreview() {
  const [carDeatils, setCarDetails] = useState();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const state = useSelector((state) => state.showModel.selectedCar?.payload);

  //
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get("https://localhost:44316/api/Car/7");

  //     if (res.status == 200) {
  //       setCarDetails(res.data);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <section>
      <div className="row title-bg f-center">
        <h3>Services Rates</h3>
      </div>
      <div className="container">
        <div className="row preview">
          <div className="col-8 preview-column">
            <div className="preview-img-container">
              <img
                alt="img-preview"
                src={state?.carImg}
                width="90%"
                height="300px"
              />
            </div>
            <div className="preview-caption">
              <h3>{t("car_preview")}</h3>
              <p>
                {" "}
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                fermentum massa justo sit amet risus. Donec id elit non mi porta
                gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                tortor mauris condimentum nibh, ut fermentum massa justo sit
                amet risus.
              </p>
            </div>
            <h3>{t("car_service_title")}</h3>
            <div className="car-features">
              <ul>
                <li>
                  <i class="bi bi-cursor-fill"></i> {t("car_service1")}
                </li>
                <li>
                  <i class="bi bi-cursor-fill"></i> {t("car_service2")}
                </li>
                <li>
                  <i class="bi bi-cursor-fill"></i> {t("car_service3")}
                </li>
                <li>
                  <i class="bi bi-cursor-fill"></i> {t("car_service4")}
                </li>
                <li>
                  <i class="bi bi-cursor-fill"></i> {t("car_service5")}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-4 pricing-column">
            <div className="img-container">
              <img alt="" width="100%" height="200px" src={previewImg} />
            </div>
            <h3>{state?.carNameEn}</h3>
            <div className="ratings">
              <div className="rating">
                <i class="bi bi-calendar3-event"></i>
                <div className="caption">
                  <p>{t("per_day")}</p>
                  <div className="price">
                    <strong>${state?.perHour}</strong>/ <p>{t("hour")}</p>
                  </div>
                </div>
              </div>
              <div className="rating">
                <i class="bi bi-stopwatch"></i>
                <div className="caption">
                  <p>{t("per_hour")}</p>
                  <div className="price">
                    <strong>${state?.perDay}</strong>/ <p>{t("day")}</p>
                  </div>
                </div>
              </div>
              <div className="rating">
                <i class="bi bi-airplane"></i>
                <div className="caption">
                  <p>{t("airport")}</p>
                  <div className="price">
                    <strong>${state?.airportTransfer}</strong>/{" "}
                    <p>{t("airport_w")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="features-table">
              <div className="item">
                <i class="bi bi-car-front-fill"></i>
                <p> {t("car_feature1")}</p>
              </div>
              <div className="item">
                <i class="bi bi-car-front-fill"></i>
                <p>{t("car_feature2")}</p>
              </div>
              <div className="item">
                <i class="bi bi-car-front-fill"></i>
                <p>{t("car_feature3")}</p>
              </div>
              <div className="item">
                <i class="bi bi-car-front-fill"></i>
                <p>{t("car_feature4")}</p>
              </div>
              <div className="item">
                <a className="book" onClick={() => dispatch(showModel())}>
                  {t("book")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarPreview;
