import type { Settings } from '../types';

export const WEEKS_PER_MONTH = 4.333;

export function weeklyCommitmentHours(settings: Settings): number {
  const commute =
    (settings.commuteMinutesPerDay / 60) * settings.workDaysPerWeek;
  return settings.weeklyHours + commute;
}

export function dailyCommitmentHours(settings: Settings): number {
  const days = settings.workDaysPerWeek > 0 ? settings.workDaysPerWeek : 5;
  return weeklyCommitmentHours(settings) / days;
}

export function realHourlyRate(settings: Settings): number {
  const monthlyHours = weeklyCommitmentHours(settings) * WEEKS_PER_MONTH;
  if (monthlyHours <= 0) return 0;
  return settings.monthlyIncome / monthlyHours;
}

export function priceToHours(price: number, settings: Settings): number {
  const rate = realHourlyRate(settings);
  if (rate <= 0) return 0;
  return price / rate;
}
