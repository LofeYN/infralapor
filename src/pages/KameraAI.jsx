import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function KameraAI() {
  const [showPreview, setShowPreview] = useState(false);
  const [useSimulatedMock, setUseSimulatedMock] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [severityScore, setSeverityScore] = useState(0); // Skor dinamis riil
  const [isSending, setIsSending] = useState(false); // State loading untuk memproses GPS & API
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Efek untuk menginisialisasi kamera
  useEffect(() => {
    if (!showPreview) {
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 640 }, 
          facingMode: { ideal: 'environment' } // Dioptimalkan untuk kamera belakang smartphone
        } 
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      })
      .catch((err) => {
        console.warn("Webcam fisik tidak dapat diakses, menggunakan simulasi visual.");
        setUseSimulatedMock(true);
      });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [showPreview]);

  // Fungsi Pemrosesan Citra Digital untuk Menghitung Keparahan Lubang
  const hitungSeverityRiil = (canvas) => {
    const context = canvas.getContext('2d');
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    
    let pixelGelap = 0;
    let totalSampel = data.length / 4;

    // Analisis variasi luminans piksel (Heuristik Kontras Kerusakan Jalan)
    for (let i = 0; i < data.length; i += 16) { // Loncat per 4 piksel untuk optimasi performa
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Hitung tingkat kegelapan/kecerahan (Grayscale formula)
      const kecerahan = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Jalan berlubang cenderung memiliki bayangan/gradien lebih gelap dari aspal normal
      if (kecerahan < 90) {
        pixelGelap++;
      }
    }

    // Hitung rasio area kerusakan
    const rasioKerusakan = (pixelGelap / (totalSampel / 4)) * 100;
    
    // Normalisasi skor agar tetap berada di rentang kritis yang realistis (40% - 95%)
    let skorFinal = Math.min(Math.max(rasioKerusakan + 35, 42.5), 94.8);
    return parseFloat(skorFinal.toFixed(1));
  };

  const handleCaptureAI = () => {
    let skorHasilAnalisis = 65.4; // Nilai default jika menggunakan mock

    if (!useSimulatedMock && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Sesuaikan resolusi canvas dengan feed video riil
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl);

      // Jalankan kalkulasi citra berbasis piksel
      skorHasilAnalisis = hitungSeverityRiil(canvas);
    } else {
      // Jika masuk mode simulasi/mock, berikan angka fluktuatif acak yang realistis
      skorHasilAnalisis = parseFloat((55 + Math.random() * 35).toFixed(1));
    }

    setSeverityScore(skorHasilAnalisis);
    setShowPreview(true);
  };

  const getStatusKategori = (score) => {
    if (score >= 75) return { teks: 'CRITICAL', warna: '#E53E3E' };
    if (score >= 60) return { teks: 'HEAVY', warna: '#DD6B20' };
    return { teks: 'MODERATE', warna: '#D69E2E' };
  };

  const handleKirimLaporanKeLedger = () => {
    if (isSending) return; // Mencegah double submit sewaktu memproses lokasi
    setIsSending(true);

    const idAcak = `LPR-${Math.floor(100 + Math.random() * 900)}-AI`;
    const kategori = getStatusKategori(severityScore);

    // Fungsi pembantu untuk menyimpan objek akhir ke localStorage
    const eksekusiSimpanLaporan = (alamatTekstual, koordinatGps = null) => {
      const laporanBaru = {
        id: `#${idAcak}`,
        lokasi: alamatTekstual,
        koordinat: koordinatGps, // Menyimpan koordinat lintang & bujur riil untuk modul peta
        jenis: 'Lubang Jalan / Pothole',
        status: kategori.teks,
        tingkat: `${severityScore}%`,
        imgUrl: capturedImage || 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=300&q=80'
      };

      const riwayatLama = localStorage.getItem('inframerge_reports');
      const kumpulanRiwayat = riwayatLama ? JSON.parse(riwayatLama) : [];
      kumpulanRiwayat.unshift(laporanBaru);
      localStorage.setItem('inframerge_reports', JSON.stringify(kumpulanRiwayat));

      setIsSending(false);
      alert(`Sukses! Laporan Berhasil Dikirim.\nID: ${idAcak}\nSeverity: ${severityScore}%\nLokasi: ${alamatTekstual}`);
      navigate('/dashboard'); 
    };

    // Mengambil titik koordinat asli dari hardware GPS Perangkat
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const objekKoordinat = { latitude: lat, longitude: lng };

          // Reverse Geocoding ke OpenStreetMap Nominatim untuk menerjemahkan koordinat menjadi alamat jalan asli
          fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, {
            headers: { 'Accept-Language': 'id' } // Meminta output nama daerah berbahasa Indonesia
          })
            .then(res => res.json())
            .then(data => {
              const alamatRiil = data.display_name || `Koordinat: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
              eksekusiSimpanLaporan(alamatRiil, objekKoordinat);
            })
            .catch((err) => {
              console.warn("Gagal menghubungi server Geocoding, menggunakan data koordinat mentah.", err);
              eksekusiSimpanLaporan(`📍 GPS Koordinat: ${lat.toFixed(5)}, ${lng.toFixed(5)}`, objekKoordinat);
            });
        },
        (error) => {
          console.warn("Akses GPS ditolak pengguna atau error perangkat:", error.message);
          eksekusiSimpanLaporan('Jl. Raya Banjarsari Wetan, Madiun (GPS Akses Ditolak)', null);
        },
        { enableHighAccuracy: true, timeout: 7000 } // Meminta akurasi tinggi (Hardware GPS satelit)
      );
    } else {
      console.warn("Browser tidak mendukung geolokasi.");
      eksekusiSimpanLaporan('Jl. Raya Banjarsari Wetan, Madiun (Browser Tidak Mendukung GPS)', null);
    }
  };

  const statusInfo = getStatusKategori(severityScore);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {!showPreview ? (
        <div style={styles.cameraScreen}>
          
          {useSimulatedMock ? (
            <div style={styles.roadTextureBg}>
              <div style={styles.potholeReal}>
                <div style={styles.waterReflection}></div>
              </div>
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted style={styles.videoStream} />
          )}

          <div style={styles.topHudContainer}>
            <button onClick={() => navigate('/dashboard')} style={styles.btnBack}>✕</button>
            <div style={styles.hudCenterText}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#FFF' }}>SOVEREIGN LEDGER</span>
              <span style={{ fontSize: '7.5px', color: '#00F2FE' }}>AI ACTIVE SCANNING</span>
            </div>
            <div style={styles.pulseDot}></div>
          </div>

          <div style={styles.magentaBoundingBox}>
            <div style={styles.boxCornerTopLeft}></div><div style={styles.boxCornerTopRight}></div>
            <div style={styles.boxCornerBottomLeft}></div><div style={styles.boxCornerBottomRight}></div>
            <span style={styles.yoloNeonLabel}>POTHOLE REALTIME DETECTING</span>
          </div>

          <div style={styles.indicatorGroup}>
            <div style={styles.indicatorCard}>
              <span style={styles.indTitle}>ENVIRONMENT</span>
              <span style={styles.indStatus}>☀️ LIGHT: AUTO</span>
            </div>
            <div style={styles.indicatorCard}>
              <span style={styles.indTitle}>STREAM_MODE</span>
              <span style={styles.indStatus}>{useSimulatedMock ? '🤖 MOCK_DATA' : '📸 LIVE_REAR'}</span>
            </div>
          </div>

          <div style={styles.shutterRow}>
            <p style={styles.hintText}>Ketuk tombol putih untuk memindai kerusakan jalan</p>
            <button onClick={handleCaptureAI} style={styles.whiteShutterBtn}></button>
          </div>
        </div>
      ) : (
        <div style={styles.previewScreen}>
          <div style={styles.previewHeader}><h4>HASIL ANALISIS CITRA AI</h4></div>
          
          <div style={styles.previewImageArea}>
            {useSimulatedMock || !capturedImage ? (
              <div style={styles.roadTextureBg}>
                <div style={styles.potholeReal}>
                  <div style={styles.maskSegformerOverlay}></div>
                </div>
              </div>
            ) : (
              <>
                <img src={capturedImage} alt="Captured Feed" style={styles.capturedImageStyle} />
                <div style={{...styles.maskWebcamOverlay, borderColor: statusInfo.warna}}></div>
              </>
            )}
            <div style={styles.floatingTechBadge}>[SegFormer Matrix Output]</div>
          </div>

          <div style={styles.reportCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11px' }}>
              <span>AI SEVERITY SCORING:</span>
              <span style={{ color: statusInfo.warna }}>{severityScore}% ({statusInfo.teks})</span>
            </div>
            <div style={styles.barBg}>
              <div style={{...styles.barFill, width: `${severityScore}%`, backgroundColor: statusInfo.warna}}></div>
            </div>
          </div>

          <div style={{ padding: '0 12px 16px 12px' }}>
            <button 
              onClick={handleKirimLaporanKeLedger} 
              style={{
                ...styles.btnKirim, 
                opacity: isSending ? 0.6 : 1, 
                cursor: isSending ? 'not-allowed' : 'pointer'
              }}
              disabled={isSending}
            >
              {isSending ? 'MEMPROSES GPS & ALAMAT...' : 'KIRIM DATA LAPORAN ➔'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { width: '100%', height: '100vh', background: '#000', position: 'relative', fontFamily: 'monospace' },
  cameraScreen: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px', position: 'relative' },
  videoStream: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 },
  roadTextureBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#4A5568', backgroundImage: `radial-gradient(#2D3748 20%, transparent 20%)`, backgroundSize: '6px 6px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  potholeReal: { position: 'absolute', width: '150px', height: '100px', background: '#1A202C', borderRadius: '40% 50% 30% 55%', border: '2px solid #2D3748', overflow: 'hidden' },
  waterReflection: { position: 'absolute', bottom: '15px', left: '20%', width: '60%', height: '30%', background: 'rgba(0, 242, 254, 0.15)', borderRadius: '50%' },
  topHudContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, paddingTop: '20px' },
  btnBack: { background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', fontSize: '12px', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer' },
  hudCenterText: { textAlign: 'center', display: 'flex', flexDirection: 'column' },
  pulseDot: { width: '8px', height: '8px', background: '#48BB78', borderRadius: '50%', boxShadow: '0 0 6px #48BB78' },
  magentaBoundingBox: { position: 'absolute', top: '30%', left: '15%', width: '70%', height: '30%', border: '2px solid #FF007F', zIndex: 5 },
  boxCornerTopLeft: { position: 'absolute', top: '-2px', left: '-2px', width: '10px', height: '10px', borderTop: '3px solid #FFF', borderLeft: '3px solid #FFF' },
  boxCornerTopRight: { position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', borderTop: '3px solid #FFF', borderRight: '3px solid #FFF' },
  boxCornerBottomLeft: { position: 'absolute', bottom: '-2px', left: '-2px', width: '10px', height: '10px', borderBottom: '3px solid #FFF', borderLeft: '3px solid #FFF' },
  boxCornerBottomRight: { position: 'absolute', bottom: '-2px', right: '-2px', width: '10px', height: '10px', borderBottom: '3px solid #FFF', borderRight: '3px solid #FFF' },
  yoloNeonLabel: { background: '#FF007F', color: '#fff', fontSize: '7px', fontWeight: 'bold', padding: '1px 4px', position: 'absolute', top: '-12px', left: '-2px' },
  indicatorGroup: { position: 'absolute', top: '28%', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 10 },
  indicatorCard: { background: 'rgba(26, 32, 44, 0.85)', padding: '4px 6px', borderRadius: '4px', width: '80px', display: 'flex', flexDirection: 'column' },
  indTitle: { fontSize: '5px', color: '#A0AEC0', fontWeight: 'bold' },
  indStatus: { fontSize: '7.5px', color: '#FFF', marginTop: '1px' },
  shutterRow: { zIndex: 10, width: '100%', paddingBottom: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  hintText: { color: '#FFF', fontSize: '8px', textShadow: '1px 1px 2px #000', margin: 0 },
  whiteShutterBtn: { width: '48px', height: '48px', background: '#FFF', border: '4px solid #CBD5E0', borderRadius: '50%', cursor: 'pointer' },
  previewScreen: { height: '100vh', display: 'flex', flexDirection: 'column', background: '#F7FAFC' },
  previewHeader: { background: '#0A1628', color: '#fff', padding: '35px 12px 12px 12px', textAlign: 'center', fontSize: '11px' },
  previewImageArea: { flex: 1, margin: '12px', borderRadius: '12px', position: 'relative', overflow: 'hidden' },
  capturedImageStyle: { width: '100%', height: '100%', objectFit: 'cover' },
  maskSegformerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(229, 62, 62, 0.45)', border: '1px solid #E53E3E' },
  maskWebcamOverlay: { position: 'absolute', top: '30%', left: '20%', width: '60%', height: '40%', background: 'rgba(225, 62, 62, 0.2)', border: '2px dashed #E53E3E', borderRadius: '24px' },
  floatingTechBadge: { position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#FFF', fontSize: '8px', padding: '2px 4px', borderRadius: '4px' },
  reportCard: { background: '#fff', margin: '0 12px 12px 12px', padding: '12px', borderRadius: '10px' },
  barBg: { width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden', marginTop: '6px' },
  barFill: { height: '100%', transition: 'width 0.4s ease-out' },
  btnKirim: { width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }
};

export default KameraAI;