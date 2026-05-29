import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profil() {
  const navigate = useNavigate();
  const [view, setView] = useState('main');

  // ── 1. STATE UNTUK DATA PRIBADI & AVATAR ───────────────────────────────────
  const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
  const [editData, setEditData] = useState({
    nama: savedUser.nama || 'Pengguna',
    nik: savedUser.nik || '-',
    email: savedUser.email || '-',
    telepon: savedUser.telepon || '-',
    avatar: savedUser.avatar || null, // Menyimpan string Base64 foto
  });

  // ── 2. STATE UNTUK SECURITY & NOTIFIKASI (TOGGLE) ───────────────────────────
  const [bioActive, setBioActive] = useState(true);
  const [mfaActive, setMfaActive] = useState(true);
  
  const [pushActive, setPushActive] = useState(true);
  const [emailActive, setEmailActive] = useState(false);
  
  const [notifReport, setNotifReport] = useState(true);
  const [notifReview, setNotifReview] = useState(true);
  const [notifCritical, setNotifCritical] = useState(true);

  // Masking NIK: tampilkan 4 digit awal & 4 digit akhir
  const maskedNik = editData.nik !== '-' && editData.nik.length >= 8
    ? editData.nik.replace(/^(\d{4}).*(\d{4})$/, '$1********$2')
    : '-';

  // ── 3. FUNGSI UBAH & SIMPAN FOTO PROFIL (BASE64) ───────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran file (opsional, misal maks 2MB agar localStorage tidak penuh)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const updatedData = { ...editData, avatar: base64String };
        
        // Update state dan langsung simpan ke localStorage
        setEditData(updatedData);
        localStorage.setItem('userData', JSON.stringify(updatedData));
      };
      reader.readAsDataURL(file);
    }
  };

  // ── 4. FUNGSI SIMPAN DATA PRIBADI Teks ─────────────────────────────────────
  const handleSimpanData = () => {
    localStorage.setItem('userData', JSON.stringify(editData));
    alert('✅ Data pribadi berhasil diperbarui!');
  };

  // Komponen Reusable untuk Toggle Switch
  const Toggle = ({ active, onClick }) => (
    <div onClick={onClick} style={{ ...styles.toggleBg, backgroundColor: active ? '#1A56DB' : '#CBD5E0' }}>
      <div style={{ ...styles.toggleCircle, transform: active ? 'translateX(18px)' : 'translateX(0)' }}></div>
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
      <div className="hilangkan-scrollbar" style={styles.scrollBody}>
        <div style={styles.idCardBlue}>
          <div style={styles.idBadge}>VERIFIED DIGITAL ID</div>
          <h2 style={styles.idName}>{editData.nama}</h2>
          <p style={styles.idNumber}>ID: SL-2024-0892</p>
          <div style={styles.checkIcon}>🛡️</div>
        </div>
        
        <div style={styles.sectionHeaderRow}>
          <h3 style={styles.sectionTitleBlack}>DATA PRIBADI</h3>
          <span onClick={handleSimpanData} style={styles.btnUpdate}>💾 SIMPAN PERUBAHAN</span>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>NAMA LENGKAP</label>
          <input 
            style={styles.inputBox} 
            value={editData.nama} 
            onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>NOMOR INDUK KEPENDUDUKAN (NIK)</label>
          <input 
            type="number"
            style={styles.inputBox} 
            value={editData.nik} 
            onChange={(e) => {
              if (e.target.value.length <= 16) {
                setEditData({ ...editData, nik: e.target.value });
              }
            }}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>ALAMAT EMAIL</label>
          <input 
            type="email"
            style={styles.inputBox} 
            value={editData.email} 
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>NOMOR TELEPON</label>
          <input 
            type="tel"
            placeholder="Mulai dengan 08..."
            style={styles.inputBox} 
            value={editData.telepon} 
            onChange={(e) => setEditData({ ...editData, telepon: e.target.value })}
          />
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
      <div className="hilangkan-scrollbar" style={styles.scrollBody}>
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
          <button 
            onClick={() => alert('Fitur ubah kata sandi akan segera hadir!')} 
            style={styles.btnChangePassword}
          >
            Change Password
          </button>
        </div>
        <div style={styles.gridSecurity}>
          <div style={styles.gridItem}>
            <span style={styles.gridIcon}>👤</span>
            <h5 style={styles.gridTitle}>Biometrics</h5>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={styles.gridStatusText}>{bioActive ? 'ENABLED' : 'DISABLED'}</span>
              <Toggle active={bioActive} onClick={() => setBioActive(!bioActive)} />
            </div>
          </div>
          <div style={styles.gridItem}>
            <span style={styles.gridIcon}>🔑</span>
            <h5 style={styles.gridTitle}>MFA Auth</h5>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={styles.gridStatusText}>{mfaActive ? 'ACTIVE' : 'INACTIVE'}</span>
              <Toggle active={mfaActive} onClick={() => setMfaActive(!mfaActive)} />
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
      <div className="hilangkan-scrollbar" style={styles.scrollBody}>
        <div style={styles.securityBanner}>
          <h2 style={styles.bannerTitleLarge}>Notification Settings</h2>
          <p style={styles.bannerSubText}>Manage how you receive alerts and updates regarding citizen reports.</p>
        </div>
        <h5 style={styles.groupTitle}>Delivery Channels</h5>
        <div style={styles.notifItem}>
          <div style={styles.notifIconBox}>🔔</div>
          <div style={{ flex: 1, marginLeft: '12px' }}>
            <h4 style={styles.notifMainText}>Push Notifications</h4>
            <p style={styles.notifSubText}>Instant alerts on your device</p>
          </div>
          <Toggle active={pushActive} onClick={() => setPushActive(!pushActive)} />
        </div>
        <div style={styles.notifItem}>
          <div style={styles.notifIconBox}>📧</div>
          <div style={{ flex: 1, marginLeft: '12px' }}>
            <h4 style={styles.notifMainText}>Email Summaries</h4>
            <p style={styles.notifSubText}>Weekly critical updates</p>
          </div>
          <Toggle active={emailActive} onClick={() => setEmailActive(!emailActive)} />
        </div>
        
        <h5 style={styles.groupTitle}>Report Status Updates</h5>
        <div style={styles.notifListItem}>
          <span style={styles.listItemText}>New Report Submission</span>
          <Toggle active={notifReport} onClick={() => setNotifReport(!notifReport)} />
        </div>
        <div style={styles.notifListItem}>
          <span style={styles.listItemText}>Official Review Started</span>
          <Toggle active={notifReview} onClick={() => setNotifReview(!notifReview)} />
        </div>
        <div style={styles.notifListItem}>
          <span style={{ ...styles.listItemText, color: '#E53E3E' }}>✨ Critical Resolution Alerts</span>
          <Toggle active={notifCritical} onClick={() => setNotifCritical(!notifCritical)} />
        </div>
      </div>
    </div>
  );

  // ================= ROUTING TAMPILAN =================
  if (view === 'pribadi') return <DataPribadiView />;
  if (view === 'security') return <SecurityView />;
  if (view === 'notif') return <NotificationView />;

  // ================= TAMPILAN UTAMA PROFIL =================
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.btnBack}>←</button>
        <h4 style={styles.headerTitle}>Profil Akun</h4>
        <div style={{ width: '24px' }}></div>
      </div>
      <div className="hilangkan-scrollbar" style={styles.scrollBody}>
        
        <div style={styles.mainIdSection}>
          {/* UBAH FOTO: Ketika div Avatar diklik, dia memicu klik pada input file */}
          <div 
            onClick={() => document.getElementById('avatarInput').click()} 
            style={styles.avatarLarge}
            title="Klik untuk ubah foto profil"
          >
            {editData.avatar ? (
              <img src={editData.avatar} alt="Profil" style={styles.avatarImg} />
            ) : (
              '🧑‍💻'
            )}
            <div style={styles.cameraOverlay}>📸</div>
          </div>

          {/* Input File Tersembunyi */}
          <input 
            type="file"
            id="avatarInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />

          <h3 style={styles.userName}>{editData.nama}</h3>
          <p style={styles.userNik}>NIK: {maskedNik}</p>
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
          <div 
            onClick={() => { 
              const confirmLogout = window.confirm("Apakah anda keluar dari akun ini?");
              if (confirmLogout) {
                localStorage.removeItem('userData'); 
                navigate('/'); 
              }
            }} 
            style={{ ...styles.menuFullItem, color: '#E53E3E' }}
          >
            <span>🚪 Keluar Aplikasi</span>
            <span>›</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%', height: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', position: 'relative' },
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
  btnUpdate: { fontSize: '10px', color: '#1A56DB', fontWeight: 'bold', cursor: 'pointer', background: '#EBF4FF', padding: '6px 10px', borderRadius: '8px' },

  inputGroup: { marginBottom: '15px' },
  inputLabel: { fontSize: '9px', fontWeight: 'bold', color: '#94A3B8', marginBottom: '6px', display: 'block' },
  inputBox: { width: '100%', boxSizing: 'border-box', background: '#FFF', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', color: '#1E293B', outline: 'none' },

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
  
  // Modifikasi avatar agar rapi, overflow hidden menjaga gambar tetap bulat sempurna
  avatarLarge: { width: '80px', height: '80px', background: '#1A56DB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#FFF', position: 'relative', cursor: 'pointer', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cameraOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.4)', color: '#FFF', fontSize: '10px', textAlign: 'center', padding: '2px 0', opacity: 0, transition: 'opacity 0.2s' },
  // memunculkan ikon kamera kecil saat di-hover (opsional desktop style)
  ':hover > cameraOverlay': { opacity: 1 }, 

  userName: { margin: '15px 0 5px 0', fontSize: '20px', fontWeight: '800' },
  userNik: { fontSize: '11px', color: '#94A3B8' },
  menuGrid: { background: '#FFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E2E8F0' },
  menuFullItem: { padding: '18px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }
};

export default Profil;