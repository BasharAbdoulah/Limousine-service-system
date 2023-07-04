import React from "react";
import { useTranslation } from "react-i18next";

function OurFeatures() {
  const { t, i18n } = useTranslation();
  return (
    <div className="row">
      <div className=" features" id="featured-3">
        <h2
          data-aos-duration="1500"
          data-aos="fade-left"
          className="pb-2 border-bottom  title"
        >
          {t("articles_title")}
        </h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div
            className="feature col"
            data-aos-duration="1500"
            data-aos="fade-right"
          >
            <h3 className="animate__animated animate__fadeIn">
              {t("feature1_title")}
            </h3>
            <p>{t("article1")}</p>
          </div>
          <div
            className="feature col"
            data-aos="flip-left"
            data-aos-duration="1500"
          >
            <h3>{t("feature2_title")}</h3>
            <p>{t("article2")}</p>
          </div>
          <div
            className="feature col"
            data-aos-duration="1500"
            data-aos="fade-left"
          >
            <h3>{t("feature3_title")}</h3>
            <p>{t("article3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurFeatures;
