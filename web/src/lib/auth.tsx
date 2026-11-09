import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

const DEMO_USER_KEY = 'kacsaat.demoUser';
const DEMO_EMAIL = 'demo@kacsaat.app';

type DemoUser = { email: string };

type AuthContextValue = {
  user: User | DemoUser | null;
  session: Session | null;
  loading: boolean;
  demo: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: string | null; needsConfirmation?: boolean }>;
  signInDemo: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function isDemoUser(value: unknown): value is DemoUser {
  return Boolean(value && typeof value === 'object' && 'email' in value);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | DemoUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | null = null;

    if (!supabase) {
      const raw = localStorage.getItem(DEMO_USER_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (isDemoUser(parsed)) {
            setUser(parsed);
            setDemo(true);
          }
        } catch {
          /* bozuk kayıt */
        }
      }
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
      }
    );
    unsubscribe = () => listener.subscription.unsubscribe();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      const next = { email: email.trim() || DEMO_EMAIL };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(next));
      setUser(next);
      setDemo(true);
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error?.message ?? null };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      const next = { email: email.trim() || DEMO_EMAIL };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(next));
      setUser(next);
      setDemo(true);
      return { error: null };
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    return {
      error: error?.message ?? null,
      needsConfirmation: !error && !data.session,
    };
  }, []);

  const signInDemo = useCallback(() => {
    const next = { email: DEMO_EMAIL };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(next));
    setUser(next);
    setDemo(true);
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
    setSession(null);
    setDemo(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      demo,
      signIn,
      signUp,
      signInDemo,
      signOut,
    }),
    [user, session, loading, demo, signIn, signUp, signInDemo, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth, AuthProvider içinde kullanılmalı');
  return context;
}
