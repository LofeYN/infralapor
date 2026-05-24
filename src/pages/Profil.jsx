import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profil() {
  const navigate = useNavigate();
  // State untuk mengatur tampilan (menu utama, data pribadi, keamanan, atau notifikasi)
  const [view, setView] = useState('main'); 

  // Komponen Reusable untuk Toggle Switch
  const Toggle = ({ active }) => (
    <div style={{...styles.toggleBg, backgroundColor: active ? '#1A56DB' : '#CBD5E0'}}>
      <div style={{...styles.toggleCircle, transform: active ? 'translateX(18px)' : 'translateX(0)'}}></div>
    </div>
  );

  // ================= TAMPILAN 1: DATA PRIBADI =================
  const DataPribadiView = () => (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => setView('main')} style={styles.btnBack}>←</button>
        <span style={styles.headerBrand}>Infralapor</span>
        <div style={{ width: '20px' }}></div>
      </div>
      <div style={styles.scrollBody}>
        <div style={styles.idCardBlue}>
          <div style={styles.idBadge}>VERIFIED DIGITAL ID</div>
          <h2 style={styles.idName}>Amrullah</h2>
          <p style={styles.idNumber}>ID: SL-2024-0892</p>
          <div style={styles.checkIcon}>🛡️</div>
        </div>
        <div style={styles.sectionHeaderRow}>
          <h3 style={styles.sectionTitleBlack}>DATA PRIBADI</h3>
          <span style={styles.btnUpdate}>🔄 PERBARUI</span>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>NAMA LENGKAP</label>
          <div style={styles.inputBox}>Amrullah</div>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>NOMOR INDUK KEPENDUDUKAN (NIK)</label>
          <div style={styles.inputBox}>3273000000000892</div>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>ALAMAT EMAIL</label>
          <div style={styles.inputBox}>📧 amrullah@ledger.gov</div>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>NOMOR TELEPON</label>
          <div style={styles.inputBox}>📞 +62 812-3456-7890</div>
        </div>
      </div>
    </div>
  );

  // ================= TAMPILAN 2: SECURITY PROTOCOL =================
  const SecurityView = () => (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => setView('main')} style={styles.btnBack}>←</button>
        <span style={styles.headerBrand}>Infralapor</span>
        <div style={{ width: '20px' }}></div>
      </div>
      <div style={styles.scrollBody}>
        <div style={styles.securityBanner}>
          <h2 style={styles.bannerTitleLarge}>Security Protocol</h2>
          <div style={styles.statusRow}>
            <div style={styles.greenPulse}></div>
            <span style={styles.statusText}>SYSTEM STATUS: ACTIVE & SECURED</span>
          </div>
        </div>
        <div style={styles.securityCard}>
          <div style={styles.securityCardHeader}>
            <span style={styles.lockIcon}>🛡️</span>
            <span style={styles.lastChangedText}>LAST CHANGED 42 DAYS AGO</span>
          </div>
          <h4 style={styles.cardMainTitle}>Passkey Ledger</h4>
          <p style={styles.cardSubTitle}>Rotate your administrative access keys regularly to maintain integrity.</p>
          <button style={styles.btnChangePassword}>Change Password</button>
        </div>
        <div style={styles.gridSecurity}>
          <div style={styles.gridItem}>
            <span style={styles.gridIcon}>👤</span>
            <h5 style={styles.gridTitle}>Biometrics</h5>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
              <span style={styles.gridStatusText}>ENABLED</span>
              <Toggle active={true} />
            </div>
          </div>
          <div style={styles.gridItem}>
            <span style={styles.gridIcon}>🔑</span>
            <h5 style={styles.gridTitle}>MFA Auth</h5>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
              <span style={styles.gridStatusText}>ACTIVE</span>
              <Toggle active={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ================= TAMPILAN 3: NOTIFICATION SETTINGS =================
  const NotificationView = () => (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => setView('main')} style={styles.btnBack}>←</button>
        <span style={styles.headerBrand}>Infralapor</span>
        <div style={{ width: '20px' }}></div>
      </div>
      <div style={styles.scrollBody}>
        <div style={styles.securityBanner}>
          <h2 style={styles.bannerTitleLarge}>Notification Settings</h2>
          <p style={styles.bannerSubText}>Manage how you receive alerts and updates regarding citizen reports.</p>
        </div>
        <h5 style={styles.groupTitle}>Delivery Channels</h5>
        <div style={styles.notifItem}>
          <div style={styles.notifIconBox}>🔔</div>
          <div style={{flex:1, marginLeft:'12px'}}>
            <h4 style={styles.notifMainText}>Push Notifications</h4>
            <p style={styles.notifSubText}>Instant alerts on your device</p>
          </div>
          <Toggle active={true} />
        </div>
        <div style={styles.notifItem}>
          <div style={styles.notifIconBox}>📧</div>
          <div style={{flex:1, marginLeft:'12px'}}>
            <h4 style={styles.notifMainText}>Email Summaries</h4>
            <p style={styles.notifSubText}>Weekly critical updates</p>
          </div>
          <Toggle active={false} />
        </div>
        <h5 style={styles.groupTitle}>Report Status Updates</h5>
        <div style={styles.notifListItem}>
          <span style={styles.listItemText}>New Report Submission</span>
          <Toggle active={true} />
        </div>
        <div style={styles.notifListItem}>
          <span style={styles.listItemText}>Official Review Started</span>
          <Toggle active={true} />
        </div>
        <div style={styles.notifListItem}>
          <span style={{...styles.listItemText, color:'#E53E3E'}}>✨ Critical Resolution Alerts</span>
          <Toggle active={true} />
        </div>
      </div>
    </div>
  );

  // ================= TAMPILAN UTAMA PROFIL =================
  if (view === 'pribadi') return <DataPribadiView />;
  if (view === 'security') return <SecurityView />;
  if (view === 'notif') return <NotificationView />;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.btnBack}>←</button>
        <h4 style={styles.headerTitle}>Profil Akun</h4>
        <div style={{ width: '24px' }}></div>
      </div>
      <div style={styles.scrollBody}>
        <div style={styles.mainIdSection}>
          <div style={styles.avatarLarge}>🧑‍💻</div>
          <h3 style={styles.userName}>Amrullah</h3>
          <p style={styles.userNik}>NIK: 3519********0892</p>
        </div>
        <div style={styles.menuGrid}>
          <div onClick={() => setView('pribadi')} style={styles.menuFullItem}>
            <span>👤 Informasi Pribadi</span>
            <span>›</span>
          </div>
          <div onClick={() => setView('security')} style={styles.menuFullItem}>
            <span>🔒 Keamanan & Security</span>
            <span>›</span>
          </div>
          <div onClick={() => setView('notif')} style={styles.menuFullItem}>
            <span>🔔 Pengaturan Notifikasi</span>
            <span>›</span>
          </div>
          <div onClick={() => navigate('/')} style={{...styles.menuFullItem, color:'#E53E3E'}}>
            <span>🚪 Keluar Aplikasi</span>
            <span>›</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%', height: '100%', background: '#F8FAFC', display: 'flex', flexDirection: 'column', position: 'relative' },
  header: { background: '#1A56DB', color: '#fff', padding: '35px 16px 12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  btnBack: { background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' },
  headerTitle: { margin: 0, fontSize: '15px' },
  headerBrand: { fontWeight: 'bold', letterSpacing: '0.5px' },
  scrollBody: { flex: 1, padding: '20px 16px', overflowY: 'auto' },

  /* Data Pribadi Card */
  idCardBlue: { background: '#0B4596', borderRadius: '20px', padding: '24px', color: '#fff', position: 'relative', marginBottom: '25px', boxShadow: '0 10px 20px rgba(11,69,150,0.2)' },
  idBadge: { background: 'rgba(255,255,255,0.2)', fontSize: '8px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px', width: 'fit-content', marginBottom: '15px' },
  idName: { margin: 0, fontSize: '24px', fontWeight: '800' },
  idNumber: { margin: '5px 0 0 0', fontSize: '12px', opacity: 0.7 },
  checkIcon: { position: 'absolute', top: '24px', right: '24px', fontSize: '24px' },
  
  sectionHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', marginTop: '10px' },
  sectionTitleBlack: { fontSize: '13px', fontWeight: '800', color: '#1E293B', letterSpacing: '0.5px' },
  btnUpdate: { fontSize: '10px', color: '#1A56DB', fontWeight: 'bold', cursor: 'pointer' },
  
  inputGroup: { marginBottom: '15px' },
  inputLabel: { fontSize: '9px', fontWeight: 'bold', color: '#94A3B8', marginBottom: '6px', display: 'block' },
  inputBox: { background: '#FFF', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', color: '#1E293B' },

  /* Security Protocol */
  securityBanner: { background: '#0B4596', borderRadius: '20px', padding: '24px', color: '#fff', marginBottom: '20px' },
  bannerTitleLarge: { margin: 0, fontSize: '22px', fontWeight: '800' },
  bannerSubText: { fontSize: '11px', opacity: 0.8, marginTop: '8px', lineHeight: '1.4' },
  statusRow: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '15px' },
  greenPulse: { width: '8px', height: '8px', background: '#38A169', borderRadius: '50%', boxShadow: '0 0 8px #38A169' },
  statusText: { fontSize: '8px', fontWeight: 'bold', letterSpacing: '0.5px' },

  securityCard: { background: '#FFF', borderRadius: '20px', padding: '20px', border: '1px solid #E2E8F0', marginBottom: '15px' },
  securityCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  lockIcon: { background: '#F1F5F9', padding: '8px', borderRadius: '10px' },
  lastChangedText: { fontSize: '8px', fontWeight: 'bold', color: '#94A3B8' },
  cardMainTitle: { margin: 0, fontSize: '15px', fontWeight: 'bold' },
  cardSubTitle: { fontSize: '10px', color: '#64748B', lineHeight: '1.4', marginTop: '6px' },
  btnChangePassword: { width: '100%', marginTop: '15px', background: '#FF9567', border: 'none', padding: '10px', borderRadius: '10px', color: '#FFF', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' },

  gridSecurity: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  gridItem: { background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '15px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px' },
  gridIcon: { fontSize: '20px' },
  gridTitle: { margin: 0, fontSize: '12px' },
  gridStatusText: { fontSize: '8px', fontWeight: 'bold', color: '#94A3B8' },

  /* Notification Settings */
  groupTitle: { fontSize: '11px', fontWeight: '800', color: '#1E293B', marginTop: '20px', marginBottom: '12px' },
  notifItem: { background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '15px', padding: '15px', display: 'flex', alignItems: 'center', marginBottom: '10px' },
  notifIconBox: { width: '35px', height: '35px', background: '#F1F5F9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  notifMainText: { margin: 0, fontSize: '12px', fontWeight: 'bold' },
  notifSubText: { margin: 0, fontSize: '9px', color: '#64748B' },
  notifListItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5px', borderBottom: '1px solid #E2E8F0' },
  listItemText: { fontSize: '11px', fontWeight: '600' },

  /* Toggle Switch */
  toggleBg: { width: '34px', height: '16px', borderRadius: '20px', padding: '2px', cursor: 'pointer', transition: '0.3s' },
  toggleCircle: { width: '12px', height: '12px', background: '#FFF', borderRadius: '50%', transition: '0.3s' },

  /* Main Profile */
  mainIdSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px', marginTop: '10px' },
  avatarLarge: { width: '80px', height: '80px', background: '#1A56DB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#FFF' },
  userName: { margin: '15px 0 5px 0', fontSize: '20px', fontWeight: '800' },
  userNik: { fontSize: '11px', color: '#94A3B8' },
  menuGrid: { background: '#FFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E2E8F0' },
  menuFullItem: { padding: '18px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }
};

export default Profil;