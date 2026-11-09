import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { DecisionStatus } from '../types';
import { useAuth } from '../lib/auth';
import { useDecisions } from '../lib/decisions';
import { DEFAULT_SETTINGS, useProfile } from '../lib/profile';
import { dailyCommitmentHours, realHourlyRate } from '../lib/calc';
import { formatDuration, formatNumber, formatTL } from '../lib/format';
import { Calculator } from '../components/Calculator';
import { Decisions } from '../components/Decisions';
import { SettingsView } from '../components/SettingsView';
import { SiteFooter } from '../components/SiteFooter';

type PanelTab = 'calc' | 'decisions' | 'settings';

export function Panel() {
  const { user, signOut, demo } = useAuth();
  const navigate = useNavigate();
  const userId = user && 'id' in user ? user.id : null;
  const cloud = Boolean(userId && !demo);

  const { settings, saveSettings } = useProfile(userId, cloud);
  const { decisions, add, updateStatus, remove } = useDecisions(userId, cloud);

  const [tab, setTab] = useState<PanelTab>('calc');
  const [toast, setToast] = useState<string | null>(null);

  const dailyHours = useMemo(() => dailyCommitmentHours(settings), [settings]);
  const rate = realHourlyRate(settings);

  const waiting = decisions.filter((decision) => decision.status === 'waiting');
  const skipped = decisions.filter((decision) => decision.status === 'skipped');
  const savedHours = skipped.reduce((sum, decision) => sum + decision.hours, 0);

  const email = user && 'email' in user ? user.email ?? '' : '';
  const name = email ? email.split('@')[0] : 'dostum';

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleStatus = (id: string, status: DecisionStatus) => {
    void updateStatus(id, status);
    showToast(
      status === 'skipped' ? 'Birkaç saatini geri kazandın' : 'Karar kaydedildi'
    );
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <Link to="/" className="site-logo">
          SOLD<span>.</span>
        </Link>
        <div className="panel-header-right">
          <span className="panel-email">{email}</span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              void signOut();
              navigate('/');
            }}
          >
            Çıkış
          </button>
        </div>
      </header>

      <main className="panel">
        <div className="panel-intro">
          <div>
            <span className="eyebrow">Panel</span>
            <h1>Merhaba, {name}.</h1>
            <p>Bugün ne kadar zaman kazandın?</p>
          </div>
          {demo && (
            <div className="demo-badge">Demo modu — veriler bu cihazda</div>
          )}
        </div>

        <div className="panel-grid">
          <div className="panel-main">
            <div className="panel-tabs">
              <button
                type="button"
                className={tab === 'calc' ? 'active' : ''}
                onClick={() => setTab('calc')}
              >
                Hesapla
              </button>
              <button
                type="button"
                className={tab === 'decisions' ? 'active' : ''}
                onClick={() => setTab('decisions')}
              >
                Kararlar
              </button>
              <button
                type="button"
                className={tab === 'settings' ? 'active' : ''}
                onClick={() => setTab('settings')}
              >
                Ayarlar
              </button>
            </div>

            {tab === 'calc' && (
              <Calculator
                settings={settings}
                decisions={decisions}
                dailyHours={dailyHours}
                onAdd={(decision) => void add(decision)}
                onToast={showToast}
              />
            )}

            {tab === 'decisions' && (
              <Decisions
                decisions={decisions}
                dailyHours={dailyHours}
                onUpdate={handleStatus}
                onDelete={(id) => void remove(id)}
              />
            )}

            {tab === 'settings' && (
              <SettingsView
                settings={settings}
                onSave={(next) => {
                  void saveSettings(next);
                  showToast('Ayarlar güncellendi');
                }}
                onReset={() => {
                  decisions.forEach((decision) => void remove(decision.id));
                  void saveSettings(DEFAULT_SETTINGS);
                  showToast('Veriler sıfırlandı');
                }}
                onToast={showToast}
              />
            )}
          </div>

          <aside className="panel-side">
            <div className="side-card">
              <span className="side-label">Saatlik değerin</span>
              <strong className="side-value">{formatTL(rate)}</strong>
              <span className="side-note">
                1 iş günü {formatNumber(dailyHours)} saat
              </span>
            </div>

            <div className="side-card">
              <span className="side-label">Kurtardığın hayat</span>
              <strong className="side-value">
                {savedHours > 0 ? formatDuration(savedHours, dailyHours) : '0 saat'}
              </strong>
              <span className="side-note">{skipped.length} karardan</span>
            </div>

            <div className="side-card">
              <span className="side-label">Bekleyen karar</span>
              <strong className="side-value">{waiting.length}</strong>
              <span className="side-note">Karar zamanı gelenleri kontrol et</span>
            </div>

            <div className="side-card premium-side">
              <span className="side-label">Premium</span>
              <strong className="side-value">
                {formatTL(49)}
                <small>/ay</small>
              </strong>
              <span className="side-note">
                Sınırsız karar, bulut, rapor ve widget.
              </span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => showToast('Premium yakında!')}
              >
                Yakında
              </button>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
