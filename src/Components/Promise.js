import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showModel } from "../redux/showModelSlice";

function Promise({ position }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div
      className={`row second-bg p-5 f-center ${position == "home" && "home"}`}
    >
      <div
        className="col-8 "
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-duration="1000"
      >
        <h3>{t("promise_title")}</h3>
        <p>{t("promise")}</p>
        <button
          onClick={() => dispatch(showModel())}
          className="btn btn-outline-info"
        >
          {t("book")}
        </button>
      </div>
    </div>
  );
}

export default Promise;
