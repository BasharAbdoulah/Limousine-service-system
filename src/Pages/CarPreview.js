import React, { useEffect, useState } from "react";
import { selectCar } from "../redux/showModelSlice";

import { showModel } from "../redux/showModelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function CarPreview() {
  const [carDeatils, setCarDetails] = useState();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const payload = useSelector(
    (state) => state.showModel1?.selectedCar?.payload
  );
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <section>
      <div className="row title-bg f-center">
        <h3>Car Preview</h3>
      </div>
      <div className="container">
        <div className="row preview">
          <div className="col-8 preview-column">
            <div className="preview-img-container">
              <img
                alt="img-preview"
                className="img-preview"
                src={payload?.carImg}
                width=""
                // height="400px"
              />
            </div>
            <div className="preview-caption">
              <h3>{t("car_preview")}</h3>
              <p>{payload?.Preview}</p>
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
              <img alt="" height="200px" src={payload?.carSubImg} />
            </div>
            <h3>{payload?.carNameEn}</h3>
            <div className="ratings">
              <div className="rating">
                <i class="bi bi-calendar3-event"></i>
                <div className="caption">
                  <p>{t("per_day")}</p>
                  <div className="price">
                    <strong>${payload?.perHour}</strong>/ <p>{t("hour")}</p>
                  </div>
                </div>
              </div>
              <div className="rating">
                <i class="bi bi-stopwatch"></i>
                <div className="caption">
                  <p>{t("per_hour")}</p>
                  <div className="price">
                    <strong>${payload?.perDay}</strong>/ <p>{t("day")}</p>
                  </div>
                </div>
              </div>
              <div className="rating">
                <i class="bi bi-airplane"></i>
                <div className="caption">
                  <p>{t("airport")}</p>
                  <div className="price">
                    <strong>${payload?.airportTransfer}</strong>/{" "}
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
              <div
                className="item"
                onClick={() => {
                  dispatch(showModel());
                }}
              >
                <a className="book">{t("book")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarPreview;
