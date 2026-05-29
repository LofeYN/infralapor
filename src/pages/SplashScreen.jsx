import React from 'react';
// IMPORT LOGO DI SINI (Pastikan nama file dan foldernya benar)
import logoImg from '../assets/logo_login.png';

function SplashScreen() {
  const handleNext = () => {
    // Navigasi langsung dilempar menuju halaman login saat tombol diklik
    window.location.href = '/login';
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Mengganti Emoji dengan Logo Gambar */}
        <div style={styles.logoMock}>
          <img src={logoImg} alt="Logo Infralapor" style={styles.logoImg} />
        </div>
        
        {/* Branding Utama */}
        <h1 style={styles.title}>InfraLapor</h1>
        <div style={styles.tagline}>Sistem Pelaporan Infrastruktur</div>
        <div style={styles.badge}>SECURE ACCESS</div>
        
        {/* Tombol Manual Menuju Halaman Login */}
        <button onClick={handleNext} style={styles.btnMasuk}>
          MULAI MELAPOR ➔
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: '#0A1628', // Background Navy sesuai standar UI
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    width: '100%'
  },
  logoMock: {
    width: '120px',         // Diperbesar khusus untuk layar Splash Screen
    height: '120px',
    background: 'white',
    borderRadius: '28px',   // Sudut yang lebih membulat
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    padding: '10px'         // Ruang bernapas untuk logo
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  title: {
    color: 'white',
    fontSize: '26px',       // Sedikit diperbesar
    fontWeight: 'bold',
    margin: '8px 0 0 0',
    letterSpacing: '0.5px',
  },
  tagline: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '12px',
    margin: '0',
  },
  badge: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '10px',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginBottom: '20px'
  },
  /* STYLE TOMBOL BARU */
  btnMasuk: {
    width: '85%',
    padding: '14px',
    background: '#ffffff',
    color: '#0A1628',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    transition: 'background 0.2s',
  }
};

export default SplashScreen;