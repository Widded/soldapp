import { useEffect, useMemo, useState } from 'react';
import type { Decision, DecisionStatus, Settings, Tab } from './types';
import {
  loadDecisions,
  loadSettings,
  saveDecisions,
  saveSettings,
} from './lib/storage';
import { dailyCommitmentHours, realHourlyRate } from './lib/calc';
import { formatTL } from './lib/format';
import { Onboarding } from './components/Onboarding';
import { Calculator } from './components/Calculator';
import { Decisions } from './components/Decisions';
import { SettingsView } from './components/SettingsView';

function CalcIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2.5" width="16" height="19" rx="3" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1.2" />
      <circle cx="4.5" cy="12" r="1.2" />
      <circle cx="4.5" cy="18" r="1.2" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 8.96 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z" />
    </svg>
  );
}

export default function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [tab, setTab] = useState<Tab>('calc');
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setSettings(loadSettings());
    setDecisions(loadDecisions());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && settings) saveSettings(settings);
  }, [settings, ready]);

  useEffect(() => {
    if (ready) saveDecisions(decisions);
  }, [decisions, ready]);

  const dailyHours = useMemo(
    () => (settings ? dailyCommitmentHours(settings) : 8),
    [settings]
  );

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  if (!ready) {
    return <div className="app" />;
  }

  if (!settings) {
    return (
      <Onboarding
        onComplete={(next) => {
          setSettings(next);
          setTab('calc');
        }}
      />
    );
  }

  const handleStatus = (id: string, status: DecisionStatus) => {
    setDecisions((prev) =>
      prev.map((decision) =>
        decision.id === id ? { ...decision, status } : decision
      )
    );
    if (status === 'skipped') showToast('Birkaç saatini geri kazandın');
    if (status === 'bought') showToast('Karar kaydedildi');
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="brand">
            kaç saat<span>?</span>
          </div>
          <p className="tagline">Fiyatları ömrüne çevir.</p>
        </div>
        <div className="rate-pill">
          <span className="rate-label">saatlik değerin</span>
          <strong>{formatTL(realHourlyRate(settings))}</strong>
        </div>
      </header>

      <main>
        {tab === 'calc' && (
          <Calculator
            settings={settings}
            decisions={decisions}
            dailyHours={dailyHours}
            onAdd={(decision) => setDecisions((prev) => [decision, ...prev])}
            onToast={showToast}
          />
        )}

        {tab === 'decisions' && (
          <Decisions
            decisions={decisions}
            dailyHours={dailyHours}
            onUpdate={handleStatus}
            onDelete={(id) =>
              setDecisions((prev) =>
                prev.filter((decision) => decision.id !== id)
              )
            }
          />
        )}

        {tab === 'settings' && (
          <SettingsView
            settings={settings}
            onSave={(next) => {
              setSettings(next);
              showToast('Ayarlar güncellendi');
            }}
            onReset={() => {
              localStorage.clear();
              setSettings(null);
              setDecisions([]);
              setTab('calc');
            }}
            onToast={showToast}
          />
        )}
      </main>

      <nav className="bottom-nav">
        <button
          type="button"
          className={tab === 'calc' ? 'nav-item active' : 'nav-item'}
          onClick={() => setTab('calc')}
        >
          <CalcIcon />
          Hesapla
        </button>
        <button
          type="button"
          className={tab === 'decisions' ? 'nav-item active' : 'nav-item'}
          onClick={() => setTab('decisions')}
        >
          <ListIcon />
          Kararlar
        </button>
        <button
          type="button"
          className={tab === 'settings' ? 'nav-item active' : 'nav-item'}
          onClick={() => setTab('settings')}
        >
          <SettingsIcon />
          Ayarlar
        </button>
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
