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
    // Membiarkan Router langsung merender halaman tanpa dibungkus div frame HP
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
  );
}

export default App;