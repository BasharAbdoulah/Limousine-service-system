import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { showModel, hideModel } from "../redux/showModelSlice";
function CallNowPart() {
  const { t, i18n } = useTranslation();
  const [windowSizes, setWindowSizes] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const dispatch = useDispatch();
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSizes([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  });

  return (
    <div className="bg-callnow text-secondary px-4 py-5 text-center">
      <video
        src="https://a6e8z9v6.stackpathcdn.com/limoking/yellow/wp-content/uploads/2015/12/service-video-bg.mp4"
        width={`${windowSizes[0] + 30}px`}
        height={`${windowSizes[0] / 2 + 130}px`}
        muted
        autoPlay={true}
        className="bg-video"
        loop
      ></video>
      <div className="py-5 callnow-caption">
        <h1
          data-aos="fade-right"
          data-aos-duration="1000"
          className="display-5 fw-bold text-white"
        >
          {t("call_text")}
        </h1>
        <div className="col-lg-6 f-center mx-auto">
          <h3
            className="fs-5 mb-4"
            data-aos="flip-left"
            data-aos-duration="1000"
          >
            {t("call_title")}
          </h3>
          <p className="line-around">OR</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              onClick={() => dispatch(showModel())}
              type="button"
              className="btn  btn-m px-4 me-sm-3 fw-bold"
            >
              {t("call_btn_text")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallNowPart;
