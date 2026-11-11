import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function SiteNav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const close = () => setOpen(false);
  const anchor = (id: string) => (pathname === '/' ? `#${id}` : `/#${id}`);

  return (
    <header className="lp-nav">
      <div className="lp-nav-inner">
        <Link to="/" className="lp-logo" onClick={close}>
          SOLD<span>.</span>
        </Link>

        <nav className={open ? 'lp-links open' : 'lp-links'}>
          <a href={anchor('akis')} onClick={close}>
            Akış
          </a>
          <a href={anchor('defter')} onClick={close}>
            Defter
          </a>
          <a href={anchor('uygulama')} onClick={close}>
            Uygulama
          </a>
          <a href={anchor('fiyat')} onClick={close}>
            Fiyat
          </a>
          <a href={anchor('sss')} onClick={close}>
            SSS
          </a>
        </nav>

        <div className="lp-nav-actions">
          {user ? (
            <Link to="/panel" className="lp-btn lp-btn-solid lp-btn-sm">
              Panele git
            </Link>
          ) : (
            <>
              <Link to="/giris" className="lp-btn lp-btn-line lp-btn-sm">
                Giriş
              </Link>
              <Link to="/kayit" className="lp-btn lp-btn-solid lp-btn-sm">
                Başla
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="lp-burger"
          aria-label="Menüyü aç"
          aria-expanded={open}
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
