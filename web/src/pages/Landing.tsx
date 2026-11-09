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

const OLD_STEPS = [
  'Fiyatı gör.',
  'Maaşına böl.',
  'Kaç saat olduğunu tahmin et.',
  'Harcamayı unut.',
  'Ay sonunda pişman ol.',
];

const NEW_STEPS = [
  'Fiyatı yaz.',
  'Gerçek saatlik değerinle böl.',
  'Kaç gün olduğunu gör.',
  'Karar ver.',
  'Vazgeçtiğin saat birikir.',
];

const STEPS = [
  {
    no: '01',
    title: 'Fiyatı yaz',
    text: 'Ne almak istediğini ve fiyatını gir. Kaç saat olduğunu anında gör.',
  },
  {
    no: '02',
    title: 'Bekleme süresi koy',
    text: '24 saat, 3 gün veya 7 gün. Duygu geçsin, acele karar verme.',
  },
  {
    no: '03',
    title: 'Karar ver',
    text: 'Aldım ya da vazgeçtim. İkisi de deftere kaydedilir.',
  },
  {
    no: '04',
    title: 'Saat birikir',
    text: 'Vazgeçtiğin her şey, geri kazandığın zaman olarak birikir.',
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

const FORMULA = [
  { label: 'Aylık net kazanç', value: '₺30.000' },
  { label: 'Haftalık çalışma', value: '45 saat' },
  { label: 'Günlük yol', value: '1 saat' },
  { label: 'Haftalık toplam', value: '50 saat' },
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
              <p className="section-label">Zaman = para</p>
              <h1>
                Fiyatı değil, <span className="accent">zamanı</span> gör.
              </h1>
              <p className="hero-sub">
                Maaşını gir. Her alışverişin kaç saatlik emeğine mal olduğunu
                gör. Karar vermeden önce.
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
                iOS &amp; Android · verilerin sende · reklam yok
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

        <section className="section compare">
          <div className="section-head">
            <p className="section-label">01 — Eski usul</p>
            <h2>Kafanda saat hesabı yapmak yorucu.</h2>
            <p>
              Fiyatı görüyorsun ama gerçek maliyeti göremiyorsun. Sonra “bu ay
              para nereye gitti?” oluyor.
            </p>
          </div>

          <div className="compare-grid">
            <div className="compare-card compare-old">
              <div className="compare-top">
                <span>Eski usul</span>
                <strong>~4 dakika</strong>
              </div>
              <ol>
                {OLD_STEPS.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="compare-card compare-new">
              <div className="compare-top">
                <span>SOLD ile</span>
                <strong>~3 saniye</strong>
              </div>
              <ol>
                {NEW_STEPS.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="defter" className="section ledger-section">
          <div className="section-head">
            <p className="section-label">02 — Zaman defteri</p>
            <h2>Bazı fiyatlar kaç saat eder?</h2>
            <p>
              ₺30.000 net maaş, haftada 45 saat ve günde 1 saat yol
              varsayımıyla.
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

        <section id="nasil" className="section loop-section">
          <div className="section-head">
            <p className="section-label">03 — Karar döngüsü</p>
            <h2>Bir karar, dört adım.</h2>
            <p>Fiyat → bekle → karar → kurtarılan saat. Döngü bu.</p>
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

        <section id="uygulama" className="section app-section">
          <div className="section-head">
            <p className="section-label">04 — Uygulama</p>
            <h2>
              Bütün kararların, <span className="accent">tek defterde</span>.
            </h2>
            <p>
              Fiyatı yaz, saatini gör, karar ver. iPhone ve Android için SOLD.
            </p>
          </div>

          <p className="app-caption">Gerçek ekranlar · SOLD 1.0</p>

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
                <div className="mini-row">
                  <span>Spor salonu</span>
                  <b>8 sa 42 dk</b>
                </div>
                <div className="mini-total">
                  Bu ay <b>0 saat</b> kurtardın.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section precision">
          <div className="precision-grid">
            <div className="section-head precision-head">
              <p className="section-label">05 — Hassasiyet</p>
              <h2>
                Saatlik değerini bilmiyor musun?{' '}
                <span className="accent">SOLD biliyor.</span>
              </h2>
              <p>
                Yol, mesai ve gerçek çalışma saatlerin dahil. Kendine dürüst bir
                sayı.
              </p>
            </div>

            <div className="formula-card">
              {FORMULA.map((row) => (
                <div className="formula-row" key={row.label}>
                  <span>{row.label}</span>
                  <b>{row.value}</b>
                </div>
              ))}
              <div className="formula-row formula-total">
                <span>Gerçek saatlik değer</span>
                <b>₺138</b>
              </div>
              <p className="formula-note">30.000 ÷ (50 × 4,33) = 138,47</p>
            </div>
          </div>
        </section>

        <section id="fiyat" className="section pricing">
          <div className="section-head">
            <p className="section-label">06 — Fiyat</p>
            <h2>Başlamak ücretsiz.</h2>
            <p>
              Temel ihtiyaçlar için ücretsiz sürüm yeterli. Daha fazlası için
              aylık bir kahve fiyatı.
            </p>
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
                <li>Kurtardığın saat takibi</li>
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
                <li>Bulut senkronizasyonu</li>
                <li>Haftalık rapor</li>
                <li>Ana ekran widget’ı</li>
                <li>Öncelikli destek</li>
              </ul>
              <Link to="/kayit" className="btn btn-primary">
                Erken erişim
              </Link>
            </div>
          </div>
        </section>

        <section id="sss" className="section faq-section">
          <div className="section-head">
            <p className="section-label">07 — SSS</p>
            <h2>Sıkça sorulan sorular.</h2>
            <p>
              Aklına takılan başka bir şey varsa{' '}
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
            <p className="section-label">08 — Karar</p>
            <h2>
              Fiyat girildi.{' '}
              <span className="dark-hl">Zaman geri geldi.</span>
            </h2>
            <p>
              Bir sonraki alışverişinde, ömründen kaç saat gittiğini bil.
            </p>
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
