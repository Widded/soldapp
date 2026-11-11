import { Link, useLocation } from 'react-router-dom';

export function SiteFooter() {
  const { pathname } = useLocation();
  const anchor = (id: string) => (pathname === '/' ? `#${id}` : `/#${id}`);

  return (
    <footer className="lp-footer">
      <div className="lp-footer-inner">
        <div className="lp-footer-brand">
          <Link to="/" className="lp-logo lp-logo-lg">
            SOLD<span>.</span>
          </Link>
          <p>Fiyatları ömrüne çevir. Az tüket, çok yaşa.</p>
        </div>

        <div className="lp-footer-cols">
          <div>
            <h4>Ürün</h4>
            <a href={anchor('akis')}>Akış</a>
            <a href={anchor('defter')}>Defter</a>
            <a href={anchor('fiyat')}>Fiyat</a>
          </div>
          <div>
            <h4>Hesap</h4>
            <Link to="/giris">Giriş yap</Link>
            <Link to="/kayit">Kayıt ol</Link>
            <Link to="/panel">Panel</Link>
          </div>
          <div>
            <h4>Destek</h4>
            <a href={anchor('sss')}>SSS</a>
            <a href="mailto:destek@sold.app">destek@sold.app</a>
            <a href="#">Gizlilik</a>
          </div>
        </div>
      </div>

      <div className="lp-footer-bottom">
        <span>© 2026 SOLD. Tüm hakları saklıdır.</span>
        <span>İstanbul'da yapıldı.</span>
      </div>
    </footer>
  );
}
