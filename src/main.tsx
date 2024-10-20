import { createRoot } from 'react-dom/client'
import App from "./App";
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App />
      <Analytics />
    </Router>
  </React.StrictMode>
);
