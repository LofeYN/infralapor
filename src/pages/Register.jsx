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

    const newUser = {
      nama: formData.nama,
      nik: formData.nik,
      email: formData.email,
    };

    // 1. Simpan data user ke sesi login aktif
    localStorage.setItem('userData', JSON.stringify(newUser));
    // 2. Simpan ke database permanen agar tidak hilang saat dipanggil ulang di Login
    localStorage.setItem('userDatabase', JSON.stringify(newUser));

    alert(`Pendaftaran Sukses!\nAkun atas nama ${formData.nama} berhasil diamankan ke Sovereign Ledger.`);
    navigate('/login');
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
              type="number" // Membatasi hanya menerima input angka
              placeholder="16 Digit NIK Resmi"
              style={styles.input}
              value={formData.nik}
              onChange={(e) => {
                const value = e.target.value;
                // Membatasi NIK maksimal 16 digit
                if (value.length <= 16) {
                  setFormData({ ...formData, nik: value });
                }
              }}
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
  container: { width: '100%', height: '100vh', background: '#0A1628', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' },
  content: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  logoBadge: { fontSize: '40px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '20px', marginBottom: '12px' },
  title: { color: '#FFF', fontSize: '22px', fontWeight: 'bold', margin: 0 },
  subtitle: { color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: '4px 0 24px 0', textAlign: 'center' },
  form: { width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: 'rgba(255,255,255,0.6)', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.5px' },
  input: { 
    width: '100%', 
    boxSizing: 'border-box', // Mencegah form melebar keluar dari frame HP
    background: 'rgba(255,255,255,0.05)', 
    border: '1px solid rgba(255,255,255,0.1)', 
    padding: '14px', 
    borderRadius: '12px', 
    color: '#FFF', 
    fontSize: '12px', 
    outline: 'none' 
  },
  btnRegister: { width: '100%', padding: '14px', background: '#FFFFFF', color: '#0A1628', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
  footerText: { color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '24px' },
  linkText: { color: '#00F2FE', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }
};

export default Register;