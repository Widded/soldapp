import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { formatDuration, formatTL } from '../lib/format';

const STEPS = [
  {
    no: '01',
    title: 'Fiyatı yaz',
    text: 'Ne almak istediğini ve fiyatını gir.',
  },
  {
    no: '02',
    title: 'Bekle',
    text: '24 saat, 3 gün ya da 7 gün. Duygu geçsin.',
  },
  {
    no: '03',
    title: 'Karar ver',
    text: 'Aldım ya da vazgeçtim; ikisi de kaydedilir.',
  },
  {
    no: '04',
    title: 'Saat biriktir',
    text: 'Vazgeçtiğin her şey, kazandığın zaman olur.',
  },
];

const LEDGER = [
  { name: 'Simit', price: '₺15', time: '7 dakika' },
  { name: 'Filtre kahve', price: '₺120', time: '52 dakika' },
  { name: 'Netflix', price: '₺150', time: '1 saat 5 dk' },
  { name: 'Yeni telefon', price: '₺24.999', time: '18 gün' },
  { name: 'Hafta sonu tatili', price: '₺6.000', time: '4 gün' },
];

const FAQ = [
  {
    q: 'Nasıl hesaplanıyor?',
    a: 'Aylık net kazancını, haftalık çalışma ve yol sürenle birlikte gerçek saatlik değerine böleriz.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: 'Hesap açarsan yalnızca sana ait kayıtta tutulur. Hesap açmazsan her şey cihazında kalır.',
  },
  {
    q: 'Premium’da ne var?',
    a: 'Sınırsız karar, bulut senkronizasyonu, haftalık rapor ve widget. İlk 7 gün iade.',
  },
];

