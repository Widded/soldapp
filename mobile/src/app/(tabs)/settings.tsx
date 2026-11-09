import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/lib/auth';
import { useDecisions } from '@/lib/decisions';
import { DEFAULT_SETTINGS, useProfile } from '@/lib/profile';
import { realHourlyRate } from '@/lib/calc';
import { formatTL } from '@/lib/format';
import type { Settings } from '@/lib/types';
import {
  Card,
  Field,
  GhostButton,
  Header,
  Mono,
  PrimaryButton,
  RatePill,
  Screen,
} from '@/components/ui';
import { C, MONO } from '@/lib/theme';

export default function SettingsScreen() {
  const { user, demo, signOut } = useAuth();
  const userId = user?.id ?? null;
  const cloud = Boolean(userId && !demo);

  const { settings, saveSettings } = useProfile(userId, cloud);
  const { decisions, remove } = useDecisions(userId, cloud);

  const [form, setForm] = useState<Settings>(settings);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const showNotice = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 2200);
  };

  const update = (key: keyof Settings, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: Number(value.replace(/\D/g, '')) || 0,
    }));
  };

  const save = () => {
    void saveSettings(form);
    showNotice('Ayarlar güncellendi');
  };

  const confirmReset = () => {
    Alert.alert(
      'Tüm verileri sıfırla',
      'Kararların ve ayarların silinecek. Bu işlem geri alınamaz.',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => {
            decisions.forEach((decision) => {
              void remove(decision.id);
            });
            void saveSettings(DEFAULT_SETTINGS);
            setForm(DEFAULT_SETTINGS);
            showNotice('Veriler sıfırlandı');
          },
        },
      ]
    );
  };

  const logout = () => {
    void signOut().then(() => router.replace('/login'));
  };

  return (
    <Screen>
      <Header right={<RatePill rate={formatTL(realHourlyRate(form))} />} />

      {notice ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>{notice}</Text>
        </View>
      ) : null}

      <Text style={styles.heading}>Profil</Text>
      <Text style={styles.sub}>
        {user && 'email' in user && user.email ? user.email : 'Hesabın'}
      </Text>

      <Card>
        <Field
          label="Aylık net kazanç"
          value={form.monthlyIncome ? String(form.monthlyIncome) : ''}
          onChangeText={(text) => update('monthlyIncome', text)}
          prefix="₺"
          keyboardType="numeric"
        />
        <Field
          label="Haftalık çalışma saati"
          value={form.weeklyHours ? String(form.weeklyHours) : ''}
          onChangeText={(text) => update('weeklyHours', text)}
          suffix="SAAT"
          keyboardType="numeric"
        />
        <Field
          label="Günlük yol süresi"
          value={
            form.commuteMinutesPerDay
              ? String(form.commuteMinutesPerDay)
              : ''
          }
          onChangeText={(text) => update('commuteMinutesPerDay', text)}
          suffix="DAKİKA"
          keyboardType="numeric"
        />
        <Field
          label="Haftalık çalışma günü"
          value={form.workDaysPerWeek ? String(form.workDaysPerWeek) : ''}
          onChangeText={(text) => update('workDaysPerWeek', text)}
          suffix="GÜN"
          keyboardType="numeric"
        />

        <View style={styles.preview}>
          <Mono>Gerçek saatlik değerin</Mono>
          <Text style={styles.previewValue}>
            {formatTL(realHourlyRate(form))}
          </Text>
        </View>

        <View style={styles.saveButton}>
          <PrimaryButton label="Kaydet" onPress={save} />
        </View>
      </Card>

      <View style={styles.block}>
        <Card accent>
          <Mono>Premium</Mono>
          <Text style={styles.premiumPrice}>
            ₺49<Text style={styles.premiumPeriod}> / ay</Text>
          </Text>
          <Text style={styles.help}>
            Sınırsız karar, bulut senkronizasyonu, haftalık rapor ve ana ekran
            widget'ı.
          </Text>
          <View style={styles.premiumButton}>
            <GhostButton
              label="Yakında"
              onPress={() => showNotice('Premium yakında.')}
            />
          </View>
        </Card>
      </View>

      <View style={styles.block}>
        <Card>
          <Mono>Veriler</Mono>
          <Text style={styles.help}>
            {demo
              ? 'Demo modundasın; veriler sadece bu cihazda tutulur.'
              : 'Verilerin hesabında ve cihazında saklanır.'}{' '}
            İstediğin an silebilirsin.
          </Text>
          <GhostButton
            label="Tüm verileri sıfırla"
            danger
            onPress={confirmReset}
          />
        </Card>
      </View>

      <View style={styles.block}>
        <GhostButton label="Çıkış yap" onPress={logout} />
      </View>

      <Text style={styles.footer}>SOLD · v0.1.0</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: C.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -1.1,
    lineHeight: 34,
  },
  sub: {
    marginTop: 6,
    marginBottom: 4,
    color: C.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  section: {
    marginBottom: 10,
    marginLeft: 2,
  },
  notice: {
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.lime,
    backgroundColor: 'rgba(176,228,204,0.08)',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  noticeText: {
    color: C.lime,
    fontFamily: MONO,
    fontSize: 9,
    letterSpacing: 0.8,
  },
  preview: {
    marginTop: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(64,138,113,0.3)',
    backgroundColor: 'rgba(64,138,113,0.06)',
    borderRadius: 2,
    padding: 14,
  },
  previewValue: {
    marginTop: 6,
    color: C.accent,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  saveButton: {
    marginTop: 2,
  },
  block: {
    marginTop: 12,
  },
  help: {
    marginTop: 8,
    marginBottom: 12,
    color: C.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  premiumPrice: {
    marginTop: 8,
    color: C.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -1,
  },
  premiumPeriod: {
    color: C.muted,
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: '400',
  },
  premiumButton: {
    marginTop: 2,
  },
  footer: {
    marginTop: 26,
    marginBottom: 10,
    textAlign: 'center',
    color: '#4a6b5f',
    fontFamily: MONO,
    fontSize: 8,
    letterSpacing: 1,
  },
});
