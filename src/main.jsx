import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createContext } from "react";
const myApiKey = createContext();
const myApiKeyValue = "e06c0563fdab2406334eb466a67a6eb4";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <myApiKey.Provider value={myApiKeyValue}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </myApiKey.Provider>
  </React.StrictMode>
);
