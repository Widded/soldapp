import { useState } from 'react';
import { Redirect, router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuth } from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase';
import { C, SERIF } from '@/lib/theme';
import {
  Card,
  Field,
  GhostButton,
  Mono,
  PrimaryButton,
  Screen,
} from '@/components/ui';

export default function LoginScreen() {
  const { user, signIn, signUp, signInDemo } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (user) return <Redirect href="/" />;

  const submit = async () => {
    setError(null);
    setInfo(null);

    if (mode === 'signup' && password.length < 6) {
      setError('Şifre en az 6 karakter olmalı.');
      return;
    }

    setBusy(true);
    const result =
      mode === 'login'
        ? await signIn(email, password)
        : await signUp(email, password);
    setBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if ('needsConfirmation' in result && result.needsConfirmation) {
      setInfo('Hesabın oluşturuldu. E-postandaki onay bağlantısına tıkla.');
      return;
    }

    router.replace('/');
  };

  return (
    <Screen scroll={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrap}
      >
        <View style={styles.top}>
          <Text style={styles.brand}>
            SOLD<Text style={styles.brandAccent}>.</Text>
          </Text>
          <Mono style={styles.eyebrow}>GİRİŞ / KAYIT</Mono>
          <Text style={styles.title}>
            Ömrünü harcamadan{'\n'}önce{' '}
            <Text style={styles.titleItalic}>hesapla.</Text>
          </Text>
          <Text style={styles.sub}>
            Hesabınla kararların bulutta kalsın; mobil ve web aynı yerde.
          </Text>
        </View>

        <Card accent>
          <Field
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            placeholder="sen@ornek.com"
            keyboardType="email-address"
            autoCapitalize="none"
            size="md"
          />
          <Field
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            placeholder="En az 6 karakter"
            secureTextEntry
            size="md"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {info ? <Text style={styles.info}>{info}</Text> : null}

          <PrimaryButton
            label={
              busy
                ? 'Bekle…'
                : mode === 'login'
                  ? 'Giriş yap'
                  : 'Hesap oluştur'
            }
            onPress={submit}
            disabled={busy}
          />
        </Card>

        <View style={styles.below}>
          <GhostButton
            label={
              mode === 'login'
                ? 'Hesabın yok mu? Kayıt ol'
                : 'Zaten hesabın var mı? Giriş yap'
            }
            onPress={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError(null);
              setInfo(null);
            }}
          />

          {!isSupabaseConfigured && (
            <>
              <GhostButton
                label="Demo ile devam et"
                onPress={async () => {
                  await signInDemo();
                  router.replace('/');
                }}
              />
              <Mono style={styles.demoNote}>
                SUPABASE ANAHTARI YOK — DEMO MODU CİHAZDA ÇALIŞIR.
              </Mono>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  top: {
    marginBottom: 26,
  },
  brand: {
    color: C.text,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.8,
    marginBottom: 26,
  },
  brandAccent: {
    color: C.accent,
  },
  eyebrow: {
    marginBottom: 12,
  },
  title: {
    color: C.text,
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -1.4,
  },
  titleItalic: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontWeight: '400',
    color: C.accent,
    letterSpacing: -0.5,
  },
  sub: {
    marginTop: 14,
    color: C.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  error: {
    marginBottom: 12,
    color: C.danger,
    fontSize: 12,
    lineHeight: 18,
  },
  info: {
    marginBottom: 12,
    color: C.accent,
    fontSize: 12,
    lineHeight: 18,
  },
  below: {
    marginTop: 14,
    gap: 10,
  },
  demoNote: {
    textAlign: 'center',
    marginTop: 2,
  },
});
