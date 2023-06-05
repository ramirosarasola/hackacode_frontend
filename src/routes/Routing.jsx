import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";
import Register from "../pages/Register";
import Layout from "../components/UI/Layout";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </Layout>
        <Footer/>

      </BrowserRouter>
    </>
  );
};

export default Routing;
