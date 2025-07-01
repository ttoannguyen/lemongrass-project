import { createRoot } from "react-dom/client";
import "./index.css";
import "react-photo-view/dist/react-photo-view.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
