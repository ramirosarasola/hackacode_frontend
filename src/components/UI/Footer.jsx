import React from 'react'
import '../../styles/components/UI/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; {currentYear} CodeandoComoLocos. Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer