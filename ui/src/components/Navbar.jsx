import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import '../styles/Navbar.css';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            <Link to="/" className="logo-name">
              Hackanova
            </Link>
          </div>

          <nav>
            <ul className="nav-links">
              <li><NavLink to="/" className="navbar-link">Home</NavLink></li>
              <li><NavLink to="/about" className="navbar-link">Fun</NavLink></li>
              <li><NavLink to="/service" className="navbar-link">Service</NavLink></li>
              <li><NavLink to="dashboard" className="navbar-link">Contact</NavLink></li>
              <li><a href="https://github.com/Mahesh925" className="navbar-link" target="_blank"><FaGithub /></a></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
