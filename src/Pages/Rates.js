import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import axios from "axios";
import Promise from "../Components/Promise";
import { useDispatch, useSelector } from "react-redux";
import { hideModel, showModel } from "../redux/showModelSlice";

function Rates() {
  const { t, i18n } = useTranslation();
  const [cars, setCars] = useState([]);
  const state = useSelector((state) => state.showModel1.value);
  const dispatch = useDispatch();

  console.log(state);

  // Get All cars
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const data = await axios.get("https://localhost:44316/api/Car");
      if (data.data) setCars(data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("test");
  }, [state]);

  return (
    <section className=" rates">
      <div className="row title-bg f-center">
        <h3>Services Rates</h3>
      </div>
      <div className="container-sm">
        <div className="row">
          {/* <div class="col-4">col-4</div>
          <div class="col-8">col-8</div> */}
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
                  <tr key={car.carId}>
                    <td style={{ backgroundColor: "transparent" }} scope="row">
                      <img src={car.carImg} height="80" />
                      <h5>{car.carNameEn}</h5>
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
                <td className="book" style={{ padding: "21px" }}></td>
                <td className="book" onClick={() => dispatch(showModel())}>
                  {t("book")}
                </td>
                <td className="book" onClick={() => dispatch(showModel())}>
                  {t("book")}
                </td>
                <td className="book" onClick={() => dispatch(showModel())}>
                  {t("book")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
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
