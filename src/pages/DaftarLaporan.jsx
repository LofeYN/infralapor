import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DaftarLaporan() {
  const navigate = useNavigate();
  const [listLaporan, setListLaporan] = useState([]);
  const [lokasiAsli, setLokasiAsli] = useState('Memuat lokasi GPS...');
  const [gpsStatus, setGpsStatus] = useState('loading');

  // ... (Logika useEffect tetap sama seperti sebelumnya) ...
  useEffect(() => {
    const ambilLaporan = () => {
      const raw = localStorage.getItem('inframerge_reports');
      if (raw) {
        setListLaporan(JSON.parse(raw));
      } else {
        setListLaporan([{ id: '#LPR-882', lokasi: 'Jl. Merdeka KM 12', jenis: 'Lubang Jalan', status: 'CRITICAL', tingkat: '87%', imgUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=300&q=80' }]);
      }
    };
    ambilLaporan();
  }, []);

  const handleHapus = (id) => {
    if (window.confirm('Hapus laporan ini?')) {
      const dataSisa = listLaporan.filter((lap) => lap.id !== id);
      setListLaporan(dataSisa);
      localStorage.setItem('inframerge_reports', JSON.stringify(dataSisa));
    }
  };

  const getBadgeStyle = (status) => {
    if (status === 'CRITICAL') return { bg: '#FED7D7', txt: '#E53E3E' };
    if (status === 'SELESAI') return { bg: '#C6F6D5', txt: '#38A169' };
    return { bg: '#FEEBC8', txt: '#DD6B20' };
  };

  return (
    <div style={styles.container}>
      {/* HEADER RAMPIH */}
      <div style={styles.appBar}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>←</button>
        <span style={styles.appBarTitle}>Daftar Laporan</span>
        <div style={{ width: 32 }} />
      </div>

      <div className="hilangkan-scrollbar" style={styles.scrollBody}>
        {listLaporan.map((lap, idx) => {
          const badgeTheme = getBadgeStyle(lap.status);
          return (
            <div key={idx} style={styles.card}>
              <div style={styles.cardImageFrame}>
                <img src={lap.imgUrl} alt="Laporan" style={styles.cardImg} />
                <span style={{ ...styles.badge, background: badgeTheme.bg, color: badgeTheme.txt }}>{lap.status}</span>
              </div>
              <div style={styles.cardDetail}>
                <h4 style={styles.cardTitle}>{lap.jenis}</h4>
                <div style={styles.progressBg}><div style={{...styles.progressFill, width: lap.tingkat, backgroundColor: badgeTheme.txt}}/></div>
                <div style={styles.bottomRow}>
                  <p style={styles.lokasiText}>📍 {lap.lokasi}</p>
                  <button onClick={() => handleHapus(lap.id)} style={styles.hapusBtn}>🗑️</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM TAB BAR YANG FIXED */}
      <div style={styles.bottomTabBar}>
        <div onClick={() => navigate('/dashboard')} style={styles.tabItem}><span style={styles.tabIcon}>🏠</span><span style={styles.tabLabel}>BERANDA</span></div>
        <div style={{ ...styles.tabItem, ...styles.activeTab }}><span style={styles.tabIcon}>📋</span><span style={styles.activeLabelText}>LAPORAN</span></div>
        <div onClick={() => navigate('/notifikasi')} style={styles.tabItem}><span style={styles.tabIcon}>🔔</span><span style={styles.tabLabel}>NAVIGASI</span></div>
        <div onClick={() => navigate('/profil')} style={styles.tabItem}><span style={styles.tabIcon}>👤</span><span style={styles.tabLabel}>PROFIL</span></div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column', background: '#F8FAFC', position: 'relative' },
  // Header dirampingkan jadi 16px
  appBar: { background: '#0B4596', padding: '16px 16px 14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 },
  backBtn: { background: 'none', border: 'none', color: '#FFF', fontSize: '20px', cursor: 'pointer' },
  appBarTitle: { color: '#FFF', fontSize: '15px', fontWeight: '900' },
  scrollBody: { flex: 1, padding: '20px 16px 80px 16px', overflowY: 'auto', minHeight: 0 },
  card: { background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', height: '90px', marginBottom: '12px', overflow: 'hidden' },
  cardImageFrame: { width: '80px', position: 'relative' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '4px', left: '4px', fontSize: '7px', fontWeight: '900', padding: '2px 4px', borderRadius: '4px' },
  cardDetail: { flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 },
  cardTitle: { fontSize: '12px', fontWeight: '800', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden' },
  progressBg: { width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px' },
  progressFill: { height: '100%', borderRadius: '2px' },
  bottomRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  lokasiText: { fontSize: '9px', color: '#475569', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' },
  hapusBtn: { background: '#FFF5F5', border: 'none', fontSize: '12px', cursor: 'pointer' },
  // Menu bawah diubah jadi fixed agar menempel
  bottomTabBar: { position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%', height: '65px', background: '#FFFFFF', borderTop: '1px solid #EDF2F7', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '12px', zIndex: 1000 },
  tabItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#94A3B8', cursor: 'pointer', flex: 1 },
  activeTab: { color: '#0B4596' },
  tabIcon: { fontSize: '16px' },
  tabLabel: { fontSize: '8px', fontWeight: '800' },
  activeLabelText: { fontSize: '8px', fontWeight: '900', color: '#0B4596' }
};

export default DaftarLaporan;