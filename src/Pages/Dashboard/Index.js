import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Side from "./Side";
import DHomePage from "./DHomePage";
import AddVehicle from "./AddVehicle";
import ClientsRequests from "./ClientsRequests";

function Index() {
  return (
    <div className="dashboard">
      <Header />
      <div className="row">
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
      </div>
    </div>
  );
}

export default Index;
