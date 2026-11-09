import { useCallback, useEffect, useState } from 'react';
import type { Decision, DecisionStatus } from '../types';
import { supabase } from './supabase';
import { loadDecisions, saveDecisions } from './storage';

type DecisionRow = {
  id: string;
  user_id: string;
  name: string;
  price: number;
  hours: number;
  status: DecisionStatus;
  created_at: string;
  decide_at: string;
};

function fromRow(row: DecisionRow): Decision {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    hours: Number(row.hours),
    status: row.status,
    createdAt: new Date(row.created_at).getTime(),
    decideAt: new Date(row.decide_at).getTime(),
  };
}

export function useDecisions(userId: string | null, cloud: boolean) {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      if (cloud && supabase && userId) {
        const { data, error } = await supabase
          .from('decisions')
          .select('*')
          .order('created_at', { ascending: false });

        if (mounted && !error && data) {
          const next = (data as DecisionRow[]).map(fromRow);
          setDecisions(next);
          saveDecisions(next);
          setLoading(false);
          return;
        }
      }

      if (mounted) {
        setDecisions(loadDecisions());
        setLoading(false);
      }
    }

    void boot();
    return () => {
      mounted = false;
    };
  }, [cloud, userId]);

  const add = useCallback(
    async (decision: Decision) => {
      setDecisions((prev) => {
        const next = [decision, ...prev];
        saveDecisions(next);
        return next;
      });

      if (cloud && supabase && userId) {
        await supabase.from('decisions').insert({
          id: decision.id,
          user_id: userId,
          name: decision.name,
          price: decision.price,
          hours: decision.hours,
          status: decision.status,
          created_at: new Date(decision.createdAt).toISOString(),
          decide_at: new Date(decision.decideAt).toISOString(),
        });
      }
    },
    [cloud, userId]
  );

  const updateStatus = useCallback(
    async (id: string, status: DecisionStatus) => {
      setDecisions((prev) => {
        const next = prev.map((decision) =>
          decision.id === id ? { ...decision, status } : decision
        );
        saveDecisions(next);
        return next;
      });

      if (cloud && supabase) {
        await supabase.from('decisions').update({ status }).eq('id', id);
      }
    },
    [cloud]
  );

  const remove = useCallback(
    async (id: string) => {
      setDecisions((prev) => {
        const next = prev.filter((decision) => decision.id !== id);
        saveDecisions(next);
        return next;
      });

      if (cloud && supabase) {
        await supabase.from('decisions').delete().eq('id', id);
      }
    },
    [cloud]
  );

  return { decisions, loading, add, updateStatus, remove };
}
