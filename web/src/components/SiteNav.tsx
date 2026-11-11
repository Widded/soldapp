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
    <header className="sz-nav">
      <div className="sz-nav-inner">
        <Link to="/" className="sz-logo" onClick={close}>
          SOLD<span>.</span>
        </Link>

        <nav className={open ? 'sz-links open' : 'sz-links'}>
          <a href={anchor('nasil')} onClick={close}>
            Nasıl çalışır
          </a>
          <a href={anchor('ozellikler')} onClick={close}>
            Özellikler
          </a>
          <a href={anchor('fiyat')} onClick={close}>
            Fiyat
          </a>
          <a href={anchor('sss')} onClick={close}>
            SSS
          </a>
        </nav>

        <div className="sz-nav-actions">
          {user ? (
            <Link to="/panel" className="sz-btn sz-btn-primary sz-btn-sm">
              Panele git
            </Link>
          ) : (
            <>
              <Link to="/giris" className="sz-btn sz-btn-ghost sz-btn-sm">
                Giriş
              </Link>
              <Link to="/kayit" className="sz-btn sz-btn-primary sz-btn-sm">
                Başla
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="sz-burger"
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
