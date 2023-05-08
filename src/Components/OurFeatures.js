import React from "react";
import { useTranslation } from "react-i18next";

function OurFeatures() {
  const { t, i18n } = useTranslation();
  return (
    <div className="row">
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom  title">{t("articles_title")}</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <h3>{t("feature1_title")}</h3>
            <p>{t("article1")}</p>
          </div>
          <div className="feature col">
            <h3>{t("feature2_title")}</h3>
            <p>{t("article2")}</p>
          </div>
          <div className="feature col">
            <h3>{t("feature3_title")}</h3>
            <p>{t("article3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurFeatures;
