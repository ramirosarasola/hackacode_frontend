import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { logo } from '../../assets';
import { Link, Navigate } from 'react-router-dom';
import { FiLogOut, FiUserPlus, FiSettings, FiMenu } from 'react-icons/fi';
import '../../styles/components/UI/Navbar.css';
import { uiActions } from '../../slices/uiSlice';

const Navbar = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log('Deslogueando');
    dispatch(logout());
    return <Navigate to='/'/>
  };



  const toggleMenu = () => {
    dispatch(uiActions.toggle());
  };

  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };

  // Reemplaza con las iniciales del usuario
  const userInitials = 'AB';
  

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className={`mobile-menu-toggle ${isMenuOpen ? 'menu-open' : ''}`} onClick={toggleMenu}>
        <FiMenu />
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'menu-open' : ''}`}>
        <li>
          <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={toggleMenu}>About</Link>
        </li>
        <li>
          <Link to="service" onClick={toggleMenu}>Services</Link>
        </li>
        <li>
          <Link to="contact" onClick={toggleMenu}>Contact</Link>
        </li>
      </ul>
      <div className="user-avatar" onClick={toggleAvatarMenu}>
        <span>{userInitials}</span>
        {isAvatarMenuOpen && (
          <ul className="avatar-menu">
            <li>
              <Link to={'/admin'} onClick={toggleMenu}>
                <FiSettings />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link to={'/register'} onClick={toggleMenu}>
                <FiUserPlus />
                <span>New Employee</span>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout}>
                <FiLogOut />
                <span><button>Logout</button></span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
