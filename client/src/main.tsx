import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
  <ThemeProvider>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </BrowserRouter>
  </ThemeProvider>
</QueryClientProvider>
  </React.StrictMode>
);