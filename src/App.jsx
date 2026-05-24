import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DaftarLaporan from './pages/DaftarLaporan';
import KameraAI from './pages/KameraAI';
import Notifikasi from './pages/Notifikasi';
import Profil from './pages/Profil';

function App() {
  return (
    <div style={styles.phoneFrame}>
      {/* Ornamen Dynamic Island untuk mempercantik mockup HP */}
      <div style={styles.dynamicIsland}></div>
      
      {/* Layar Aplikasi Utama */}
      <div style={styles.phoneScreen}>
        <Router>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daftar-laporan" element={<DaftarLaporan />} />
            <Route path="/kamera-ai" element={<KameraAI />} />
            <Route path="/notifikasi" element={<Notifikasi />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

const styles = {
  phoneFrame: { 
    width: '290px', 
    height: '580px', 
    background: '#1e2530', 
    borderRadius: '36px', 
    border: '8px solid #1e2530', 
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)', 
    position: 'relative', 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden', 
    margin: 'auto',
    marginTop: '20px'
  },
  dynamicIsland: { 
    position: 'absolute', 
    top: '8px', 
    left: '50%', 
    transform: 'translateX(-50%)', 
    width: '85px', 
    height: '16px', 
    background: '#000000', 
    borderRadius: '20px', 
    zIndex: 9999 
  },
  phoneScreen: { 
    width: '100%', 
    height: '100%', 
    background: '#F8FAFC', 
    borderRadius: '26px', 
    overflowY: 'auto', 
    position: 'relative' 
  }
};

export default App;