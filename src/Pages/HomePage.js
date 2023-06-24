import React, { useEffect, useState } from "react";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import OurFleet from "../Components/OurFleet";
import CallNowPart from "../Components/CallNowPart";
import OurFeatures from "../Components/OurFeatures";
import OurServices from "../Components/OurServices";
import { useTranslation } from "react-i18next";
import Hero from "../Components/Hero";
import Promise from "../Components/Promise";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const { t, i18n } = useTranslation();

  return (
    <main>
      <Hero />

      <div className="container marketing">
        <OurFleet />
      </div>
      <hr className="featurette-divider" />
      <CallNowPart />

      <div className="container marketing" id="features">
        <OurFeatures />
      </div>
      {/* <hr class="featurette-divider" /> */}
      <div className="check-rates">
        <h2 className="" data-aos-duration="1000" data-aos="fade-left">
          {t("checkrates_title")}
        </h2>
        <p>{t("checkrates_text")}</p>
        <Link to={"/rates"} data-aos-duration="1000" data-aos="flip-down">
          {t("checkrates_btn")}
        </Link>
      </div>
      <div className="container marketing" id="services">
        <OurServices />
      </div>
      <Promise position={"home"} />
    </main>
  );
}

export default HomePage;
