import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard/Index";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Routes,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import "./Style/main.scss";
import "./Style/rates.scss";
import "./Style/features&services.scss";
import "./Style/footer.scss";
import "./Style/caroverview.scss";
import "./Pages/Dashboard/Style/Index.scss";
import Rates from "./Pages/Rates";
import BookingModel from "./Components/BookingModel";
import CarPreview from "./Pages/CarPreview";

function App() {
  return (
    <Router>
      <div className="App">
        <>
          <Routes>
            <Route path="/*" exact element={<Home />} />
            <Route path="/Dashboard/*" exact element={<Dashboard />} />
          </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
