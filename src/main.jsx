import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./App/store.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./themes/darkTheme.js";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
