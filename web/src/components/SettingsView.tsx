import { useEffect, useState } from 'react';
import type { Settings } from '../types';
import { realHourlyRate } from '../lib/calc';
import { formatTL } from '../lib/format';

type Props = {
  settings: Settings;
  onSave: (settings: Settings) => void;
  onReset: () => void;
  onToast: (message: string) => void;
};

export function SettingsView({ settings, onSave, onReset, onToast }: Props) {
  const [form, setForm] = useState(settings);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const update = (key: keyof Settings, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: Number(value.replace(/[^\d]/g, '')) || 0,
    }));
  };

  const rate = realHourlyRate(form);

  return (
    <div className="stack">
      <div>
        <p className="section-label">Ayarlar</p>
        <div className="card">
          <div className="mini-field">
            <label htmlFor="s-income">Aylık net kazanç</label>
            <div className="mini-input-row">
              <input
                id="s-income"
                inputMode="numeric"
                value={form.monthlyIncome || ''}
                onChange={(event) => update('monthlyIncome', event.target.value)}
              />
              <span className="unit">₺</span>
            </div>
          </div>

          <div className="mini-field">
            <label htmlFor="s-hours">Haftalık çalışma saati</label>
            <div className="mini-input-row">
              <input
                id="s-hours"
                inputMode="numeric"
                value={form.weeklyHours || ''}
                onChange={(event) => update('weeklyHours', event.target.value)}
              />
              <span className="unit">saat / hafta</span>
            </div>
          </div>

          <div className="mini-field">
            <label htmlFor="s-commute">Günlük yol süresi</label>
            <div className="mini-input-row">
              <input
                id="s-commute"
                inputMode="numeric"
                value={form.commuteMinutesPerDay || ''}
                onChange={(event) =>
                  update('commuteMinutesPerDay', event.target.value)
                }
              />
              <span className="unit">dakika / gün</span>
            </div>
          </div>

          <div className="mini-field">
            <label htmlFor="s-days">Haftalık çalışma günü</label>
            <div className="mini-input-row">
              <input
                id="s-days"
                inputMode="numeric"
                value={form.workDaysPerWeek || ''}
                onChange={(event) =>
                  update('workDaysPerWeek', event.target.value)
                }
              />
              <span className="unit">gün / hafta</span>
            </div>
          </div>

          <div className="preview">
            <span>Gerçek saatlik değerin</span>
            <strong>{formatTL(rate)}</strong>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 14 }}
            onClick={() => onSave(form)}
          >
            Kaydet
          </button>
        </div>
      </div>

      <div className="premium-card">
        <h3>Kaç Saat? Premium</h3>
        <p>
          Sınırsız karar, haftalık rapor, ana ekran widget'ı ve detaylı analiz.
          Şu an yapım aşamasında.
        </p>
        <div className="price-tag">
          <strong>{formatTL(49)}</strong>
          <span>/ ay</span>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onToast('Premium yakında. Seni listeye aldık.')}
        >
          Beni haberdar et
        </button>
      </div>

      <div className="card">
        <p className="small muted" style={{ margin: '0 0 12px', lineHeight: 1.5 }}>
          Verilerin sadece bu cihazda saklanır. Hesap açman gerekmez.
        </p>
        {!confirmReset ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setConfirmReset(true)}
          >
            Tüm verileri sıfırla
          </button>
        ) : (
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setConfirmReset(false)}
            >
              Vazgeç
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setConfirmReset(false);
                onReset();
              }}
            >
              Evet, sıfırla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
