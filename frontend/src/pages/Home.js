// src/pages/Home.js
import React from 'react';

function Home() {
  return (
    <div>
      {/* Section de l'image avec l'ombre */}
      <div style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <div style={styles.textContent}>
          <h1 style={styles.title}>Bienvenue à Lyon</h1>
          <p style={styles.description}>Explorez la beauté de la ville de Lyon, son histoire, sa culture et bien plus encore.</p>
        </div>
      </div>

      {/* Section d'information */}
      <div style={styles.infoSection}>
        <h2 style={styles.sectionTitle}>À propos de Lyon</h2>
        <p style={styles.sectionContent}>
          Lyon, classée au patrimoine mondial de l'UNESCO, est une ville réputée pour son histoire riche, sa gastronomie et sa culture vibrante. 
          De ses traboules secrètes à ses célèbres bouchons, Lyon est un véritable centre culturel.
        </p>
      </div>

      {/* Liens vers d'autres pages */}
      <div style={styles.linkSection}>
        <h2 style={styles.sectionTitle}>Explorez la ville</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Découvrez les monuments</button>
          <button style={styles.button}>Les événements à venir</button>
        </div>
      </div>

      {/* Section galerie d'images */}
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
    backgroundImage: 'url("https://www.visiterlyon.com/var/site/storage/images/8/8/7/4/684788-2-fre-FR/491d46893860-shutterstock_280295297.jpg")', // Remplace par l'URL de l'image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Prend toute la hauteur de l'écran
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Ombre noire avec opacité
    zIndex: 0, // C'est l'overlay d'ombre, donc derrière le texte
  },
  textContent: {
    zIndex: 1, // Le texte est au-dessus de l'ombre
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
