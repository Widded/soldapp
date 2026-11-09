import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { formatDuration, formatTL } from '../lib/format';

const TICKER = [
  '₺15 simit = 7 dakika',
  '₺120 kahve = 52 dakika',
  '₺24.999 telefon = 18 gün',
  '₺6.000 tatil = 4 gün',
];

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
    text: 'Aldım ya da vazgeçtim. İkisi de kaydedilir.',
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
    <div className="site">
      <SiteNav />

      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="section-label">Zaman = para</p>
              <h1>
                Fiyatı değil, <span className="accent">zamanı</span> gör.
              </h1>
              <p className="hero-sub">
                Maaşını gir. Her alışverişin kaç saatlik emeğine mal olduğunu
                gör.
              </p>

              <div className="hero-actions">
                <Link to="/kayit" className="btn btn-primary">
                  Kendi defterini aç
                </Link>
                <a href="#nasil" className="btn btn-ghost">
                  Nasıl çalışır?
                </a>
              </div>

              <p className="hero-note">
                Web şimdi · iOS &amp; Android yakında · reklam yok
              </p>
            </div>

            <div className="hero-visual">
              <div className="hero-calc">
                <div className="hero-calc-top">
                  <span className="live-dot" />
                  <span>Canlı hesap</span>
                  <span className="hero-calc-badge">01</span>
                </div>

                <label className="hero-field">
                  <span>Aylık net kazanç</span>
                  <div className="hero-input">
                    <span>₺</span>
                    <input
                      inputMode="numeric"
                      value={income}
                      onChange={(event) =>
                        setIncome(event.target.value.replace(/[^\d]/g, ''))
                      }
                    />
                  </div>
                </label>

                <label className="hero-field">
                  <span>Almak istediğin şey</span>
                  <div className="hero-input">
                    <span>₺</span>
                    <input
                      inputMode="numeric"
                      value={price}
                      onChange={(event) =>
                        setPrice(event.target.value.replace(/[^\d]/g, ''))
                      }
                    />
                  </div>
                </label>

                <div className="hero-result">
                  <span>Bu, senin</span>
                  <strong>{duration}</strong>
                  <span>emeğin.</span>
                </div>

                <div className="hero-calc-foot">
                  <span>Saatlik değerin {formatTL(hourly)}</span>
                  <Link to="/kayit">Kendi hesabını oluştur →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...TICKER, ...TICKER].map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`}>
                {item}
                <i>·</i>
              </span>
            ))}
          </div>
        </div>

        <section id="nasil" className="section loop-section">
          <div className="section-head">
            <p className="section-label">01 — Nasıl çalışır</p>
            <h2>Bir fiyat, bir süre.</h2>
            <p>Dört adımda parayı zaman gibi oku.</p>
          </div>

          <div className="loop-grid">
            {STEPS.map((step) => (
              <div className="loop-step" key={step.no}>
                <span className="loop-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="defter" className="section ledger-section">
          <div className="section-head">
            <p className="section-label">02 — Zaman defteri</p>
            <h2>Bazı fiyatlar kaç saat eder?</h2>
            <p>₺30.000 net maaş, haftada 45 saat ve günde 1 saat yol ile.</p>
          </div>

          <div className="ledger">
            <div className="ledger-row ledger-header">
              <span>Ürün</span>
              <span>Fiyat</span>
              <span>SOLD’da</span>
            </div>
            {LEDGER.map((item) => (
              <div className="ledger-row" key={item.name}>
                <span className="ledger-name">{item.name}</span>
                <span className="ledger-price">{item.price}</span>
                <span className="ledger-time">{item.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="uygulama" className="section app-section">
          <div className="section-head">
            <p className="section-label">03 — Uygulama</p>
            <h2>
              Bütün kararların, <span className="accent">tek defterde</span>.
            </h2>
            <p>Fiyatı yaz, saatini gör, karar ver.</p>
          </div>

          <p className="app-caption">SOLD mobil · önizleme</p>

          <div className="phones">
            <div className="phone">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="mini-top">
                  <span>SOLD.</span>
                  <span>₺138/saat</span>
                </div>
                <div className="mini-heading">Bugün ne alacaksın?</div>
                <div className="mini-price">₺4.499</div>
                <div className="mini-result">3 gün 6 saat</div>
                <div className="mini-meta">emeğin.</div>
                <div className="mini-button">Karar listesine ekle</div>
              </div>
            </div>

            <div className="phone phone-alt">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="mini-top">
                  <span>SOLD.</span>
                  <span>Kararlar</span>
                </div>
                <div className="mini-heading">Kararlar</div>
                <div className="mini-row">
                  <span>Yeni telefon</span>
                  <b>18 gün</b>
                </div>
                <div className="mini-row">
                  <span>Hafta sonu tatili</span>
                  <b>4 gün</b>
                </div>
                <div className="mini-row">
                  <span>Filtre kahve</span>
                  <b>52 dk</b>
                </div>
                <div className="mini-total">
                  Bu ay <b>0 saat</b> kurtardın.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="fiyat" className="section pricing">
          <div className="section-head">
            <p className="section-label">04 — Fiyat</p>
            <h2>Başlamak ücretsiz.</h2>
            <p>Daha fazlası ayda bir kahve fiyatına.</p>
          </div>

          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-top">
                <span>Ücretsiz</span>
                <strong>₺0</strong>
              </div>
              <ul>
                <li>3 aktif karar</li>
                <li>Temel hesaplayıcı</li>
                <li>Cihazda saklama</li>
              </ul>
              <Link to="/kayit" className="btn btn-ghost">
                Başla
              </Link>
            </div>

            <div className="price-card price-premium">
              <div className="price-top">
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
              <Link to="/kayit" className="btn btn-primary">
                Erken erişim
              </Link>
            </div>
          </div>
        </section>

        <section id="sss" className="section faq-section">
          <div className="section-head">
            <p className="section-label">05 — SSS</p>
            <h2>Kısa sorular, kısa cevaplar.</h2>
            <p>
              Başka sorun varsa{' '}
              <a href="mailto:destek@sold.app">destek@sold.app</a> adresine yaz.
            </p>
          </div>

          <div className="faq">
            {FAQ.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="final-inner">
            <p className="section-label">06 — Karar</p>
            <h2>
              Fiyat girildi.{' '}
              <span className="dark-hl">Zaman geri geldi.</span>
            </h2>
            <p>Bir sonraki alışverişinde kaç saat harcadığını bil.</p>
            <div className="hero-actions">
              <Link to="/kayit" className="btn btn-dark">
                Ücretsiz başla
              </Link>
              <Link to="/giris" className="btn btn-outline-dark">
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
