import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [laporanTerbaru, setLaporanTerbaru] = useState(null);

  useEffect(() => {
    const ambilLaporan = () => {
      const defaultLaporan = {
        id: '#LPR-882',
        lokasi: 'Jl. Merdeka KM 12, Samping Halte Bus',
        jenis: 'Lubang Jalan Utama',
        status: 'CRITICAL',
        tingkat: '87%',
        imgUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=300&q=80'
      };

      const laporanLokal = localStorage.getItem('inframerge_reports');
      if (laporanLokal) {
        const parsed = JSON.parse(laporanLokal);
        if (parsed.length > 0) {
          const item = parsed[0];
          setLaporanTerbaru({
            id: item.id,
            lokasi: item.lokasi || defaultLaporan.lokasi,
            jenis: item.jenis || defaultLaporan.jenis,
            status: 'CRITICAL',
            tingkat: item.tingkat || '67%',
            imgUrl: item.imgUrl || defaultLaporan.imgUrl
          });
          return;
        }
      }
      setLaporanTerbaru(defaultLaporan);
    };

    ambilLaporan();
    window.addEventListener('focus', ambilLaporan);
    return () => window.removeEventListener('focus', ambilLaporan);
  }, []);

  return (
    <div style={styles.container}>

      {/* APP BAR */}
      <div style={styles.appBar}>
        <div style={styles.appBarLeft}>
          <span style={styles.bankIcon}>🏛️</span>
          <span style={styles.appBrandText}>Infralapor</span>
        </div>
        <div onClick={() => navigate('/profil')} style={styles.profileAvatar}>A</div>
      </div>

      {/* BODY */}
      <div style={styles.scrollBody}>

        {/* 1. GREETING */}
        <div style={styles.greetingSection}>
          <span style={styles.subSubtitle}>SOVEREIGN LEDGER ACCESS</span>
          <h2 style={styles.mainGreeting}>Selamat Pagi,<br />Amrullah.</h2>
        </div>

        {/* 2. BANNER KAMERA */}
        <div onClick={() => navigate('/kamera-ai')} style={styles.actionBanner}>
          <div style={styles.cameraIconBadge}>📸</div>
          <div style={styles.bannerTextContent}>
            <h4 style={styles.bannerTitle}>Laporkan Kerusakan</h4>
            <p style={styles.bannerDesc}>Ambil foto dan biar AI kami menganalisis tingkat kerusakannya.</p>
          </div>
        </div>

        {/* 3. STATISTIK */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>12</span>
            <span style={styles.statLabel}>TOTAL<br />LAPORAN</span>
          </div>
          <div style={styles.statCard}>
            <span style={{ ...styles.statNumber, color: '#D69E2E' }}>04</span>
            <span style={styles.statLabel}>DIPROSES</span>
          </div>
          <div style={styles.statCard}>
            <span style={{ ...styles.statNumber, color: '#38A169' }}>08</span>
            <span style={styles.statLabel}>SELESAI</span>
          </div>
        </div>

        {/* 4. LAPORAN TERBARU */}
        <h3 style={styles.sectionMainTitle}>Laporan Terbaru</h3>
        {laporanTerbaru ? (
          <div style={styles.card}>
            <div style={styles.cardImageFrame}>
              <img src={laporanTerbaru.imgUrl} alt="Kerusakan" style={styles.cardImg} />
              <span style={styles.badge}>{laporanTerbaru.status}</span>
            </div>
            <div style={styles.cardDetail}>
              <div style={styles.cardMetaRow}>
                <h4 style={styles.cardTitle}>{laporanTerbaru.jenis}</h4>
                <span style={styles.cardId}>{laporanTerbaru.id}</span>
              </div>
              <div style={styles.progressRow}>
                <div style={styles.progressBg}>
                  <div style={{ ...styles.progressFill, width: laporanTerbaru.tingkat }} />
                </div>
                <span style={styles.progressText}>AI: {laporanTerbaru.tingkat}</span>
              </div>
              <div style={styles.bottomRow}>
                <p style={styles.lokasiText}>📍 {laporanTerbaru.lokasi}</p>
              </div>
            </div>
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
  container: { width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', position: 'relative', overflow: 'hidden' },
  appBar: { background: '#0B4596', padding: '40px 16px 14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 },
  appBarLeft: { display: 'flex', alignItems: 'center', gap: '8px' },
  bankIcon: { fontSize: '16px', color: '#FFFFFF' },
  appBrandText: { color: '#FFFFFF', fontSize: '15px', fontWeight: '900', letterSpacing: '0.5px' },
  profileAvatar: { width: '32px', height: '32px', borderRadius: '50%', background: '#E2E8F0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', border: '1px solid #CBD5E1' },
  scrollBody: { flex: 1, padding: '24px 16px 90px 16px', display: 'flex', flexDirection: 'column', overflowY: 'scroll', overflowX: 'hidden' },
  greetingSection: { marginBottom: '16px' },
  subSubtitle: { fontSize: '9px', fontWeight: '800', color: '#94A3B8', letterSpacing: '0.8px' },
  mainGreeting: { margin: '4px 0 0 0', fontSize: '24px', fontWeight: '900', color: '#0B4596', lineHeight: '1.2' },
  actionBanner: { background: '#0B4596', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', marginBottom: '20px' },
  cameraIconBadge: { width: '42px', height: '42px', background: '#FFF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  bannerTextContent: { flex: 1 },
  bannerTitle: { margin: 0, color: '#FFFFFF', fontSize: '14px', fontWeight: 'bold' },
  bannerDesc: { margin: '3px 0 0 0', color: 'rgba(255,255,255,0.8)', fontSize: '10px' },
  statsGrid: { display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '24px' },
  statCard: { flex: 1, background: '#FFFFFF', borderRadius: '12px', padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' },
  statNumber: { fontSize: '18px', fontWeight: '800', color: '#1E293B' },
  statLabel: { fontSize: '8px', fontWeight: 'bold', color: '#64748B', textAlign: 'center', marginTop: '4px', lineHeight: '1.2' },
  sectionMainTitle: { fontSize: '16px', fontWeight: '900', color: '#0B4596', margin: '0 0 14px 0' },
  card: { background: '#FFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', height: '110px' },
  cardImageFrame: { width: '100px', flexShrink: 0, position: 'relative' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '6px', left: '6px', fontSize: '7px', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', background: '#FED7D7', color: '#E53E3E' },
  cardDetail: { flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 },
  cardMetaRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: '12px', fontWeight: '800', color: '#1E293B', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  cardId: { fontSize: '9px', fontWeight: 'bold', color: '#94A3B8', fontFamily: 'monospace' },
  progressRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  progressBg: { flex: 1, height: '4px', background: '#E2E8F0', borderRadius: '2px' },
  progressFill: { height: '100%', borderRadius: '2px', background: '#E53E3E' },
  progressText: { fontSize: '8px', fontWeight: '800', color: '#E53E3E' },
  bottomRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  lokasiText: { fontSize: '10px', color: '#475569', margin: 0, fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 },
  emptyState: { textAlign: 'center', padding: '20px', color: '#94A3B8', fontSize: '12px', fontWeight: '600', background: '#FFF', borderRadius: '12px', border: '1px dashed #CBD5E1' },
  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '65px', background: '#FFFFFF', borderTop: '1px solid #EDF2F7', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '12px', zIndex: 1000 },
  tabItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#94A3B8', cursor: 'pointer', flex: 1 },
  tabIcon: { fontSize: '18px', opacity: 0.8 },
  tabLabel: { fontSize: '8px', fontWeight: '800', letterSpacing: '0.3px' },
  activeTab: { color: '#0B4596' },
  activeLabelText: { fontSize: '8px', fontWeight: '900', color: '#0B4596', letterSpacing: '0.3px' },
};

export default Dashboard;