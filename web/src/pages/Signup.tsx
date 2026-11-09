import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { useAuth } from '../lib/auth';
import { isSupabaseConfigured } from '../lib/supabase';

export function Signup() {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate('/panel', { replace: true });
  }, [user, navigate]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalı.');
      return;
    }

    setBusy(true);
    const result = await signUp(email, password);
    setBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.needsConfirmation) {
      setInfo(
        'Hesabın oluşturuldu. Giriş yapabilmek için e-postandaki onay bağlantısına tıkla.'
      );
      return;
    }

    navigate('/panel');
  };

  return (
    <div className="site">
      <SiteNav />

      <main className="auth-page">
        <div className="auth-card">
          <span className="eyebrow">Ücretsiz başla</span>
          <h1>Hesabını oluştur</h1>
          <p className="auth-sub">
            30 saniyede kur. Kredi kartı yok, taahhüt yok.
          </p>

          <form className="auth-form" onSubmit={submit}>
            <label>
              E-posta
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="sen@ornek.com"
              />
            </label>

            <label>
              Şifre
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="En az 6 karakter"
              />
            </label>

            {error && <div className="form-error">{error}</div>}
            {info && <div className="form-info">{info}</div>}

            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Hesap oluşturuluyor…' : 'Ücretsiz başla'}
            </button>
          </form>

          {!isSupabaseConfigured && (
            <div className="demo-box">
              <strong>Demo modu</strong>
              <p>
                Supabase anahtarları eklenmediği için hesap bu cihazda
                oluşturulur. Gerçek bulut senkronizasyonu için `.env` dosyasına
                anahtarları ekle.
              </p>
            </div>
          )}

          <p className="auth-foot">
            Zaten hesabın var mı? <Link to="/giris">Giriş yap</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
