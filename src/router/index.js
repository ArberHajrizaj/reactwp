import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "../pages/index";
import SinglePost from "../pages/single-post";

const Router = () => (

  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/:id" element={<SinglePost />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
