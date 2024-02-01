import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Auth from "./components/Auth/Auth";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./components/Home/Home";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/AllRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
