import React from "react";
import "../../styles/components/UI/Layout.css";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Home from "../../pages/Home";

const Layout = () => {
  return (
    <section id="layout">
      <Sidebar />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Layout;
