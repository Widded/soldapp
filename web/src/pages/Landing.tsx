import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { ReceiptMock } from '../components/ReceiptMock';
import { formatDuration, formatTL } from '../lib/format';

const STEPS = [
  {
    title: 'Kazancını gir',
    text: 'Aylık net maaşın, haftalık saatlerin ve yol süren. Gerçek saatlik değerin saniyeler içinde çıksın.',
  },
  {
    title: 'Fiyatı sor',
    text: 'Bir şey almak istediğinde fiyatını yaz. Kaç saat, kaç gün, kaç ay olduğunu gör.',
  },
  {
    title: 'Karar ver',
    text: '24 saat, 3 gün veya 7 gün bekle. Duygu geçince karar ver; vazgeçtiğin her şey kurtardığın saat olur.',
  },
];

const FEATURES = [
  {
    icon: 'clock',
    title: 'Gerçek saatlik değer',
    text: 'Maaş, mesai ve yol süresi dahil. Kendine dürüst bir sayı.',
  },
  {
    icon: 'pause',
    title: 'Bekleme süresi',
    text: '24 saat, 3 gün veya 7 gün. Duygu geçsin, sonra karar ver.',
  },
  {
    icon: 'spark',
    title: 'Kurtardığın saat',
    text: 'Vazgeçtiğin her alışveriş, geri kazandığın zamandır.',
  },
  {
    icon: 'chart',
    title: 'Haftalık rapor',
    text: 'Nereye gittiğini gör. Harcamalarını saat cinsinden oku.',
  },
  {
    icon: 'widget',
    title: 'Ana ekran widget’ı',
    text: 'Uygulamayı açmadan, anlık çevirici ile hesapla.',
  },
  {
    icon: 'lock',
    title: 'Gizlilik',
    text: 'Verilerin sende. İstediğin an tek tıkla sil.',
  },
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

function FeatureIcon({ name }: { name: string }) {
  const icons: Record<string, ReactNode> = {
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pause: (
      <>
        <rect x="7" y="5" width="3" height="14" rx="1" />
        <rect x="14" y="5" width="3" height="14" rx="1" />
      </>
    ),
    spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    widget: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="5" rx="2" />
        <rect x="13" y="10" width="8" height="11" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="3" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name] ?? icons.clock}
    </svg>
  );
}

export function Landing() {
  const [income, setIncome] = useState('30000');
  const [price, setPrice] = useState('4499');

  const hourly = useMemo(() => {
    const value = Number(income) || 0;
    return value > 0 ? value / (45 * 4.333) : 0;
  }, [income]);

  const hours = hourly > 0 ? (Number(price) || 0) / hourly : 0;
  const duration = formatDuration(hours, 9);

  return (
    <div className="site">
      <SiteNav />

      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">01 / Zaman = para</span>
              <h1>
                Bir fiyat etiketi, <em>kaç saatlik</em> hayatın?
              </h1>
              <p className="hero-sub">
                Maaşını gir. Her alışverişin kaç saatlik emeğine mal olduğunu
                gör. Karar vermeden önce.
              </p>
              <div className="hero-actions">
                <Link to="/kayit" className="btn btn-primary btn-lg">
                  Ücretsiz başla
                </Link>
                <a href="#nasil" className="btn btn-ghost btn-lg">
                  Nasıl çalışır?
                </a>
              </div>
              <p className="hero-note">
                Kredi kartı yok · 30 saniyede kurulum · Verilerin sende
              </p>
            </div>

            <div className="hero-visual">
              <ReceiptMock />
            </div>
          </div>
        </section>

        <section className="stats-strip">
          <div className="stats-inner">
            <div>
              <strong>30 sn</strong>
              <span>kurulum</span>
            </div>
            <div>
              <strong>1</strong>
              <span>soru: kaç saatlik?</span>
            </div>
            <div>
              <strong>0 ₺</strong>
              <span>başlamak için</span>
            </div>
          </div>
        </section>

        <section id="nasil" className="section">
          <div className="section-head">
            <span className="eyebrow">02 / Nasıl çalışır</span>
            <h2>Üç adımda, gerçek maliyeti gör.</h2>
            <p>
              Karmaşık bütçe tabloları yok. Sadece bir soru: bu, kaç saatlik
              emeğim?
            </p>
          </div>

          <div className="steps">
            {STEPS.map((step, index) => (
              <div className="step" key={step.title}>
                <span className="step-no">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section demo-section">
          <div className="demo-copy">
            <span className="eyebrow">03 / Şimdi dene</span>
            <h2>Bir fiyat yaz. Emeğini gör.</h2>
            <p>
              Maaşını ve almak istediğin şeyin fiyatını gir; sonucu anında gör.
            </p>

            <div className="demo-fields">
              <label>
                Aylık net kazanç
                <div className="demo-input">
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

              <label>
                Almayı düşündüğün şey
                <div className="demo-input">
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
            </div>
          </div>

          <div className="demo-result">
            <span className="demo-result-label">Bu, senin</span>
            <strong>{duration}</strong>
            <span className="demo-result-sub">emeğin.</span>

            <div className="demo-result-meta">
              <span>Saatlik değerin {formatTL(hourly)}</span>
              <span>1 iş günü 9 saat</span>
            </div>

            <Link
              to="/kayit"
              className="btn btn-primary"
              style={{ marginTop: 18 }}
            >
              Kendi hesabını oluştur
            </Link>
          </div>
        </section>

        <section id="ozellikler" className="section">
          <div className="section-head">
            <span className="eyebrow">04 / Özellikler</span>
            <h2>Harcamayı değil, hayatını düşün.</h2>
            <p>
              Her şey tek bir soruya hizmet ediyor: bu, gerçekten buna değer mi?
            </p>
          </div>

          <div className="features">
            {FEATURES.map((feature) => (
              <div className="feature" key={feature.title}>
                <div className="feature-icon">
                  <FeatureIcon name={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="fiyat" className="section">
          <div className="section-head">
            <span className="eyebrow">05 / Fiyat</span>
            <h2>Başlamak ücretsiz. Kalmak senin kararın.</h2>
            <p>
              Temel ihtiyaçlar için ücretsiz sürüm yeterli. Daha fazlası için
              aylık bir kahve fiyatı.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="price-card">
              <span className="price-name">Ücretsiz</span>
              <div className="price-amount">
                <strong>₺0</strong>
                <span>sonsuza kadar</span>
              </div>
              <ul>
                <li>3 aktif karar</li>
                <li>Temel hesaplayıcı</li>
                <li>Cihazda saklama</li>
                <li>Kurtardığın saat takibi</li>
              </ul>
              <Link to="/kayit" className="btn btn-ghost">
                Ücretsiz başla
              </Link>
            </div>

            <div className="price-card highlight">
              <span className="price-name">Premium</span>
              <div className="price-amount">
                <strong>₺49</strong>
                <span>/ ay</span>
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

        <section id="sss" className="section">
          <div className="section-head">
            <span className="eyebrow">06 / SSS</span>
            <h2>Merak edilenler.</h2>
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
          <span className="eyebrow">07 / Karar senin</span>
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
