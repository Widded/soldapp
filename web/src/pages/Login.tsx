import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { useAuth } from '../lib/auth';
import { isSupabaseConfigured } from '../lib/supabase';

export function Login() {
  const { user, signIn, signInDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate('/panel', { replace: true });
  }, [user, navigate]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const result = await signIn(email, password);
    setBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    navigate('/panel');
  };

  return (
    <div className="site">
      <SiteNav />

      <main className="auth-page">
        <div className="auth-card">
          <span className="eyebrow">Tekrar hoş geldin</span>
          <h1>Giriş yap</h1>
          <p className="auth-sub">
            Kararların, kurtardığın saatler ve istatistiklerin seni bekliyor.
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
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </label>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Giriş yapılıyor…' : 'Giriş yap'}
            </button>
          </form>

          {!isSupabaseConfigured && (
            <div className="demo-box">
              <strong>Demo modu</strong>
              <p>
                Supabase anahtarları eklenmediği için girişler şimdilik bu
                cihazda saklanıyor. Hemen denemek için demo ile devam et.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  signInDemo();
                  navigate('/panel');
                }}
              >
                Demo ile devam et
              </button>
            </div>
          )}

          <p className="auth-foot">
            Hesabın yok mu? <Link to="/kayit">Ücretsiz kayıt ol</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
