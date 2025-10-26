import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
//import { ProductProvider } from "./contexts/ProductContext";
import CssBaseline from "@mui/material/CssBaseline";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <App />
        <CssBaseline />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
