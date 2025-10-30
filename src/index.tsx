import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PhrasesProvider } from "./context/PhrasesContext"; 

const container = document.getElementById("root");
if (!container) {
  throw new Error("No se encontró el elemento #root");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <PhrasesProvider>
      <App />
    </PhrasesProvider>
  </React.StrictMode>
);

reportWebVitals();
