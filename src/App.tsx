import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./pages/Details";
import HomePage from "./pages/Home";

const Application: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="details" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
