import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="site-logo">
            kaç saat<span>?</span>
          </div>
          <p>Fiyatları ömrüne çevir. Az tüket, çok yaşa.</p>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Ürün</h4>
            <a href="#nasil">Nasıl çalışır</a>
            <a href="#ozellikler">Özellikler</a>
            <a href="#fiyat">Fiyat</a>
          </div>
          <div>
            <h4>Hesap</h4>
            <Link to="/giris">Giriş yap</Link>
            <Link to="/kayit">Kayıt ol</Link>
            <Link to="/panel">Panel</Link>
          </div>
          <div>
            <h4>Destek</h4>
            <a href="#sss">SSS</a>
            <a href="mailto:destek@kacsaat.app">destek@kacsaat.app</a>
            <a href="#">Gizlilik</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 kaç saat? Tüm hakları saklıdır.</span>
        <span>İstanbul'da yapıldı.</span>
      </div>
    </footer>
  );
}
