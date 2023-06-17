import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Side() {
  const handleChange = (e) => {
    var navs = Array.from(document.querySelectorAll(".nav-link.side"));
    console.log(navs);
    navs.map((nav) => {
      nav.classList.remove("active");
    });

    e.target.classList.add("active");
  };
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-light"
      style={{ width: "300px", height: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <i className="bi bi-speedometer"></i>
      </a>
      <hr />
      <nav>
        <ul className="nav nav-pills flex-column ">
          <li className="nav-item side" onClick={handleChange}>
            <Link className="nav-link side active" to={"/Dashboard/"}>
              الرئيسية
            </Link>
          </li>
          <li className="nav-item side" onClick={handleChange}>
            <Link className="nav-link side" to={"/Dashboard/addvehicle"}>
              أضافة مركبة
            </Link>
          </li>
          <li className="nav-item side" onClick={handleChange}>
            <Link className="nav-link side" to={"/Dashboard/ClientsRequests"}>
              طلبات العملاء
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  );
}

export default Side;
