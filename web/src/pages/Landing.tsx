import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { formatDuration, formatTL } from '../lib/format';

const TICKER = [
  '₺15 simit = 7 dakika',
  '₺120 kahve = 52 dakika',
  '₺150 Netflix = 1 saat 5 dakika',
  '₺1.200 spor salonu = 8 saat 42 dakika',
  '₺24.999 telefon = 18 gün 1 saat',
  '₺6.000 tatil = 4 gün 3 saat',
];

const STEPS = [
  {
    no: '01',
    title: 'Kazancını gir',
    text: 'Aylık net maaşın, haftalık saatlerin ve yol süren. Gerçek saatlik değerin saniyeler içinde çıksın.',
  },
  {
    no: '02',
    title: 'Fiyatı sor',
    text: 'Bir şey almak istediğinde fiyatını yaz. Kaç saat, kaç gün, kaç ay olduğunu gör.',
  },
  {
    no: '03',
    title: 'Karar ver',
    text: '24 saat, 3 gün veya 7 gün bekle. Duygu geçince karar ver; vazgeçtiğin her şey kurtardığın saat olur.',
  },
];

const LEDGER = [
  { name: 'Simit', price: '₺15', time: '7 dakika' },
  { name: 'Filtre kahve', price: '₺120', time: '52 dakika' },
  { name: 'Netflix', price: '₺150', time: '1 saat 5 dk' },
  { name: 'Spor salonu', price: '₺1.200 / ay', time: '8 saat 42 dk' },
  { name: 'Yeni telefon', price: '₺24.999', time: '18 gün 1 saat' },
  { name: 'Hafta sonu tatili', price: '₺6.000', time: '4 gün 3 saat' },
];

const FAQ = [
  {
    q: 'Nasıl hesaplanıyor?',
    a: 'Aylık net kazancını, haftalık çalışma saatine ve yol süresine bölüyoruz. Böylece sadece masada geçen değil, işe gidip gelirken harcadığın zaman da hesaba katılıyor.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: 'Hesap açtığında veriler Supabase üzerinde, yalnızca senin erişebileceğin şekilde saklanır. Hesap açmadan kullanırsan her şey cihazında kalır.',
  },
  {
    q: 'Ücretsiz sürüm yeterli mi?',
    a: 'Günde birkaç karar için evet. Sınırsız karar, bulut senkronizasyonu, haftalık rapor ve widget için Premium gerekiyor.',
  },
  {
    q: 'Mobil uygulama ne zaman?',
    a: 'Expo ile iOS ve Android sürümü yapım aşamasında. Web sürümünü şimdi kullanabilirsin; mobil çıkınca aynı hesapla devam edersin.',
  },
  {
    q: 'İade var mı?',
    a: 'İlk 7 gün içinde koşulsuz iade. Tek bir e-posta yeterli.',
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
              <p className="kicker">SOLD / zamanın fiyatı</p>
              <h1>
                Fiyatı değil, <em>harcadığın zamanı</em> gör.
              </h1>
              <p className="hero-sub">
                Maaşını gir. Her alışverişin kaç saatlik emeğine mal olduğunu
                gör. Karar vermeden önce.
              </p>

              <div className="hero-actions">
                <Link to="/kayit" className="btn btn-primary">
                  Kendi defterini aç
                </Link>
                <a href="#defter" className="link-arrow">
                  Zaman defterine bak <span>→</span>
                </a>
              </div>

              <div className="hero-meta">
                <span className="meta-item">
                  <span className="meta-dot" /> Şu an 1 saat ≈{' '}
                  {formatTL(hourly)}
                </span>
                <span className="meta-item">Kredi kartı yok</span>
                <span className="meta-item">Verilerin sende</span>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-top">
                <span>Örnek hesap</span>
                <span>01 / 02</span>
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

              <div className="hero-card-foot">
                <span>Saatlik değerin {formatTL(hourly)}</span>
                <Link to="/kayit">Kendi hesabını oluştur →</Link>
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

        <section id="nasil" className="section how">
          <div className="section-head">
            <div>
              <p className="kicker">Nasıl çalışır</p>
              <h2>Üç adım. Tek soru.</h2>
            </div>
            <p>
              Karmaşık bütçe tabloları yok. Sadece bir soru: bu, kaç saatlik
              emeğim?
            </p>
          </div>

          <div className="how-grid">
            {STEPS.map((step) => (
              <div className="how-step" key={step.no}>
                <span className="how-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="defter" className="section ledger-section">
          <div className="section-head">
            <div>
              <p className="kicker">Zaman defteri</p>
              <h2>Bazı fiyatlar kaç saat eder?</h2>
            </div>
            <p className="ledger-note">
              ₺30.000 net maaş, haftada 45 saat ve günde 1 saat yol varsayımıyla.
            </p>
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

        <section className="manifesto">
          <div className="manifesto-inner">
            <p className="kicker kicker-light">Manifesto</p>
            <h2>
              Her fiyat etiketi, <em>ödenmemiş bir zaman borcudur.</em>
            </h2>
            <p>
              SOLD bu borcu görünür kılar. Bir şeyin gerçek maliyeti cüzdanındaki
              para değil, ona harcadığın ömürdür.
            </p>
            <Link to="/kayit" className="btn btn-cream">
              Kendi defterini aç
            </Link>
          </div>
        </section>

        <section id="fiyat" className="section pricing">
          <div className="section-head">
            <div>
              <p className="kicker">Fiyat</p>
              <h2>Başlamak ücretsiz.</h2>
            </div>
            <p>
              Temel ihtiyaçlar için ücretsiz sürüm yeterli. Daha fazlası için
              aylık bir kahve fiyatı.
            </p>
          </div>

          <div className="pricing-strip">
            <div className="plan">
              <div className="plan-head">
                <h3>Ücretsiz</h3>
                <span className="plan-price">₺0</span>
              </div>
              <ul>
                <li>3 aktif karar</li>
                <li>Temel hesaplayıcı</li>
                <li>Cihazda saklama</li>
                <li>Kurtardığın saat takibi</li>
              </ul>
              <Link to="/kayit" className="btn btn-ghost">
                Başla
              </Link>
            </div>

            <div className="plan plan-premium">
              <div className="plan-head">
                <h3>Premium</h3>
                <span className="plan-price">
                  ₺49 <small>/ ay</small>
                </span>
              </div>
              <ul>
                <li>Sınırsız karar</li>
                <li>Bulut senkronizasyonu</li>
                <li>Haftalık rapor</li>
                <li>Ana ekran widget’ı</li>
                <li>Öncelikli destek</li>
              </ul>
              <Link to="/kayit" className="btn btn-primary">
                Premium’a geç
              </Link>
            </div>
          </div>
        </section>

        <section id="sss" className="section faq-section">
          <div className="faq-grid">
            <div className="faq-intro">
              <p className="kicker">SSS</p>
              <h2>Merak edilenler.</h2>
              <p>
                Aklına takılan başka bir şey varsa{' '}
                <a href="mailto:destek@sold.app">destek@sold.app</a> adresine
                yaz.
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
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-inner">
            <p className="kicker">Karar senin</p>
            <h2>
              Bir sonraki alışverişinde, ömründen kaç saat gittiğini bil.
            </h2>
            <div className="hero-actions">
              <Link to="/kayit" className="btn btn-primary btn-lg">
                Ücretsiz başla
              </Link>
              <Link to="/giris" className="btn btn-ghost btn-lg">
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
