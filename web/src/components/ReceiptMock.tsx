export function ReceiptMock() {
  return (
    <div className="receipt-wrap">
      <div className="receipt">
        <div className="receipt-head">
          <span className="receipt-brand">KAÇ SAAT?</span>
          <span className="receipt-no">FİŞ NO. 0042</span>
        </div>

        <div className="receipt-rule" />

        <div className="receipt-row">
          <span>ÜRÜN</span>
          <span>Yeni telefon</span>
        </div>
        <div className="receipt-row">
          <span>FİYAT</span>
          <span>₺4.499</span>
        </div>
        <div className="receipt-row">
          <span>SAATLİK DEĞER</span>
          <span>₺138</span>
        </div>

        <div className="receipt-rule dashed" />

        <div className="receipt-total">
          <span>TOPLAM EMEK</span>
          <strong>33 saat</strong>
        </div>
        <div className="receipt-sub">≈ 3 gün 3 saat</div>

        <div className="receipt-rule dashed" />

        <div className="receipt-note">
          BU ALIŞVERİŞ ÖMRÜNDEN 3 GÜN ALIYOR.
        </div>

        <div className="receipt-barcode" />
        <div className="receipt-foot">kaçsaat.app</div>
      </div>

      <div className="receipt-stamp">DEĞER Mİ?</div>
    </div>
  );
}
