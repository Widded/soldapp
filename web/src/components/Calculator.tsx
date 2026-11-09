import { useMemo, useState } from 'react';
import type { Decision, Settings } from '../types';
import { priceToHours, realHourlyRate } from '../lib/calc';
import { formatDuration, formatNumber, formatTL } from '../lib/format';

type Props = {
  settings: Settings;
  decisions: Decision[];
  dailyHours: number;
  onAdd: (decision: Decision) => void;
  onToast: (message: string) => void;
};

const PRICE_CHIPS = [100, 500, 1000, 5000, 10000];

const WAIT_OPTIONS = [
  { days: 1, label: '1 gün' },
  { days: 3, label: '3 gün' },
  { days: 7, label: '7 gün' },
];

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function Calculator({
  settings,
  decisions,
  dailyHours,
  onAdd,
  onToast,
}: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [waitDays, setWaitDays] = useState(3);
  const [copied, setCopied] = useState(false);

  const numericPrice = Number(price.replace(/[^\d]/g, '')) || 0;

  const hours = useMemo(
    () => priceToHours(numericPrice, settings),
    [numericPrice, settings]
  );

  const duration = formatDuration(hours, dailyHours);
  const hourlyRate = realHourlyRate(settings);

  const now = new Date();
  const savedHours = decisions
    .filter((decision) => {
      if (decision.status !== 'skipped') return false;
      const created = new Date(decision.createdAt);
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, decision) => sum + decision.hours, 0);

  const addDecision = () => {
    if (numericPrice <= 0) return;
    const timestamp = Date.now();
    onAdd({
      id: newId(),
      name: name.trim() || 'İsimsiz istek',
      price: numericPrice,
      hours,
      status: 'waiting',
      createdAt: timestamp,
      decideAt: timestamp + waitDays * 24 * 60 * 60 * 1000,
    });
    setName('');
    setPrice('');
    onToast('Karar listesine eklendi');
  };

  const share = async () => {
    if (numericPrice <= 0) return;
    const text = `${name.trim() || 'Bu'} ${formatTL(numericPrice)} = ${duration} emeğim. Değer mi? — SOLD`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onToast('Panoya kopyalandı');
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* kullanıcı paylaşımı iptal etti */
    }
  };

  return (
    <div className="stack">
      <div className="animate">
        <p className="section-label">Hesapla</p>
        <div className="card">
          <div className="field">
            <span className="field-label">
              Ne almak istiyorsun? (opsiyonel)
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Yeni telefon, ayakkabı, tatil..."
              maxLength={60}
              style={{ fontSize: 16, fontWeight: 600, padding: '2px 0' }}
            />
          </div>

          <div className="field" style={{ marginTop: 16 }}>
            <span className="field-label">Fiyatı</span>
            <div className="field-row">
              <span className="field-prefix">₺</span>
              <input
                inputMode="numeric"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value.replace(/[^\d]/g, ''))
                }
                placeholder="0"
              />
            </div>
          </div>

          <div className="chips" style={{ marginTop: 12 }}>
            {PRICE_CHIPS.map((value) => (
              <button
                key={value}
                type="button"
                className={numericPrice === value ? 'chip active' : 'chip'}
                onClick={() => setPrice(String(value))}
              >
                {formatTL(value)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {numericPrice > 0 && (
        <div className="result-card animate">
          <p className="result-label">Bu, senin</p>
          <div className="result-value">{duration}</div>
          <p className="result-sub">emeğin.</p>
          <div className="result-meta">
            <span>Saatlik değerin {formatTL(hourlyRate)}</span>
            <span>1 iş günü {formatNumber(dailyHours)} saat</span>
          </div>
        </div>
      )}

      {numericPrice > 0 && (
        <div className="card animate">
          <p className="section-label" style={{ margin: '0 0 10px' }}>
            Karar zamanı
          </p>
          <p className="small muted" style={{ margin: '0 0 10px', lineHeight: 1.5 }}>
            Hemen alma. Bir süre beklet, duygu geçsin.
          </p>
          <div className="chips">
            {WAIT_OPTIONS.map((option) => (
              <button
                key={option.days}
                type="button"
                className={waitDays === option.days ? 'chip active' : 'chip'}
                onClick={() => setWaitDays(option.days)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="stack" style={{ marginTop: 14, gap: 10 }}>
            <button type="button" className="btn btn-primary" onClick={addDecision}>
              Listeye ekle
            </button>
            <button type="button" className="btn btn-ghost" onClick={share}>
              {copied ? 'Kopyalandı' : 'Paylaş'}
            </button>
          </div>
        </div>
      )}

      <div className="stat-grid animate">
        <div className="stat">
          <span>Bu ay kurtardığın</span>
          <strong>
            {savedHours > 0 ? formatDuration(savedHours, dailyHours) : '0 saat'}
          </strong>
        </div>
        <div className="stat">
          <span>Bekleyen karar</span>
          <strong>
            {decisions.filter((decision) => decision.status === 'waiting').length}
          </strong>
        </div>
      </div>

      {decisions.length > 0 && (
        <div className="animate">
          <p className="section-label">Son kararlar</p>
          <div className="decision-list">
            {decisions.slice(0, 3).map((decision) => (
              <div key={decision.id} className="decision">
                <div className="decision-top">
                  <div>
                    <p className="decision-name">{decision.name}</p>
                    <p className="decision-price">{formatTL(decision.price)}</p>
                  </div>
                  <span className="decision-hours">
                    {formatDuration(decision.hours, dailyHours)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
