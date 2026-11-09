import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Decision, Settings } from './types';

const SETTINGS_KEY = 'sold.settings.v1';
const DECISIONS_KEY = 'sold.decisions.v1';

export async function loadSettings(): Promise<Settings | null> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Settings;
    if (!parsed || typeof parsed.monthlyIncome !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function loadDecisions(): Promise<Decision[]> {
  try {
    const raw = await AsyncStorage.getItem(DECISIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Decision[]) : [];
  } catch {
    return [];
  }
}

export async function saveDecisions(decisions: Decision[]): Promise<void> {
  await AsyncStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));
}
