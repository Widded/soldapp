import { useMemo, useState } from 'react';
import type { Settings } from '../types';
import { realHourlyRate } from '../lib/calc';
import { formatTL } from '../lib/format';

type Props = {
  onComplete: (settings: Settings) => void;
};

const INCOME_CHIPS = [17000, 25000, 40000, 60000];

export function Onboarding({ onComplete }: Props) {
  const [monthlyIncome, setMonthlyIncome] = useState('30000');
  const [weeklyHours, setWeeklyHours] = useState('45');
  const [commuteMinutesPerDay, setCommuteMinutesPerDay] = useState('60');
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState('5');

  const settings: Settings = useMemo(
    () => ({
      monthlyIncome: Number(monthlyIncome) || 0,
      weeklyHours: Number(weeklyHours) || 0,
      commuteMinutesPerDay: Number(commuteMinutesPerDay) || 0,
      workDaysPerWeek: Number(workDaysPerWeek) || 5,
    }),
    [monthlyIncome, weeklyHours, commuteMinutesPerDay, workDaysPerWeek]
  );

  const rate = realHourlyRate(settings);
  const valid = settings.monthlyIncome > 0 && settings.weeklyHours > 0;

  return (
    <div className="onboarding">
      <div className="onboarding-hero animate">
        <div className="onboarding-kicker">SOLD.</div>
        <h1 className="onboarding-title">
          Bir fiyat etiketi, <em>kaç saatlik</em> hayatın?
        </h1>
        <p className="onboarding-sub">
          Maaşını ve çalışma düzenini gir. Her harcamayı gerçek emeğine
          çevirelim.
        </p>
      </div>

      <div className="card animate" style={{ animationDelay: '60ms' }}>
        <div className="mini-field">
          <label htmlFor="income">Aylık net kazancın</label>
          <div className="mini-input-row">
            <input
              id="income"
              inputMode="numeric"
              value={monthlyIncome}
              onChange={(event) =>
                setMonthlyIncome(event.target.value.replace(/[^\d]/g, ''))
              }
              placeholder="30000"
            />
            <span className="unit">₺</span>
          </div>
        </div>

        <div className="chips" style={{ marginTop: 10 }}>
          {INCOME_CHIPS.map((value) => (
            <button
              key={value}
              type="button"
              className={Number(monthlyIncome) === value ? 'chip active' : 'chip'}
              onClick={() => setMonthlyIncome(String(value))}
            >
              {formatTL(value)}
            </button>
          ))}
        </div>

        <div className="mini-field" style={{ marginTop: 8 }}>
          <label htmlFor="hours">Haftada kaç saat çalışıyorsun?</label>
          <div className="mini-input-row">
            <input
              id="hours"
              inputMode="numeric"
              value={weeklyHours}
              onChange={(event) =>
                setWeeklyHours(event.target.value.replace(/[^\d]/g, ''))
              }
            />
            <span className="unit">saat / hafta</span>
          </div>
        </div>

        <div className="mini-field">
          <label htmlFor="commute">Günde kaç dakika yol?</label>
          <div className="mini-input-row">
            <input
              id="commute"
              inputMode="numeric"
              value={commuteMinutesPerDay}
              onChange={(event) =>
                setCommuteMinutesPerDay(event.target.value.replace(/[^\d]/g, ''))
              }
            />
            <span className="unit">dakika / gün</span>
          </div>
        </div>

        <div className="mini-field">
          <label htmlFor="days">Haftada kaç gün çalışıyorsun?</label>
          <div className="mini-input-row">
            <input
              id="days"
              inputMode="numeric"
              value={workDaysPerWeek}
              onChange={(event) =>
                setWorkDaysPerWeek(event.target.value.replace(/[^\d]/g, ''))
              }
            />
            <span className="unit">gün / hafta</span>
          </div>
        </div>

        <div className="preview">
          <span>Gerçek saatlik değerin</span>
          <strong>{formatTL(rate)}</strong>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!valid}
          onClick={() => onComplete(settings)}
        >
          Hesaplamaya başla
        </button>
        <p
          className="small muted"
          style={{ textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}
        >
          Yol süresi de hesaba katılır. Verilerin sadece bu cihazda kalır.
        </p>
      </div>
    </div>
  );
}
