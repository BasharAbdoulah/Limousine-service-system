import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useFetch from "../localHooks/useFetch";

function Header({ handleOpen }) {
  const { t, i18n } = useTranslation();
  const userAgent = navigator.userAgentData;

  // Get Cars
  const {
    data: visitorPostData,
    loading: visitorPostLo,
    error: visitorPostErr,
    excuteFetch: visitorPostExcute,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_ANALYTICS}`,

    "post",
    true
  );

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

  // Saving visitors data for analysis
  const SaveUserAgent = async (visitorId) => {
    if (visitorId != undefined) {
      let id = visitorId.split(" ").join();
      let body = {
        IsMobile: userAgent.mobile,
        Platform: userAgent.platform,
        VisitorId: id,
      };
      visitorPostExcute(false, undefined, body);
    }
  };

  useEffect(() => {
    if (visitorPostErr != null) console.error(visitorPostErr);
  }, [visitorPostErr]);

  // Get the visitor identifier when you need it.
  let count = 0;
  useEffect(() => {
    count++;
    if (count == 1) {
      SaveUserAgent(navigator.userAgent);
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
