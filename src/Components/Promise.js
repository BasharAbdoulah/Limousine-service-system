import React from "react";
import { useTranslation } from "react-i18next";

function Promise({ position, showModel }) {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`row second-bg p-5 f-center ${position == "home" && "home"}`}
    >
      <div className="col-8">
        <h3>{t("promise_title")}</h3>
        <p>{t("promise")}</p>
        <button onClick={showModel} className="btn btn-outline-info">
          {t("book")}
        </button>
      </div>
    </div>
  );
}

export default Promise;
