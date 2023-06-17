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
import "./Style/components/main.scss";
import "./Style/global/index.scss";
import "./Style/components/rates.scss";
import "./Style/components/features&services.scss";
import "./Style/components/footer.scss";
import "./Style/components/caroverview.scss";
import "./Pages/Dashboard/Style/Index.scss";

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
