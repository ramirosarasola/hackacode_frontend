import React from 'react'
import '../../styles/components/UI/Layout.css';

const Layout = ({children}) => {
  return (
    <section id='layout'>
      {children}
    </section>
  )
}

export default Layout