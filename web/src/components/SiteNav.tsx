import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function SiteNav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Link to="/" className="site-logo" onClick={close}>
          kaç saat<span>?</span>
        </Link>

        <nav className={open ? 'site-links open' : 'site-links'}>
          <a href="#nasil" onClick={close}>
            Nasıl çalışır
          </a>
          <a href="#ozellikler" onClick={close}>
            Özellikler
          </a>
          <a href="#fiyat" onClick={close}>
            Fiyat
          </a>
          <a href="#sss" onClick={close}>
            SSS
          </a>
        </nav>

        <div className="site-actions">
          {user ? (
            <Link to="/panel" className="btn btn-primary btn-sm">
              Panele git
            </Link>
          ) : (
            <>
              <Link to="/giris" className="btn btn-ghost btn-sm">
                Giriş yap
              </Link>
              <Link to="/kayit" className="btn btn-primary btn-sm">
                Ücretsiz başla
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label="Menüyü aç"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
