import React from "react";

function Footer() {
  return (
    <footer className="">
      <div className="container">
        <div className="row row row-cols-1 justify-content-around row-cols-sm-2 row-cols-md-5 py-5">
          <div className="col mb-3">
            <h5>About Us</h5>
            <p className="">
              A lemousine service company provide soo comfortable transforms A
              lemousine service company provide soo comfortable transforms
            </p>
            <h5>Company name</h5>
          </div>

          <div className="col mb-3">
            <h5>CONTACT INFO</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <p> - 06578324774</p>
                <i className="bi bi-telephone-outbound"></i>
              </li>
              <li className="nav-item mb-2">
                <p> - 4634576934</p>
                <i className="bi bi-whatsapp"></i>
              </li>
              <li className="nav-item mb-2">
                <p>company@gmail.com</p>
                <i className="bi bi-envelope-at-fill"></i>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <h5>LOCATIONs</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <i className="bi bi-geo-alt"></i>
                <p>
                  Crowne Plaza Kuwait al Thuraya City, an IHG Hotel, Airport Rd,
                  Kuwait City 81006
                </p>
              </li>
              <li className="nav-item mb-2">
                <i className="bi bi-geo-alt"></i>
                <p>
                  Crowne Plaza Kuwait al Thuraya City, an IHG Hotel, Airport Rd,
                  Kuwait City 81006
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
