import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORT LOGO SESUAI NAMA FILE
import logoImg from '../assets/logo_dashboard.png'; 

function Dashboard() {
  const navigate = useNavigate();
  const [laporanList, setLaporanList] = useState([]);

  const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
  const user = {
    nama: savedUser.nama || 'LOFE',
    inisial: savedUser.nama ? savedUser.nama.charAt(0).toUpperCase() : 'L',
    avatar: savedUser.avatar || null, 
  };

  // Kumpulan data default awal yang bervariasi agar dashboard terlihat realistis dan penuh di awal
  const defaultLaporan = [
    {
      id: '#LPR-882',
      lokasi: 'Jl. Merdeka KM 12, Samping Halte Bus',
      jenis: 'Lubang Jalan Utama',
      status: 'CRITICAL',
      tingkat: '87%',
      imgUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '#LPR-741',
      lokasi: 'Jl. Raya Banjarsari Wetan, Madiun',
      jenis: 'Retakan Aspal Parah',
      status: 'HEAVY',
      tingkat: '64%',
      imgUrl: 'https://images.unsplash.com/photo-1599740831464-597f87df3324?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '#LPR-102',
      lokasi: 'Area Pemukiman RT 04, Ds. Banjarsari Wetan',
      jenis: 'Pothole Air Dangkal',
      status: 'SELESAI',
      tingkat: '42%',
      imgUrl: 'https://images.unsplash.com/photo-1530685934402-d5b927188a64?auto=format&fit=crop&w=300&q=80'
    }
  ];

  useEffect(() => {
    const ambilLaporan = () => {
      const laporanLokal = localStorage.getItem('inframerge_reports');
      if (laporanLokal) {
        const parsed = JSON.parse(laporanLokal);
        if (parsed.length > 0) {
          setLaporanList(parsed);
          return;
        }
      }
      setLaporanList(defaultLaporan);
      localStorage.setItem('inframerge_reports', JSON.stringify(defaultLaporan));
    };

    ambilLaporan();
    window.addEventListener('focus', ambilLaporan);
    return () => window.removeEventListener('focus', ambilLaporan);
  }, []);

  // KALKULASI STATISTIK SECARA OTOMATIS DAN RIIL
  const totalLaporan = laporanList.length;
  const jumlahDiproses = laporanList.filter(item => item.status === 'CRITICAL' || item.status === 'HEAVY' || item.status === 'MODERATE').length;
  const jumlahSelesai = laporanList.filter(item => item.status === 'SELESAI').length;

  const formatAngka = (num) => num.toString().padStart(2, '0');

  const getGreeting = () => {
    const jam = new Date().getHours();
    if (jam < 11) return 'Selamat Pagi';
    if (jam < 15) return 'Selamat Siang';
    if (jam < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'CRITICAL': return { bg: '#FED7D7', txt: '#E53E3E' };
      case 'HEAVY':
      case 'MODERATE': return { bg: '#FEEBC8', txt: '#DD6B20' };
      case 'SELESAI': return { bg: '#C6F6D5', txt: '#38A169' };
      default: return { bg: '#E2E8F0', txt: '#475569' };
    }
  };

  return (
    <div style={styles.container}>
      {/* APP BAR */}
      <div style={styles.appBar}>
        <div style={styles.appBarLeft}>
          {/* LOGO DENGAN PERBAIKAN UKURAN & MARGIN NEGATIF */}
          <img src={logoImg} alt="Infralapor Logo" style={styles.logoImage} />
          <span style={styles.appBrandText}>Infralapor</span>
        </div>
        <div onClick={() => navigate('/profil')} style={styles.profileAvatar}>
          {user.avatar ? (
            <img src={user.avatar} alt="Profil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            user.inisial
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="hilangkan-scrollbar" style={styles.scrollBody}>
        <div style={styles.greetingSection}>
          <span style={styles.subSubtitle}>SOVEREIGN LEDGER ACCESS</span>
          <h2 style={styles.mainGreeting}>{getGreeting()},<br />{user.nama}.</h2>
        </div>

        <div onClick={() => navigate('/kamera-ai')} style={styles.actionBanner}>
          <div style={styles.cameraIconBadge}>📸</div>
          <div style={styles.bannerTextContent}>
            <h4 style={styles.bannerTitle}>Laporkan Kerusakan</h4>
            <p style={styles.bannerDesc}>Ambil foto dan biar AI kami menganalisis tingkat kerusakannya.</p>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>{formatAngka(totalLaporan)}</span>
            <span style={styles.statLabel}>TOTAL<br />LAPORAN</span>
          </div>
          <div style={styles.statCard}>
            <span style={{ ...styles.statNumber, color: '#DD6B20' }}>{formatAngka(jumlahDiproses)}</span>
            <span style={styles.statLabel}>DIPROSES</span>
          </div>
          <div style={styles.statCard}>
            <span style={{ ...styles.statNumber, color: '#38A169' }}>{formatAngka(jumlahSelesai)}</span>
            <span style={styles.statLabel}>SELESAI</span>
          </div>
        </div>

        <h3 style={styles.sectionMainTitle}>Laporan Terbaru</h3>
        {laporanList.length > 0 ? (
          <div style={styles.laporanScroll}>
            {laporanList.map((laporan, idx) => {
              const badgeTheme = getBadgeStyle(laporan.status);
              return (
                <div key={laporan.id || idx} style={styles.card}>
                  <div style={styles.cardImageFrame}>
                    <img src={laporan.imgUrl} alt="Kerusakan" style={styles.cardImg} />
                    <span style={{ ...styles.badge, background: badgeTheme.bg, color: badgeTheme.txt }}>
                      {laporan.status}
                    </span>
                  </div>
                  <div style={styles.cardDetail}>
                    <div style={styles.cardMetaRow}>
                      <h4 style={styles.cardTitle}>{laporan.jenis}</h4>
                      <span style={styles.cardId}>{laporan.id}</span>
                    </div>
                    
                    <div style={styles.progressRow}>
                      <div style={styles.progressBg}>
                        <div style={{ ...styles.progressFill, width: laporan.tingkat, backgroundColor: badgeTheme.txt }} />
                      </div>
                      <span style={{ ...styles.progressText, color: badgeTheme.txt }}>AI: {laporan.tingkat}</span>
                    </div>
                    
                    <div style={styles.bottomRow}>
                      <p style={styles.lokasiText}>📍 {laporan.lokasi}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>Belum ada laporan terbaru.</div>
        )}
      </div>

      {/* BOTTOM TAB BAR */}
      <div style={styles.bottomTabBar}>
        <div style={{ ...styles.tabItem, ...styles.activeTab }}>
          <span style={styles.tabIcon}>🏠</span>
          <span style={styles.activeLabelText}>BERANDA</span>
        </div>
        <div onClick={() => navigate('/daftar-laporan')} style={styles.tabItem}>
          <span style={styles.tabIcon}>📋</span>
          <span style={styles.tabLabel}>LAPORAN</span>
        </div>
        <div onClick={() => navigate('/notifikasi')} style={styles.tabItem}>
          <span style={styles.tabIcon}>🔔</span>
          <span style={styles.tabLabel}>NAVIGASI</span>
        </div>
        <div onClick={() => navigate('/profil')} style={styles.tabItem}>
          <span style={styles.tabIcon}>👤</span>
          <span style={styles.tabLabel}>PROFIL</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', position: 'relative', overflow: 'hidden' },
  appBar: { background: '#0B4596', padding: '40px 16px 14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 },
  appBarLeft: { display: 'flex', alignItems: 'center', gap: '0px' }, // Diubah ke 0px agar teks tidak berjarak jauh akibat ruang transparan gambar
  
  // Modifikasi khusus untuk mengatasi padding bawaan logo gambar yang terlalu lebar
  logoImage: { 
    width: '110px', 
    height: '55px', 
    objectFit: 'contain', 
    marginLeft: '-40px',   // Memotong ruang kosong transparan sebelah kiri
    marginRight: '-40px',  // Memotong ruang kosong transparan sebelah kanan
    marginTop: '-5px',
    marginBottom: '-5px'
  },
  
  appBrandText: { color: '#FFFFFF', fontSize: '15px', fontWeight: '900', letterSpacing: '0.5px' },
  profileAvatar: { width: '34px', height: '34px', borderRadius: '50%', background: '#FFFFFF', color: '#0B4596', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' },
  scrollBody: { flex: 1, padding: '24px 16px 90px 16px', display: 'flex', flexDirection: 'column', overflowY: 'auto', WebkitOverflowScrolling: 'touch', minHeight: 0 },
  greetingSection: { marginBottom: '16px' },
  subSubtitle: { fontSize: '9px', fontWeight: '800', color: '#94A3B8', letterSpacing: '0.8px' },
  mainGreeting: { margin: '4px 0 0 0', fontSize: '24px', fontWeight: '900', color: '#0B4596', lineHeight: '1.2' },
  actionBanner: { background: 'linear-gradient(135deg, #0B4596 0%, #1E6AD3 100%)', borderRadius: '16px', padding: '18px 16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', marginBottom: '24px', boxShadow: '0 4px 12px rgba(11, 69, 150, 0.2)' },
  cameraIconBadge: { width: '44px', height: '44px', background: '#FFF', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  bannerTextContent: { flex: 1 },
  bannerTitle: { margin: 0, color: '#FFFFFF', fontSize: '15px', fontWeight: 'bold' },
  bannerDesc: { margin: '4px 0 0 0', color: 'rgba(255,255,255,0.85)', fontSize: '11px', lineHeight: '1.3' },
  statsGrid: { display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '26px' },
  statCard: { flex: 1, background: '#FFFFFF', borderRadius: '14px', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  statNumber: { fontSize: '22px', fontWeight: '800', color: '#0B4596' },
  statLabel: { fontSize: '8.5px', fontWeight: 'bold', color: '#64748B', textAlign: 'center', marginTop: '4px', lineHeight: '1.2', letterSpacing: '0.2px' },
  sectionMainTitle: { fontSize: '16px', fontWeight: '900', color: '#0B4596', margin: '0 0 14px 0', letterSpacing: '0.3px' },
  laporanScroll: { display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '10px' },
  card: { background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', height: '105px', boxShadow: '0 2px 8px rgba(148, 163, 184, 0.08)', transition: 'transform 0.2s ease' },
  cardImageFrame: { width: '105px', flexShrink: 0, position: 'relative', background: '#EDF2F7' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '6px', left: '6px', fontSize: '7.5px', fontWeight: '900', padding: '3px 8px', borderRadius: '6px', letterSpacing: '0.3px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  cardDetail: { flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 },
  cardMetaRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' },
  cardTitle: { fontSize: '13px', fontWeight: '800', color: '#1E293B', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 },
  cardId: { fontSize: '9px', fontWeight: 'bold', color: '#94A3B8', fontFamily: 'monospace', background: '#F1F5F9', padding: '1px 5px', borderRadius: '4px' },
  progressRow: { display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0' },
  progressBg: { flex: 1, height: '6px', background: '#E2E8F0', borderRadius: '3px' },
  progressFill: { height: '100%', borderRadius: '3px', transition: 'width 0.5s ease-in-out' },
  progressText: { fontSize: '9px', fontWeight: '800', fontFamily: 'monospace', minWidth: '45px', textAlign: 'right' },
  bottomRow: { display: 'flex', alignItems: 'center', marginTop: '2px' },
  lokasiText: { fontSize: '10.5px', color: '#64748B', margin: 0, fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 },
  emptyState: { textAlign: 'center', padding: '30px 20px', color: '#94A3B8', fontSize: '12px', fontWeight: '600', background: '#FFF', borderRadius: '14px', border: '1px dashed #CBD5E1' },
  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '65px', background: '#FFFFFF', borderTop: '1px solid #EDF2F7', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '12px', zIndex: 1000 },
  tabItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#94A3B8', cursor: 'pointer', flex: 1 },
  tabIcon: { fontSize: '19px', opacity: 0.8 },
  tabLabel: { fontSize: '8px', fontWeight: '800', letterSpacing: '0.3px' },
  activeTab: { color: '#0B4596' },
  activeLabelText: { fontSize: '8px', fontWeight: '900', color: '#0B4596', letterSpacing: '0.3px' },
};

export default Dashboard;