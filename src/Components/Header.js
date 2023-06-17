import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Menu from "./Menu";

function Header({ handleOpen }) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const userAgent = navigator.userAgentData;

  const handleChangeLang = () => {
    if (i18n.language == "en") {
      i18n.changeLanguage("ar");
      document.body.style.direction = "rtl";
      localStorage?.setItem("current-lang", "ar");
    } else {
      i18n.changeLanguage("en");
      document.body.style.direction = "ltr";
      localStorage?.setItem("current-lang", "en");
    }
  };

  useEffect(() => {
    let currentLang = localStorage?.getItem("current-lang");
    if (currentLang != null) {
      if (currentLang == "ar") {
        i18n.changeLanguage("ar");
        document.body.style.direction = "rtl";
      } else {
        i18n.changeLanguage("en");
        document.body.style.direction = "ltr";
      }
    }
  }, []);

  // Initialize the agent at application startup.
  const fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then(
    (FingerprintJS) => FingerprintJS.load()
  );

  // Saving visitors data for analysis
  const SaveUserAgent = async (visitorId) => {
    console.log("saveUserAgent has been triggerd", visitorId);
    if (visitorId != undefined) {
      await axios
        .post("https://localhost:44316/api/UserAgent", {
          IsMobile: userAgent.mobile,
          Platform: userAgent.platform,
          VisitorId: visitorId,
        })
        .catch((err) => console.log(err));
    }
  };

  // Get the visitor identifier when you need it.
  let count = 0;
  useEffect(() => {
    count++;
    if (count == 1) {
      fpPromise
        .then((fp) => fp.get())
        .then((result) => {
          // This is the visitor identifier:
          SaveUserAgent(result.visitorId);
        });
    }
  }, []);

  return (
    <header>
      <div className="d-flex  flex-md-row ">
        <h5 className="my-0 mr-md-auto font-weight-normal">
          <Link to={"/"}>
            Company name <p>Primium Limousine Service</p>
          </Link>
        </h5>
        <Link className="to-dashboard " to={"/dashboard"}>
          <a className="btn btn-outline-warning ">Go to dashboard</a>
        </Link>
        <ul className="h-nav">
          <li className="nav-link">
            <a className="p-2 language-icon" onClick={handleChangeLang}>
              {i18n.language == "en" ? "عربي" : "EN"}
              <i class="bi bi-globe"></i>
            </a>
          </li>
          <li className="nav-link">
            <a className="p-2 " href="#features">
              {t("navbar_features")}
            </a>
          </li>
          <li className="nav-link">
            <a className="p-2 " href="#services">
              {t("navbar_services")}
            </a>
          </li>
          <li className="nav-link">
            <Link to={"/"}> {t("navbar_home")}</Link>
          </li>
          <li className="nav-link">
            <Link to={"/rates"}> {t("navbar_pricing")}</Link>
          </li>
        </ul>

        <a className="p-2  lang-for-phones" onClick={handleChangeLang}>
          {i18n.language == "en" ? "عربي" : "EN"}
          <i class="bi bi-globe"></i>
        </a>
        <div className="mobile-burger" onClick={handleOpen}>
          <i class="bi bi-list"></i>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
