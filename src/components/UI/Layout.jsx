import React from "react";
import "../../styles/components/UI/Layout.css";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Home from "../../pages/Home";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <section id="layout">
      <Sidebar />
      <Outlet />
      {/* <Footer /> */}
    </section>
  );
};

export default Layout;
