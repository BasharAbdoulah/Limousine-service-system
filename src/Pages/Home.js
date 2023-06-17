import React, { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Rates from "./Rates";
import CarPreview from "./CarPreview";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BookingModel from "../Components/BookingModel";
import Menu from "../Components/Menu";
import "../Style/components/menu.scss";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
    console.log("toggle");
  };
  return (
    <>
      <Header handleOpen={handleOpen} />
      <Menu handleOpen={handleOpen} isOpen={isOpen} />
      <BookingModel />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/carPreview" element={<CarPreview />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Home;
