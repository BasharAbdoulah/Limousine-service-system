import React from "react";
import { useTranslation } from "react-i18next";

function OurServices() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="row">
        <div className="container services px-4 py-5" id="featured-3">
          <h2 className="pb-2 border-bottom title">{t("services_title")}</h2>
          <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div className="service col">
              <div className=" bg-gradient fs-2 mb-3">
                <i className="bi bi-hospital-fill"></i>
              </div>
              <h3 className="">{t("service3_title")}</h3>
              <p>{t("service3_desc")}</p>
            </div>
            <div className="service col">
              <div className=" bg-gradient fs-2 mb-3">
                <i className="bi bi-car-front-fill"></i>
              </div>
              <h3 className="">{t("service2_title")}</h3>
              <p>{t("service2_desc")}</p>
            </div>
            <div className="service col">
              <div className=" bg-gradient fs-2 mb-3">
                <i className="bi bi-airplane"></i>
              </div>
              <h3 className="">{t("service1_title")}</h3>
              <p>{t("service1_desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurServices;
