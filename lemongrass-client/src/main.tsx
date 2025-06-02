import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
// import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        {/* <Theme> */}
        <App />
        {/* </Theme> */}
      </ThemeProvider>
    </Suspense>
  </BrowserRouter>
);
