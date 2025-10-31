import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PhrasesProvider } from "./context/PhrasesContext";
import "./i18n";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { FiltersProvider } from "./context/FiltersContext";

const container = document.getElementById("root");
if (!container) {
  throw new Error("No se encontró el elemento #root");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FiltersProvider>
        <PhrasesProvider>
          <App />
        </PhrasesProvider>
      </FiltersProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
