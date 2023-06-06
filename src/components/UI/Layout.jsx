import React from 'react'
import '../../styles/components/UI/Layout.css';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <section id='layout'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </section>
  )
}

export default Layout