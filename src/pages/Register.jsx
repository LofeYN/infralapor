import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nama: '', nik: '', email: '', password: '' });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.nik || !formData.email || !formData.password) {
      alert('Mohon isi semua kolom data pendaftaran!');
      return;
    }
    alert(`Pendaftaran Sukses!\nAkun atas nama ${formData.nama} berhasil diamankan ke Sovereign Ledger.`);
    navigate('/login'); // Setelah sukses, oper ke halaman login biar bisa masuk
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.logoBadge}>🛡️</div>
        <h2 style={styles.title}>Daftar Akun Baru</h2>
        <p style={styles.subtitle}>Sovereign Identity Registration System</p>

        {/* Form Pendaftaran */}
        <form onSubmit={handleRegisterSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>NAMA LENGKAP</label>
            <input 
              type="text" 
              placeholder="Masukkan nama sesuai KTP" 
              style={styles.input}
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>NOMOR INDUK KEPENDUDUKAN (NIK)</label>
            <input 
              type="number" 
              placeholder="16 Digit NIK Resmi" 
              style={styles.input}
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>ALAMAT EMAIL</label>
            <input 
              type="email" 
              placeholder="contoh@domain.com" 
              style={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>KATA SANDI / PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" style={styles.btnRegister}>
            DAFTARKAN IDENTITAS ➔
          </button>
        </form>

        {/* Link Kembali */}
        <p style={styles.footerText}>
          Sudah punya akun resmi?{' '}
          <span onClick={() => navigate('/login')} style={styles.linkText}>
            Masuk Sekarang
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%', height: '100%', background: '#0A1628', display: 'flex', flexDirection: 'column', justifycontent: 'center', justifyContent: 'center', padding: '24px' },
  content: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  logoBadge: { fontSize: '32px', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '16px', marginBottom: '12px' },
  title: { color: '#FFF', fontSize: '20px', fontWeight: 'bold', margin: 0 },
  subtitle: { color: 'rgba(255,255,255,0.5)', fontSize: '10px', margin: '4px 0 24px 0', textAlign: 'center' },
  form: { width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: 'rgba(255,255,255,0.6)', fontSize: '8px', fontWeight: 'bold', letterSpacing: '0.5px' },
  input: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px', color: '#FFF', fontSize: '11px', outline: 'none' },
  btnRegister: { width: '100%', padding: '12px', background: '#FFFFFF', color: '#0A1628', border: 'none', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
  footerText: { color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginTop: '20px' },
  linkText: { color: '#00F2FE', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }
};

export default Register;