export function Landing() {
  const [income, setIncome] = useState('30000');
  const [price, setPrice] = useState('4499');

  const hourly = useMemo(() => {
    const value = Number(income) || 0;
    return value > 0 ? value / (50 * 4.333) : 0;
  }, [income]);

  const hours = hourly > 0 ? (Number(price) || 0) / hourly : 0;
  const duration = formatDuration(hours, 10);

  return (
    <div className="sz">
      <SiteNav />

      <main>
        <section className="sz-hero">
          <span className="sz-badge">
            <i />
            Zaman = para · iOS &amp; Android yakında
          </span>

          <h1>
            Fiyatı değil,
            <br />
            <em>zamanı</em> gör.
          </h1>

          <p className="sz-hero-sub">
            Maaşını gir. Her alışverişin kaç saatlik emeğine mal olduğunu gör.
          </p>

          <div className="sz-hero-actions">
            <Link to="/kayit" className="sz-btn sz-btn-primary">
              Kendi defterini aç
            </Link>
            <a href="#nasil" className="sz-btn sz-btn-ghost">
              Nasıl çalışır?
            </a>
          </div>

          <p className="sz-hero-note">Reklam yok · Verilerin sende</p>

          <div className="sz-window">
            <div className="sz-window-bar">
              <span className="sz-window-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="sz-window-url">sold.app / hesapla</span>
              <span className="sz-window-live">
                <i />
                Canlı
              </span>
            </div>

            <div className="sz-window-body">
              <aside className="sz-app-side">
                <span className="sz-app-logo">SOLD.</span>
                <div className="sz-app-nav">
                  <span className="active">Hesapla</span>
                  <span>Kararlar</span>
                  <span>İstatistik</span>
                </div>
                <div className="sz-app-side-foot">
                  <span>Saatlik değer</span>
                  <strong>{formatTL(hourly)}</strong>
                </div>
              </aside>

              <div className="sz-app-main">
                <div className="sz-app-head">
                  <div>
                    <span className="sz-app-kicker">Canlı hesap</span>
                    <h2>Bugün ne alacaksın?</h2>
                  </div>
                  <span className="sz-app-tag">01 / 2026</span>
                </div>

                <div className="sz-app-fields">
                  <label className="sz-field">
                    <span>Aylık net kazanç</span>
                    <div>
                      <span>₺</span>
                      <input
                        inputMode="numeric"
                        size={5}
                        value={income}
                        onChange={(event) =>
                          setIncome(event.target.value.replace(/[^\d]/g, ''))
                        }
                      />
                    </div>
                  </label>

                  <label className="sz-field">
                    <span>Almak istediğin şey</span>
                    <div>
                      <span>₺</span>
                      <input
                        inputMode="numeric"
                        size={5}
                        value={price}
                        onChange={(event) =>
                          setPrice(event.target.value.replace(/[^\d]/g, ''))
                        }
                      />
                    </div>
                  </label>
                </div>

                <div className="sz-app-result">
                  <span>Bu, senin</span>
                  <strong>{duration}</strong>
                  <span>emeğin.</span>
                </div>

                <div className="sz-app-foot">
                  <span>Saatlik değerin {formatTL(hourly)}</span>
                  <Link to="/kayit">Deftere ekle →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="nasil" className="sz-section">
          <div className="sz-section-head">
            <span className="sz-label">
              <i />
              Nasıl çalışır
            </span>
            <h2>Dört adım. Tek soru.</h2>
            <p>
              “Bu, kaç saatlik emeğim?” Bütün uygulama bu soruya hizmet ediyor.
            </p>
          </div>

          <div className="sz-steps">
            {STEPS.map((step) => (
              <div className="sz-step" key={step.no}>
                <span className="sz-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="ozellikler" className="sz-section">
          <div className="sz-section-head">
            <span className="sz-label">
              <i />
              Özellikler
            </span>
            <h2>Karar vermeden önce, zamanı gör.</h2>
            <p>Fiyatı yaz, saatini gör, karar ver.</p>
          </div>

          <div className="sz-bento">
            <article className="sz-card sz-card-result">
              <div className="sz-card-top">
                <span>Canlı sonuç</span>
                <IconClock />
              </div>
              <strong>3 gün 2 saat</strong>
              <p>₺4.499, senin 3 gün 2 saatlik emeğin.</p>
            </article>

            <article className="sz-card">
              <div className="sz-card-icon">
                <IconList />
              </div>
              <span className="sz-card-label">Karar defteri</span>
              <p>Aldım ya da vazgeçtim; her karar kayıtta kalır.</p>
              <div className="sz-mini-row">
                <span>Yeni telefon</span>
                <b>18 gün</b>
              </div>
            </article>

            <article className="sz-card">
              <div className="sz-card-icon">
                <IconChart />
              </div>
              <span className="sz-card-label">Kurtarılan zaman</span>
              <div className="sz-progress">
                <i />
              </div>
              <p>Bu ay 14 saat kurtardın.</p>
            </article>

            <article className="sz-card">
              <div className="sz-card-icon">
                <IconClock />
              </div>
              <span className="sz-card-label">Bekleme süresi</span>
              <div className="sz-chips">
                <span>24 saat</span>
                <span>3 gün</span>
                <span>7 gün</span>
              </div>
              <p>Duygu geçsin, acele karar verme.</p>
            </article>

            <article className="sz-card">
              <div className="sz-card-icon">
                <IconShield />
              </div>
              <span className="sz-card-label">Veriler sende</span>
              <p>Hesap açmazsan her şey cihazında kalır. Reklam yok.</p>
            </article>

            <article className="sz-card sz-card-ledger">
              <div className="sz-card-top">
                <span>Zaman defteri</span>
                <span>Örnek</span>
              </div>
              <div className="sz-mini-table">
                <div className="sz-mini-table-head">
                  <span>Ürün</span>
                  <span>Fiyat</span>
                  <span>SOLD’da</span>
                </div>
                {LEDGER.slice(0, 3).map((item) => (
                  <div className="sz-mini-table-row" key={item.name}>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <b>{item.time}</b>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="fiyat" className="sz-section">
          <div className="sz-section-head">
            <span className="sz-label">
              <i />
              Fiyat
            </span>
            <h2>Başlamak ücretsiz.</h2>
            <p>Daha fazlası ayda bir kahve fiyatına.</p>
          </div>

          <div className="sz-plans">
            <article className="sz-plan">
              <div className="sz-plan-head">
                <span>Ücretsiz</span>
                <strong>₺0</strong>
              </div>
              <ul>
                <li>3 aktif karar</li>
                <li>Temel hesaplayıcı</li>
                <li>Cihazda saklama</li>
              </ul>
              <Link to="/kayit" className="sz-btn sz-btn-ghost">
                Başla
              </Link>
            </article>

            <article className="sz-plan sz-plan-featured">
              <div className="sz-plan-head">
                <span>
                  Premium <i>Yakında</i>
                </span>
                <strong>
                  ₺49 <small>/ay</small>
                </strong>
              </div>
              <ul>
                <li>Sınırsız karar</li>
                <li>Bulut ve haftalık rapor</li>
                <li>Widget ve öncelikli destek</li>
              </ul>
              <Link to="/kayit" className="sz-btn sz-btn-dark">
                Erken erişim
              </Link>
            </article>
          </div>

          <p className="sz-plan-note">İlk 7 gün koşulsuz iade.</p>
        </section>

        <section id="sss" className="sz-section">
          <div className="sz-section-head">
            <span className="sz-label">
              <i />
              SSS
            </span>
            <h2>Kısa sorular, kısa cevaplar.</h2>
            <p>
              Başka sorun varsa{' '}
              <a href="mailto:destek@sold.app">destek@sold.app</a> adresine yaz.
            </p>
          </div>

          <div className="sz-faq">
            {FAQ.map((item) => (
              <details className="sz-faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="sz-cta">
          <div className="sz-cta-panel">
            <div className="sz-cta-copy">
              <span className="sz-label sz-label-dark">
                <i />
                Karar
              </span>
              <h2>
                Fiyat girildi.
                <br />
                <em>Zaman geri geldi.</em>
              </h2>
              <p>Bir sonraki alışverişinde kaç saat harcadığını bil.</p>
            </div>

            <div className="sz-cta-actions">
              <Link to="/kayit" className="sz-btn sz-btn-dark">
                Ücretsiz başla
              </Link>
              <Link to="/giris" className="sz-btn sz-btn-outline">
                Giriş yap
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function IconClock() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  );
}

function IconList() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 7h10M9 12h10M9 17h10" />
      <path d="M5 7h.01M5 12h.01M5 17h.01" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 19V9M12 19V5M19 19v-7" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3.5 19 6v5.5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6l7-2.5Z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.4" />
    </svg>
  );
}
