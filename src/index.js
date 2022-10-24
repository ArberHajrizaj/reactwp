import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);