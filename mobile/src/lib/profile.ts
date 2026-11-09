import { useCallback, useEffect, useState } from 'react';
import type { Settings } from './types';
import { supabase } from './supabase';
import { loadSettings, saveSettings } from './storage';

export const DEFAULT_SETTINGS: Settings = {
  monthlyIncome: 30000,
  weeklyHours: 45,
  commuteMinutesPerDay: 60,
  workDaysPerWeek: 5,
};

type ProfileRow = {
  monthly_income: number | null;
  weekly_hours: number | null;
  commute_minutes: number | null;
  work_days: number | null;
};

export function useProfile(userId: string | null, cloud: boolean) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      const local = await loadSettings();

      if (cloud && supabase && userId) {
        const { data, error } = await supabase
          .from('profiles')
          .select('monthly_income, weekly_hours, commute_minutes, work_days')
          .eq('id', userId)
          .maybeSingle();

        if (mounted && !error && data) {
          const row = data as ProfileRow;
          const next: Settings = {
            monthlyIncome: Number(row.monthly_income ?? local?.monthlyIncome ?? DEFAULT_SETTINGS.monthlyIncome),
            weeklyHours: Number(row.weekly_hours ?? local?.weeklyHours ?? DEFAULT_SETTINGS.weeklyHours),
            commuteMinutesPerDay: Number(
              row.commute_minutes ?? local?.commuteMinutesPerDay ?? DEFAULT_SETTINGS.commuteMinutesPerDay
            ),
            workDaysPerWeek: Number(
              row.work_days ?? local?.workDaysPerWeek ?? DEFAULT_SETTINGS.workDaysPerWeek
            ),
          };
          setSettings(next);
          await saveSettings(next);
          if (mounted) setLoading(false);
          return;
        }
      }

      if (mounted) {
        setSettings(local ?? DEFAULT_SETTINGS);
        setLoading(false);
      }
    }

    void boot();
    return () => {
      mounted = false;
    };
  }, [cloud, userId]);

  const save = useCallback(
    async (next: Settings) => {
      setSettings(next);
      await saveSettings(next);

      if (cloud && supabase && userId) {
        await supabase.from('profiles').upsert({
          id: userId,
          monthly_income: next.monthlyIncome,
          weekly_hours: next.weeklyHours,
          commute_minutes: next.commuteMinutesPerDay,
          work_days: next.workDaysPerWeek,
          updated_at: new Date().toISOString(),
        });
      }
    },
    [cloud, userId]
  );

  return { settings, loading, saveSettings: save };
}
