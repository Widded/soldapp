import type { Decision, DecisionStatus } from '../types';
import { formatDuration, formatTL } from '../lib/format';

type Props = {
  decisions: Decision[];
  dailyHours: number;
  onUpdate: (id: string, status: DecisionStatus) => void;
  onDelete: (id: string) => void;
};

function remainingLabel(decideAt: number): string {
  const diff = decideAt - Date.now();
  if (diff <= 0) return 'Karar zamanı';
  const totalHours = Math.ceil(diff / (1000 * 60 * 60));
  if (totalHours < 24) return `${totalHours} saat kaldı`;
  const days = Math.ceil(totalHours / 24);
  return `${days} gün kaldı`;
}

export function Decisions({
  decisions,
  dailyHours,
  onUpdate,
  onDelete,
}: Props) {
  const waiting = decisions.filter((decision) => decision.status === 'waiting');
  const skipped = decisions.filter((decision) => decision.status === 'skipped');
  const savedHours = skipped.reduce((sum, decision) => sum + decision.hours, 0);

  return (
    <div className="stack">
      <div>
        <p className="section-label">Kararların</p>
        <div className="stat-grid">
          <div className="stat">
            <span>Kurtardığın hayat</span>
            <strong>
              {savedHours > 0 ? formatDuration(savedHours, dailyHours) : '0 saat'}
            </strong>
          </div>
          <div className="stat">
            <span>Bekleyen</span>
            <strong>{waiting.length}</strong>
          </div>
        </div>
      </div>

      {decisions.length === 0 && (
        <div className="empty">
          Henüz karar yok.
          <br />
          Hesapla sekmesinden bir şey ekle, burada beklesin.
        </div>
      )}

      <div className="decision-list">
        {decisions.map((decision) => (
          <div key={decision.id} className="decision animate">
            <div className="decision-top">
              <div>
                <p className="decision-name">{decision.name}</p>
                <p className="decision-price">{formatTL(decision.price)}</p>
              </div>
              <span className="decision-hours">
                {formatDuration(decision.hours, dailyHours)}
              </span>
            </div>

            {decision.status === 'waiting' && (
              <span className="badge badge-waiting">
                {remainingLabel(decision.decideAt)}
              </span>
            )}
            {decision.status === 'bought' && (
              <span className="badge badge-bought">Aldın</span>
            )}
            {decision.status === 'skipped' && (
              <span className="badge badge-skipped">Vazgeçtin</span>
            )}

            <div className="decision-actions">
              {decision.status === 'waiting' && (
                <>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => onUpdate(decision.id, 'bought')}
                  >
                    Aldım
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onUpdate(decision.id, 'skipped')}
                  >
                    Vazgeçtim
                  </button>
                </>
              )}

              {decision.status !== 'waiting' && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(decision.id)}
                >
                  Listeden kaldır
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
