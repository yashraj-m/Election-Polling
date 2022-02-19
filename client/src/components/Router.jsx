import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { SinglePage } from "./SinglePage";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/?pollingstations=" element={<HomePage />}></Route>
        <Route path="/:id" element={<SinglePage />}></Route>
      </Routes>
    </div>
  );
};
