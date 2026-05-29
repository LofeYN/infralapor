const styles = {
  // Gunakan 100dvh agar pas di layar HP
  container: { width: '100%', height: '100dvh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', position: 'relative' },
  
  // Header disesuaikan (padding 16px) agar seragam dengan halaman lainnya
  header: { background: '#1A56DB', color: '#fff', padding: '16px 16px 14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 },
  btnBack: { background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' },
  headerTitle: { margin: 0, fontSize: '15px' },
  headerBrand: { fontWeight: 'bold', letterSpacing: '0.5px' },
  
  // Body dibuat bisa scroll dengan nyaman
  scrollBody: { flex: 1, padding: '20px 16px 40px 16px', overflowY: 'auto' },

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

  toggleBg: { width: '34px', height: '16px', borderRadius: '20px', padding: '2px', cursor: 'pointer', transition: '0.3s' },
  toggleCircle: { width: '12px', height: '12px', background: '#FFF', borderRadius: '50%', transition: '0.3s' },

  /* Main Profile */
  mainIdSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px', marginTop: '10px' },
  avatarLarge: { width: '80px', height: '80px', background: '#1A56DB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#FFF', position: 'relative', cursor: 'pointer', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cameraOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.4)', color: '#FFF', fontSize: '10px', textAlign: 'center', padding: '2px 0', opacity: 0, transition: 'opacity 0.2s' },
  userName: { margin: '15px 0 5px 0', fontSize: '20px', fontWeight: '800' },
  userNik: { fontSize: '11px', color: '#94A3B8' },
  menuGrid: { background: '#FFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E2E8F0' },
  menuFullItem: { padding: '18px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }
};