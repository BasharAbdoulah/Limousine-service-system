import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Rates from "./Rates";
import CarPreview from "./CarPreview";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BookingModel from "../Components/BookingModel";

function Home() {
  return (
    <div className="App">
      <Header />
      <BookingModel />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/carPreview" element={<CarPreview />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Home;
