import React, { useState } from 'react';
import logoLogin from '../assets/logo_login.png';

function Login() {
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (nik && password) {
      // 1. Cek database permanen (hasil dari Register)
      const dbUser = JSON.parse(localStorage.getItem('userDatabase') || '{}');

      // 2. Cocokkan NIK yang diketik dengan NIK di database
      // Jika cocok, tarik namanya. Jika tidak (login pakai NIK lain), beri nama default.
      const namaAsli = (dbUser.nik === nik) ? dbUser.nama : 'LOFE';
      const emailAsli = (dbUser.nik === nik) ? dbUser.email : '-';
      const avatarAsli = (dbUser.nik === nik) ? dbUser.avatar : null;

      // 3. Buat sesi login aktif baru
      const sessionData = {
        nama: namaAsli,
        nik: nik,
        email: emailAsli,
        telepon: '-',
        avatar: avatarAsli
      };

      // Simpan sebagai sesi aktif
      localStorage.setItem('userData', JSON.stringify(sessionData));

      // Lompat ke rute dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <img src={logoLogin} alt="Logo Infralapor" style={styles.logoImg} />
        </div>
        <h2 style={styles.brandTitle}>InfraLapor</h2>
        <p style={styles.brandSubtitle}>Secure Application Access</p>
      </div>

      <div style={styles.cardForm}>
        <div style={styles.badgeSecure}>ONLINE SECURE</div>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>NOMOR INDUK KEPENDUDUKAN (NIK)</label>
            <input 
              type="number" // 1. DIUBAH MENJADI NUMBER
              placeholder="Masukkan 16 digit NIK Anda" 
              value={nik}
              onChange={(e) => {
                const value = e.target.value;
                // 2. BATASI MAKSIMAL 16 DIGIT (karena type number abaikan maxLength)
                if (value.length <= 16) {
                  setNik(value);
                }
              }}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>KATA SANDI</label>
            <input 
              type="password" 
              placeholder="Masukkan kata sandi" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.btnSubmit}>
            MASUK ➔
          </button>
        </form>

        <div style={styles.divider}>atau</div>

        <button 
          type="button"
          onClick={() => window.location.href = '/register'} 
          style={styles.btnRegister}
        >
          Daftar Akun Baru
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#0A1628',
  },
  header: {
    padding: '40px 20px 20px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  logoContainer: {
    width: '100px',
    height: '100px',
    background: '#ffffff',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
    overflow: 'hidden', 
    padding: '8px'
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' 
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '8px 0 0 0',
  },
  brandSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '11px',
    margin: 0,
    letterSpacing: '0.5px',
  },
  cardForm: {
    flex: 1,
    background: '#ffffff',
    borderTopLeftRadius: '32px',
    borderTopRightRadius: '32px',
    padding: '30px 24px',
    display: 'flex',
    flexDirection: 'column',
  },
  badgeSecure: {
    alignSelf: 'center',
    background: '#FFF3E0',
    color: '#E65100',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '4px 12px',
    borderRadius: '12px',
    marginBottom: '20px',
    letterSpacing: '0.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    color: '#4A5568',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: '0.3px',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    background: '#F7FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#1A202C',
    outline: 'none',
  },
  btnSubmit: {
    marginTop: '10px',
    width: '100%',
    padding: '14px',
    background: '#0A1628',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(10,22,40,0.2)',
  },
  divider: {
    textAlign: 'center',
    color: '#A0AEC0',
    fontSize: '12px',
    margin: '20px 0',
    position: 'relative',
  },
  btnRegister: {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    color: '#0A1628',
    border: '2px solid #0A1628',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default Login;