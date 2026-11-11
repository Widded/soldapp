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

const FEATURES = [
  {
    no: '01',
    title: 'Canlı hesap',
    text: 'Fiyatı yaz, saatini anında gör.',
  },
  {
    no: '02',
    title: 'Karar defteri',
    text: 'Aldım ya da vazgeçtim; ikisi de kayıtta kalır.',
  },
  {
    no: '03',
    title: 'Biriken zaman',
    text: 'Vazgeçtiğin her şey saat olarak birikir.',
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
    <div className="lp">
      <SiteNav />

      <main className="lp-main">
        <section className="lp-hero">
          <div className="lp-hero-copy">
            <p className="lp-kicker">Zaman ekstresi / 2026</p>
            <h1>
              Fiyatı değil,
              <br />
              <em>zamanı</em> gör.
            </h1>
            <p className="lp-lead">
              Maaşını gir. Her alışverişin kaç saatlik emeğine mal olduğunu
              gör.
            </p>

            <div className="lp-hero-actions">
              <Link to="/kayit" className="lp-btn lp-btn-solid">
                Kendi defterini aç
              </Link>
              <a href="#akis" className="lp-btn lp-btn-line">
                Nasıl çalışır?
              </a>
            </div>

            <p className="lp-meta">
              Web şimdi · iOS &amp; Android yakında · reklam yok
            </p>
          </div>

          <div className="lp-statement">
            <div className="lp-statement-head">
              <span>Canlı hesap</span>
              <span>01 / 2026</span>
            </div>

            <label className="lp-row">
              <span className="lp-row-label">Aylık net kazanç</span>
              <span className="lp-row-value">
                <span>₺</span>
                <input
                  inputMode="numeric"
                  size={5}
                  value={income}
                  onChange={(event) =>
                    setIncome(event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </span>
            </label>

            <label className="lp-row">
              <span className="lp-row-label">Almak istediğin şey</span>
              <span className="lp-row-value">
                <span>₺</span>
                <input
                  inputMode="numeric"
                  size={5}
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </span>
            </label>

            <div className="lp-row lp-row-plain">
              <span className="lp-row-label">Saatlik değerin</span>
              <span className="lp-row-value lp-row-value-small">
                {formatTL(hourly)}
              </span>
            </div>

            <div className="lp-result">
              <span className="lp-result-label">Karşılığı</span>
              <strong>{duration}</strong>
              <span className="lp-result-note">emeğin.</span>
            </div>

            <div className="lp-barcode" aria-hidden="true" />

            <div className="lp-statement-foot">
              <span>SOLD / Zaman = para</span>
              <Link to="/kayit">Kendi hesabını oluştur →</Link>
            </div>
          </div>
        </section>

        <section id="akis" className="lp-entry">
          <aside className="lp-rail">
            <span className="lp-no">01</span>
            <span className="lp-rail-label">Akış</span>
          </aside>
          <div className="lp-body">
            <h2>Bir fiyat, bir süre.</h2>
            <p>Dört adımda parayı zaman gibi oku.</p>

            <div className="lp-steps">
              {STEPS.map((step) => (
                <div className="lp-step" key={step.no}>
                  <span className="lp-step-no">{step.no}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="defter" className="lp-entry">
          <aside className="lp-rail">
            <span className="lp-no">02</span>
            <span className="lp-rail-label">Defter</span>
          </aside>
          <div className="lp-body">
            <h2>Bazı fiyatlar kaç saat eder?</h2>
            <p>₺30.000 net maaş, haftada 45 saat ve günde 1 saat yol ile.</p>

            <div className="lp-ledger">
              <div className="lp-ledger-row lp-ledger-head">
                <span>Ürün</span>
                <span>Fiyat</span>
                <span className="lp-ledger-time">SOLD’da</span>
              </div>
              {LEDGER.map((item) => (
                <div className="lp-ledger-row" key={item.name}>
                  <span className="lp-ledger-name">{item.name}</span>
                  <span className="lp-ledger-price">{item.price}</span>
                  <span className="lp-ledger-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="uygulama" className="lp-entry">
          <aside className="lp-rail">
            <span className="lp-no">03</span>
            <span className="lp-rail-label">Uygulama</span>
          </aside>
          <div className="lp-body">
            <h2>Bütün kararların, tek defterde.</h2>
            <p>Fiyatı yaz, saatini gör, karar ver.</p>

            <div className="lp-app">
              <div className="lp-app-copy">
                {FEATURES.map((feature) => (
                  <div className="lp-feature" key={feature.no}>
                    <span className="lp-feature-label">
                      {feature.no} / {feature.title}
                    </span>
                    <p>{feature.text}</p>
                  </div>
                ))}
              </div>

              <div className="lp-phone">
                <div className="lp-phone-screen">
                  <div className="lp-phone-top">
                    <span>SOLD.</span>
                    <span>₺138/saat</span>
                  </div>
                  <div className="lp-phone-title">Bugün ne alacaksın?</div>
                  <div className="lp-phone-price">₺4.499</div>
                  <div className="lp-phone-result">3 gün 6 saat</div>
                  <div className="lp-phone-note">emeğin.</div>
                  <div className="lp-phone-btn">Karar listesine ekle</div>

                  <div className="lp-phone-rows">
                    <div className="lp-phone-row">
                      <span>Yeni telefon</span>
                      <b>18 gün</b>
                    </div>
                    <div className="lp-phone-row">
                      <span>Hafta sonu tatili</span>
                      <b>4 gün</b>
                    </div>
                    <div className="lp-phone-row">
                      <span>Filtre kahve</span>
                      <b>52 dk</b>
                    </div>
                  </div>

                  <div className="lp-phone-total">
                    Bu ay <b>0 saat</b> kurtardın.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="fiyat" className="lp-entry">
          <aside className="lp-rail">
            <span className="lp-no">04</span>
            <span className="lp-rail-label">Fiyat</span>
          </aside>
          <div className="lp-body">
            <h2>Başlamak ücretsiz.</h2>
            <p>Daha fazlası ayda bir kahve fiyatına.</p>

            <div className="lp-plans">
              <div className="lp-plan">
                <div className="lp-plan-top">
                  <span className="lp-plan-label">Ücretsiz</span>
                  <span className="lp-plan-price">₺0</span>
                </div>
                <ul className="lp-plan-list">
                  <li>3 aktif karar</li>
                  <li>Temel hesaplayıcı</li>
                  <li>Cihazda saklama</li>
                </ul>
                <Link to="/kayit" className="lp-btn lp-btn-line">
                  Başla
                </Link>
              </div>

              <div className="lp-plan lp-plan-featured">
                <div className="lp-plan-top">
                  <span className="lp-plan-label">
                    Premium <i>Yakında</i>
                  </span>
                  <span className="lp-plan-price">
                    ₺49 <small>/ay</small>
                  </span>
                </div>
                <ul className="lp-plan-list">
                  <li>Sınırsız karar</li>
                  <li>Bulut ve haftalık rapor</li>
                  <li>Widget ve öncelikli destek</li>
                </ul>
                <Link to="/kayit" className="lp-btn lp-btn-solid">
                  Erken erişim
                </Link>
              </div>
            </div>

            <p className="lp-plan-note">İlk 7 gün koşulsuz iade.</p>
          </div>
        </section>

        <section id="sss" className="lp-entry">
          <aside className="lp-rail">
            <span className="lp-no">05</span>
            <span className="lp-rail-label">SSS</span>
          </aside>
          <div className="lp-body">
            <h2>Kısa sorular, kısa cevaplar.</h2>
            <p>
              Başka sorun varsa{' '}
              <a href="mailto:destek@sold.app">destek@sold.app</a> adresine yaz.
            </p>

            <div className="lp-faq">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-close">
          <div className="lp-close-inner">
            <div className="lp-close-copy">
              <span className="lp-close-label">06 / Karar</span>
              <h2>
                Fiyat girildi.
                <br />
                <em>Zaman geri geldi.</em>
              </h2>
              <p>Bir sonraki alışverişinde kaç saat harcadığını bil.</p>
              <div className="lp-cta-row">
                <Link to="/kayit" className="lp-btn lp-btn-solid">
                  Ücretsiz başla
                </Link>
                <Link to="/giris" className="lp-btn lp-btn-line">
                  Giriş yap
                </Link>
              </div>
            </div>

            <div className="lp-stamp">
              <strong>SOLD.</strong>
              <span>Zaman sende</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
