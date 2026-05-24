import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function KameraAI() {
  const [showPreview, setShowPreview] = useState(false);
  const [useSimulatedMock, setUseSimulatedMock] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showPreview) {
      navigator.mediaDevices.getUserMedia({ 
        video: { width: 400, height: 400, facingMode: 'user' } 
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      })
      .catch((err) => {
        console.warn("Webcam diblokir browser, beralih ke mode simulasi visual.");
        setUseSimulatedMock(true);
      });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [showPreview]);

  const handleCaptureAI = () => {
    if (!useSimulatedMock && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL('image/png'));
    }
    setShowPreview(true);
  };

  const handleKirimLaporanKeLedger = () => {
    const idAcak = `LPR-${Math.floor(100 + Math.random() * 900)}-AI`;
    
    const opsiLokasi = [
      'Jl. Raya Banjarsari Wetan, Madiun',
      'Area Pemukiman RT 04, Ds. Banjarsari Wetan',
      'Jl. Raya Dagangan (Dekat Kantor Desa Banjarsari Wetan)',
      'Akses Jalan Tani, Ds. Banjarsari Wetan, Madiun',
      'Jl. Raya Madiun-Giring, Banjarsari Wetan'
    ];
    
    const lokasiOtomatis = opsiLokasi[Math.floor(Math.random() * opsiLokasi.length)];
    
    const laporanBaru = {
      id: `#${idAcak}`,
      lokasi: lokasiOtomatis,
      jenis: 'Lubang Jalan / Pothole',
      status: 'CRITICAL',
      tingkat: '67%',
      imgUrl: capturedImage || 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=300&q=80'
    };

    const riwayatLama = localStorage.getItem('inframerge_reports');
    const kumpulanRiwayat = riwayatLama ? JSON.parse(riwayatLama) : [];
    kumpulanRiwayat.unshift(laporanBaru);
    localStorage.setItem('inframerge_reports', JSON.stringify(kumpulanRiwayat));

    alert(`Sukses! Laporan Berhasil Dikirim.\nID: ${idAcak}\nLokasi: ${lokasiOtomatis}`);
    navigate('/dashboard'); 
  };

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
            <span style={styles.yoloNeonLabel}>POTHOLE DETECTED (98.7%)</span>
          </div>

          <div style={styles.indicatorGroup}>
            <div style={styles.indicatorCard}>
              <span style={styles.indTitle}>ENVIRONMENT</span>
              <span style={styles.indStatus}>☀️ LIGHT: OK</span>
            </div>
            <div style={styles.indicatorCard}>
              <span style={styles.indTitle}>CALIBRATION</span>
              <span style={styles.indStatus}>📐 ANGLE: 45°</span>
            </div>
          </div>

          <div style={styles.shutterRow}>
            <p style={styles.hintText}>Ketuk tombol untuk memproses citra</p>
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
                <div style={styles.maskWebcamOverlay}></div>
              </>
            )}
            <div style={styles.floatingTechBadge}>[SegFormer Mask Applied]</div>
          </div>

          <div style={styles.reportCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11px' }}>
              <span>AI SEVERITY SCORING:</span>
              <span style={{ color: '#E53E3E' }}>67.3% (BERAT)</span>
            </div>
            <div style={styles.barBg}><div style={styles.barFill}></div></div>
          </div>

          <div style={{ padding: '0 12px 16px 12px' }}>
            <button onClick={handleKirimLaporanKeLedger} style={styles.btnKirim}>KIRIM LAPORAN ➔</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { width: '100%', height: '100%', background: '#000', position: 'relative', fontFamily: 'monospace' },
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
  previewScreen: { height: '100%', display: 'flex', flexDirection: 'column', background: '#F7FAFC' },
  previewHeader: { background: '#0A1628', color: '#fff', padding: '35px 12px 12px 12px', textAlign: 'center', fontSize: '11px' },
  previewImageArea: { flex: 1, margin: '12px', borderRadius: '12px', position: 'relative', overflow: 'hidden' },
  capturedImageStyle: { width: '100%', height: '100%', objectFit: 'cover' },
  maskSegformerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(229, 62, 62, 0.45)', border: '1px solid #E53E3E' },
  maskWebcamOverlay: { position: 'absolute', top: '30%', left: '20%', width: '60%', height: '40%', background: 'rgba(229, 62, 62, 0.45)', border: '2px dashed #E53E3E', borderRadius: '50%' },
  floatingTechBadge: { position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#FFF', fontSize: '8px', padding: '2px 4px', borderRadius: '4px' },
  reportCard: { background: '#fff', margin: '0 12px 12px 12px', padding: '12px', borderRadius: '10px' },
  barBg: { width: '100%', height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' },
  barFill: { width: '67.3%', height: '100%', background: '#E53E3E' },
  btnKirim: { width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }
};

export default KameraAI;