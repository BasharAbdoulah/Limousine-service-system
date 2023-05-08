import React from "react";

function Header() {
  return (
    <div className="row">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        aria-label="Ninth navbar example"
      >
        <div className="container-xl">
          <a className="navbar-brand" href="#">
            Container XL
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample07XL"
            aria-controls="navbarsExample07XL"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample07XL">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
            <form role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
