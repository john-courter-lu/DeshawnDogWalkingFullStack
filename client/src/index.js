import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/Home";
import { DogDetail } from "./components/DogDetail.js";
import { AddADog } from "./components/AddADog.js";
import { CityList } from "./components/CityList.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="dogs" element={<Home />} />
        <Route path="dogs/:dogId" element={<DogDetail />} />
        <Route path="add-a-dog" element={<AddADog />} />
        <Route path="cities" element={<CityList />} />
        
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
