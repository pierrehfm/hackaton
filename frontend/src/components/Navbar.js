// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img src="/path/to/logo.png" alt="Logo" style={styles.logoImage} />
      </div>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/home" style={styles.navLink}>Accueil</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/air" style={styles.navLink}>Qualité de l'air</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#fff',
    padding: '2rem',
    textAlign: 'left',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logo: {
    marginRight: '2rem',
  },
  logoImage: {
    height: '40px',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  navItem: {
    margin: '0 1rem',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;
