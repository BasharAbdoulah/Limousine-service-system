import React, { useEffect, useState } from "react";
import "../Dashboard/Style/login.scss";
import Cookies from "js-cookie";
import axios from "axios";
import useFetch from "../../localHooks/useFetch";

// Save the token in a cookie
// Cookies.set('authToken', authToken, { secure: true, expires: 7, sameSite: 'strict' });

function Login({ authentication }) {
  const [loginMessage, setLoginMessage] = useState();
  const [loading, setLoading] = useState(false);

  // Get Cars
  const {
    data: loginData,
    loading: loginLoading,
    error: loginErr,
    excuteFetch: loginExcute,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_LOGIN}`,

    "post",
    false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let payload = {
      Email: e.target.email.value,
      Password: e.target.password.value,
    };
    loginExcute(false, undefined, payload);
  };

  useEffect(() => {
    console.log(loginErr);
    if (loginData != null) {
      authentication(true);
      Cookies.set("authToken", loginData.accessToken, {
        secure: true,
        expires: 1,
        sameSite: "strict",
      });
    } else if (loginErr?.status === false) setLoginMessage(loginErr.message);
  }, [loginData, loginErr]);

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="p-4">
          <h3 className="text-lg-center">أدارة الموقع</h3>
        </div>
        <div className="row hints-c justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="wrap">
              <div className="login-wrap p-4 p-md-5">
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className="mb-4">
                      تسجيل الدخول{" "}
                      <p style={{ fontSize: "12px", marginTop: "5px" }}>
                        (الادمن فقط)
                      </p>
                    </h3>
                  </div>
                  <div className="w-100">
                    <p className="social-media d-flex justify-content-end">
                      <a
                        href="#"
                        className="social-icon d-flex align-items-center justify-content-center"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href="#"
                        className="social-icon d-flex align-items-center justify-content-center"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="signin-form">
                  <div className="form-group mt-3">
                    <input
                      id="email"
                      type="text"
                      className="form-control"
                      required
                    />
                    <label className="form-control-placeholder" for="email">
                      الأيميل
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      required
                    />
                    <label className="form-control-placeholder" for="password">
                      كلمة السر
                    </label>
                    <span
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control  btn-primary rounded submit px-3"
                    >
                      {loginLoading ? (
                        <div
                          className="spinner-border text-warning"
                          role="status"
                        ></div>
                      ) : (
                        "تسجيل دخول"
                      )}
                    </button>
                  </div>
                  {loginMessage != null ? (
                    <div className="alert alert-danger" role="alert">
                      {loginMessage}
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="hints">
            <p>For Test:</p>
            <p className="hint">Email: admin@gmail.com</p>
            <p className="hint">Password: 12345</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
