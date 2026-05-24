import React from 'react';

function SplashScreen() {
  const handleNext = () => {
    // Navigasi langsung dilempar menuju halaman login saat tombol diklik
    window.location.href = '/login';
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Logo Icon Aplikasi */}
        <div style={styles.logoMock}>🏗️</div>
        
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
    background: '#0A1628', // Background Navy sesuai standar UI kelompok
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
    width: '70px',
    height: '70px',
    background: 'white',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  title: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
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
    padding: '12px',
    background: '#ffffff',
    color: '#0A1628',
    border: 'none',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    transition: 'background 0.2s',
  }
};

export default SplashScreen;