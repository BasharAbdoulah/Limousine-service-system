import React from "react";
import "../Style/components/menu.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Menu({ isOpen, handleOpen }) {
  const burger = document.querySelector(".burger");
  const navbar = document.querySelector(".navbar");
  const navLink = document.querySelectorAll(".nav-link");
  const { t, i18n } = useTranslation();

  const handleChangeLang = () => {
    handleOpen();
    if (i18n.language == "en") {
      i18n.changeLanguage("ar");
      document.body.style.direction = "rtl";
    } else {
      i18n.changeLanguage("en");
      document.body.style.direction = "ltr";
    }
  };

  // <nav class={`burger-navbar ${isOpen && "open"}`}>
  //   <ul class="nav-links">
  //     <li class="nav-link ">
  return (
    <>
      <nav className={`burger-navbar  my-md-0 mr-md-3 ${isOpen ? "open" : ""}`}>
        <div className="close-icon" onClick={handleOpen}>
          <i class="bi bi-x-lg"></i>
        </div>
        <ul className="nav-links">
          <li className="nav-link">
            <a className="p-2 language-icon" onClick={handleChangeLang}>
              {i18n.language == "en" ? "عربي" : "EN"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-translate"
                viewBox="0 0 16 16"
              >
                <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
              </svg>
            </a>
          </li>
          <li className="nav-link">
            <a onClick={handleOpen} className="p-2 " href="#features">
              {t("navbar_features")}
            </a>
          </li>
          <li className="nav-link">
            <a onClick={handleOpen} className="p-2 " href="#services">
              {t("navbar_services")}
            </a>
          </li>
          <li className="nav-link">
            <Link onClick={handleOpen} to={"/"}>
              {" "}
              {t("navbar_home")}
            </Link>
          </li>
          <li className="nav-link">
            <Link onClick={handleOpen} to={"/rates"}>
              {" "}
              {t("navbar_pricing")}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Menu;
