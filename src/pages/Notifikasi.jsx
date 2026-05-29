import React from 'react';
import { useNavigate } from 'react-router-dom';

function Notifikasi() {
  const navigate = useNavigate();

  const mockNotif = [
    { id: 1, tipe: '🚨 SOS', pesan: 'Laporan LPR-882 (Lubang Jalan) statusnya berubah menjadi DIPROSES oleh Dinas Pekerjaan Umum.', waktu: '2 menit yang lalu' },
    { id: 2, tipe: '✅ SUKSES', pesan: 'Validasi AI SegFormer selesai. Laporan LPR-883 dinyatakan aman dan ditutup resmi.', waktu: '1 jam yang lalu' },
    { id: 3, tipe: '🔗 LEDGER', pesan: 'Kontrak pintar (Smart Contract) baru berhasil diverifikasi untuk area Madiun.', waktu: 'Kemarin' }
  ];

  return (
    <div style={styles.container}>
      {/* HEADER RAMPIH */}
      <div style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.btnBack}>←</button>
        <h4 style={styles.headerTitle}>Notifikasi</h4>
        <div style={{ width: '20px' }}></div>
      </div>

      {/* LIST NOTIF */}
      <div style={styles.scrollBody}>
        <div style={styles.listContainer}>
          {mockNotif.map((n) => (
            <div key={n.id} style={styles.notifCard}>
              <div style={styles.cardHeader}>
                <span style={styles.badge}>{n.tipe}</span>
                <span style={styles.waktu}>{n.waktu}</span>
              </div>
              <p style={styles.pesanText}>{n.pesan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR (FIXED) */}
      <div style={styles.bottomTabBar}>
        <div onClick={() => navigate('/dashboard')} style={styles.tabItem}>
          <span style={styles.tabIcon}>🏠</span>
          <span style={styles.tabLabel}>BERANDA</span>
        </div>
        <div onClick={() => navigate('/daftar-laporan')} style={styles.tabItem}>
          <span style={styles.tabIcon}>📋</span>
          <span style={styles.tabLabel}>LAPORAN</span>
        </div>
        <div style={{ ...styles.tabItem, ...styles.activeTab }}>
          <span style={styles.tabIcon}>🔔</span>
          <span style={styles.activeLabelText}>NOTIFIKASI</span>
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
  container: { width: '100%', height: '100dvh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', position: 'relative' },
  // Header disesuaikan agar tidak terlalu tinggi (padding-top 16px)
  header: { background: '#1A56DB', color: '#fff', padding: '16px 16px 14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 },
  btnBack: { background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' },
  headerTitle: { margin: 0, fontSize: '15px', fontWeight: 'bold' },
  // Padding bottom 85px agar konten terakhir tidak tertutup tab bar
  scrollBody: { flex: 1, padding: '16px 16px 85px 16px', overflowY: 'auto' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  notifCard: { background: '#fff', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
  badge: { fontSize: '9px', fontWeight: 'bold', color: '#1A56DB', background: '#EBF8FF', padding: '2px 6px', borderRadius: '6px' },
  waktu: { fontSize: '9px', color: '#A0AEC0' },
  pesanText: { fontSize: '11px', color: '#4A5568', margin: 0, lineHeight: '1.45' },

  // POSISI FIXED agar menempel di bawah
  bottomTabBar: { position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%', height: '65px', background: '#FFFFFF', borderTop: '1px solid #EDF2F7', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '12px', zIndex: 1000 },
  tabItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#718096', cursor: 'pointer', flex: 1 },
  tabIcon: { fontSize: '16px', opacity: 0.7 },
  tabLabel: { fontSize: '8px', fontWeight: 'bold', letterSpacing: '0.3px' },
  activeTab: { background: '#FEF3C7', borderRadius: '10px', padding: '4px 0', margin: '0 6px', color: '#7B341E' },
  activeLabelText: { fontSize: '8px', fontWeight: '900', letterSpacing: '0.3px' }
};

export default Notifikasi;