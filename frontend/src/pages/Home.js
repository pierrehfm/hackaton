// src/pages/Home.js
import React from 'react';

function Home() {
  return (
    <div>

      {/* Section d'introduction avec l'image de fond */}
      <div style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <div style={styles.textContent}>
          <h1 style={styles.title}>Bienvenue à Lyon</h1>
          <p style={styles.description}>Découvrez les statistiques locales de la qualité de l'air, du trafic routier et bien plus pour une meilleure qualité de vie à Lyon.</p>
        </div>
      </div>

      {/* Section d'informations générales sur Lyon */}
      <div style={styles.infoSection}>
        <h2 style={styles.sectionTitle}>À propos de Lyon</h2>
        <p style={styles.sectionContent}>
          Lyon, ville dynamique et connectée, est un pôle économique et culturel majeur en France. Elle est également reconnue pour son engagement dans l'amélioration de la qualité de vie de ses habitants, notamment à travers des statistiques et des données ouvertes sur la qualité de l'air et le trafic.
        </p>
      </div>

      {/* Section pour accéder aux statistiques */}
      <div style={styles.linkSection}>
        <h2 style={styles.sectionTitle}>Accédez aux statistiques</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Qualité de l'air</button>
          <button style={styles.button}>Trafic routier</button>
          <button style={styles.button}>Statistiques croisées</button>
        </div>
      </div>

      {/* Section Galerie avec des images */}
      <div style={styles.gallerySection}>
        <h2 style={styles.sectionTitle}>Galerie de Lyon</h2>
        <div style={styles.gallery}>
          <img src="https://www.visiterlyon.com/var/site/storage/images/8/8/7/4/684788-2-fre-FR/491d46893860-shutterstock_280295297.jpg" alt="Image 1" style={styles.galleryImage} />
          <img src="https://www.visiterlyon.com/var/site/storage/images/8/8/7/4/684788-2-fre-FR/491d46893860-shutterstock_280295297.jpg" alt="Image 2" style={styles.galleryImage} />
          <img src="https://www.visiterlyon.com/var/site/storage/images/8/8/7/4/684788-2-fre-FR/491d46893860-shutterstock_280295297.jpg" alt="Image 3" style={styles.galleryImage} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  heroSection: {
    backgroundImage: 'url("https://www.visiterlyon.com/var/site/storage/images/8/8/7/4/684788-2-fre-FR/491d46893860-shutterstock_280295297.jpg")', // Image de fond
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '1rem',
  },
  overlay: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 0,
  },
  textContent: {
    zIndex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#fff',
  },
  description: {
    fontSize: '1.5rem',
    maxWidth: '800px',
    color: '#fff',
  },
  infoSection: {
    padding: '2rem',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  sectionContent: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto',
  },
  linkSection: {
    padding: '2rem',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '1rem',
  },
  button: {
    backgroundColor: '#5a67d8',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    margin: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  gallerySection: {
    padding: '2rem',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  gallery: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  galleryImage: {
    width: '250px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
};

export default Home;
