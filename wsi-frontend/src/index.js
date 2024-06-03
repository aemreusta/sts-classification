import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { ThemeProvider, createTheme } from "@mui/material";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Example primary color
    },
    secondary: {
      main: "#ff4081", // Example secondary color
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
