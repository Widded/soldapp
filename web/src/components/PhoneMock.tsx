export function PhoneMock() {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="phone-top">
          <span className="phone-brand">kaç saat?</span>
          <span className="phone-rate">₺138/saat</span>
        </div>

        <div className="phone-label">Bu, senin</div>
        <div className="phone-value">3 gün 3 saat</div>
        <div className="phone-sub">emeğin.</div>

        <div className="phone-item">
          <span>Yeni telefon</span>
          <strong>₺4.499</strong>
        </div>

        <div className="phone-bar">
          <div className="phone-bar-fill" />
        </div>
        <div className="phone-meta">
          <span>33 saat</span>
          <span>≈ 3 iş günü</span>
        </div>

        <div className="phone-actions">
          <span>Listeye ekle</span>
          <span>Paylaş</span>
        </div>
      </div>
    </div>
  );
}
