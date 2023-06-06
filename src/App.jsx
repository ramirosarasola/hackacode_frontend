import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/UI/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Layout */}
          {/* <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
          </Route> */}

          {/* Pages */}
          {!isAuthenticated ? (
            <Route exact path="/" element={<Login />} />
          ) : (
            <Route path="/" element={<Layout />}>
              <Route exact path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
            </Route>
          )}
          {/* Not Found */}
          <Route path="*" element={<h1> Pagina no encontrada. </h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
