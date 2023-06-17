import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Side from "./Side";
import DHomePage from "./DHomePage";
import AddVehicle from "./AddVehicle";
import "../Dashboard/Style/login.scss";
import ClientsRequests from "./ClientsRequests";
import Footer from "../../Components/Footer";
import Login from "./login";
import Cookies from "js-cookie";

function Index() {
  const token = Cookies.get("authToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authentication = (res) => {
    setIsAuthenticated(res);
  };

  useEffect(() => {
    if (token == undefined) {
      setIsAuthenticated(false);
    } else setIsAuthenticated(true);
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <div className="row">
        {!isAuthenticated ? (
          <Login authentication={authentication} />
        ) : (
          <>
            <div className="col-md-3">
              <Side />
            </div>
            <div className="col-9">
              <Routes>
                <Route path="/" exact element={<DHomePage />} />
                <Route path="/addvehicle" element={<AddVehicle />} />
                <Route path="/ClientsRequests" element={<ClientsRequests />} />
              </Routes>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Index;
