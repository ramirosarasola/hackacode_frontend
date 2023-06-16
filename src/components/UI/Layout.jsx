import React from "react";
import "../../styles/components/UI/Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <section id="layout">
      <Sidebar />
      <Outlet />
    </section>
  );
};

export default Layout;
