import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import "./index.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  // Should never happen with the shipped index.html, but avoids a silent
  // blank page if it's ever missing or renamed.
  document.body.innerHTML =
    '<p style="font-family:system-ui,sans-serif;padding:2rem;">Could not find #root in index.html.</p>';
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
