import type { Decision, Settings } from '../types';

const SETTINGS_KEY = 'kacsaat.settings.v1';
const DECISIONS_KEY = 'kacsaat.decisions.v1';

export function loadSettings(): Settings | null {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Settings;
    if (!parsed || typeof parsed.monthlyIncome !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadDecisions(): Decision[] {
  try {
    const raw = localStorage.getItem(DECISIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Decision[]) : [];
  } catch {
    return [];
  }
}

export function saveDecisions(decisions: Decision[]): void {
  localStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));
}
