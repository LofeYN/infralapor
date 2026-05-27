import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DaftarLaporan() {
  const navigate = useNavigate();
  const [listLaporan, setListLaporan] = useState([]);
  const [lokasiAsli, setLokasiAsli] = useState('Memuat lokasi GPS...');
  const [gpsStatus, setGpsStatus] = useState('loading'); // 'loading' | 'success' | 'warning' | 'error'

  // ── AMBIL LOKASI GPS ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      setLokasiAsli('Lokasi tidak tersedia');
      setGpsStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=id`
          );
          const data = await res.json();
          const a = data.address;
          const parts = [];
          if (a.road) parts.push(a.road);
          if (a.village || a.suburb) parts.push(a.village || a.suburb);
          if (a.city || a.town || a.county) parts.push(a.city || a.town || a.county);
          const alamat = parts.join(', ') || data.display_name?.split(',').slice(0, 3).join(',') || 'Lokasi tidak diketahui';
          setLokasiAsli(alamat);
          setGpsStatus('success');
        } catch {
          setLokasiAsli(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          setGpsStatus('success');
        }
      },
      () => {
        setLokasiAsli('Jl. Raya Sidoarjo, Jawa Timur');
        setGpsStatus('warning');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // ── LOAD DATA LAPORAN (tanpa duplikat) ──────────────────────────────────────
  useEffect(() => {
    const dataAwal = [
      {
        id: '#LPR-882',
        jenis: 'Lubang Jalan Utama',
        status: 'CRITICAL',
        tingkat: '87%',
        imgUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: '#LPR-883',
        jenis: 'Paving Blok Hancur',
        status: 'CRITICAL',
        tingkat: '85%',
        imgUrl: 'https://images.unsplash.com/photo-1621243804936-775306a8f2e3?auto=format&fit=crop&w=300&q=80',
      },
    ];

    const awalIds = dataAwal.map((d) => d.id);

    let laporanLokal = [];
    try {
      const raw = localStorage.getItem('inframerge_reports');
      if (raw) {
        const parsed = JSON.parse(raw);
        laporanLokal = parsed
          .filter((item) => {
            const itemId = item.id.startsWith('#') ? item.id : `#${item.id}`;
            return !awalIds.includes(itemId); // buang duplikat
          })
          .map((item) => ({
            id: item.id.startsWith('#') ? item.id : `#${item.id}`,
            jenis: item.jenis || 'Lubang Jalan Utama',
            status: 'CRITICAL',
            tingkat: item.tingkat
              ? item.tingkat.replace('BERAT ', '').replace(' Damage', '')
              : '87%',
            imgUrl:
              'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=300&q=80',
          }));
      }
    } catch {}

    setListLaporan([...laporanLokal, ...dataAwal]);
  }, []);

  // ── HAPUS LAPORAN ────────────────────────────────────────────────────────────
  const handleHapus = (id) => {
    setListLaporan((prev) => prev.filter((lap) => lap.id !== id));
    try {
      const raw = localStorage.getItem('inframerge_reports');
      if (raw) {
        const filtered = JSON.parse(raw).filter((item) => {
          const itemId = item.id.startsWith('#') ? item.id : `#${item.id}`;
          return itemId !== id;
        });
        localStorage.setItem('inframerge_reports', JSON.stringify(filtered));
      }
    } catch {}
  };

  // ── WARNA GPS INFO BAR ───────────────────────────────────────────────────────
  const gpsBarStyle = {
    loading: { background: '#EBF8FF', border: '1px solid #BEE3F8', color: '#2B6CB0' },
    success: { background: '#F0FFF4', border: '1px solid #9AE6B4', color: '#276749' },
    warning: { background: '#FFFFF0', border: '1px solid #ECC94B', color: '#744210' },
    error:   { background: '#FFF5F5', border: '1px solid #FED7D7', color: '#E53E3E' },
  }[gpsStatus];

  const gpsIcon = { loading: '📡', success: '📍', warning: '⚠️', error: '⚠️' }[gpsStatus];

  return (
    <div style={styles.container}>

      {/* APP BAR */}
      <div style={styles.appBar}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>←</button>
        <span style={styles.appBarTitle}>Daftar Laporan</span>
        <div style={{ width: 32 }} />
      </div>

      {/* LIST LAPORAN */}
      <div style={styles.scrollBody}>

        {/* GPS INFO BAR */}
        <div style={{ ...styles.gpsBar, ...gpsBarStyle }}>
          {gpsIcon} {gpsStatus === 'loading' ? 'Mendeteksi lokasi GPS...' : lokasiAsli}
        </div>

        {listLaporan.length === 0 ? (
          <div style={styles.emptyState}>Belum ada laporan.</div>
        ) : (
          listLaporan.map((lap, idx) => (
            <div key={`${lap.id}-${idx}`} style={styles.card}>
              <div style={styles.cardImageFrame}>
                <img src={lap.imgUrl} alt="Kerusakan" style={styles.cardImg} />
                <span style={styles.badge}>{lap.status}</span>
              </div>
              <div style={styles.cardDetail}>
                <div style={styles.cardMetaRow}>
                  <h4 style={styles.cardTitle}>{lap.jenis}</h4>
                  <span style={styles.cardId}>{lap.id}</span>
                </div>
                <div style={styles.progressRow}>
                  <div style={styles.progressBg}>
                    <div style={{ ...styles.progressFill, width: lap.tingkat }} />
                  </div>
                  <span style={styles.progressText}>AI: {lap.tingkat}</span>
                </div>
                <div style={styles.bottomRow}>
                  <p style={styles.lokasiText}>📍 {lokasiAsli}</p>
                  <button onClick={() => handleHapus(lap.id)} style={styles.hapusBtn}>🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* BOTTOM TAB BAR */}
      <div style={styles.bottomTabBar}>
        <div onClick={() => navigate('/dashboard')} style={styles.tabItem}>
          <span style={styles.tabIcon}>🏠</span>
          <span style={styles.tabLabel}>BERANDA</span>
        </div>
        <div style={{ ...styles.tabItem, ...styles.activeTab }}>
          <span style={styles.tabIcon}>📋</span>
          <span style={styles.activeLabelText}>LAPORAN</span>
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
  appBar: { background: '#0B4596', padding: '40px 16px 14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
  backBtn: { background: 'none', border: 'none', color: '#FFF', fontSize: '20px', cursor: 'pointer', padding: 0 },
  appBarTitle: { color: '#FFF', fontSize: '15px', fontWeight: '900' },
  scrollBody: { flex: 1, overflowY: 'auto', padding: '16px 16px 80px 16px', display: 'flex', flexDirection: 'column', gap: '14px' },
  gpsBar: { borderRadius: '8px', padding: '8px 12px', fontSize: '10px', fontWeight: '600', flexShrink: 0 },
  emptyState: { textAlign: 'center', padding: '40px', color: '#94A3B8', fontSize: '13px' },
  card: { background: '#FFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', height: '110px', flexShrink: 0 },
  cardImageFrame: { width: '100px', flexShrink: 0, position: 'relative' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '6px', left: '6px', fontSize: '7px', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', background: '#FED7D7', color: '#E53E3E' },
  cardDetail: { flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 },
  cardMetaRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' },
  cardTitle: { fontSize: '12px', fontWeight: '800', color: '#1E293B', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' },
  cardId: { fontSize: '9px', fontWeight: 'bold', color: '#94A3B8', fontFamily: 'monospace', flexShrink: 0 },
  progressRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  progressBg: { flex: 1, height: '4px', background: '#E2E8F0', borderRadius: '2px' },
  progressFill: { height: '100%', borderRadius: '2px', background: '#E53E3E' },
  progressText: { fontSize: '8px', fontWeight: '800', color: '#E53E3E', flexShrink: 0 },
  bottomRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' },
  lokasiText: { fontSize: '10px', color: '#475569', margin: 0, fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 },
  hapusBtn: { background: '#FFF5F5', border: '1px solid #FED7D7', fontSize: '14px', cursor: 'pointer', padding: '4px 6px', borderRadius: '6px', flexShrink: 0 },
  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '65px', background: '#FFF', borderTop: '1px solid #EDF2F7', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '12px', zIndex: 1000 },
  tabItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#94A3B8', cursor: 'pointer', flex: 1 },
  tabIcon: { fontSize: '18px', opacity: 0.8 },
  tabLabel: { fontSize: '8px', fontWeight: '800', letterSpacing: '0.3px' },
  activeTab: { color: '#0B4596' },
  activeLabelText: { fontSize: '8px', fontWeight: '900', color: '#0B4596', letterSpacing: '0.3px' },
};

export default DaftarLaporan;