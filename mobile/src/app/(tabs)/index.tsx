import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/lib/auth';
import { useDecisions } from '@/lib/decisions';
import { useProfile } from '@/lib/profile';
import { dailyCommitmentHours, priceToHours, realHourlyRate } from '@/lib/calc';
import { formatDuration, formatNumber, formatTL } from '@/lib/format';
import type { Decision } from '@/lib/types';
import { Screen } from '@/components/ui';
import { C } from '@/lib/theme';

const PRICE_CHIPS = [100, 500, 1000, 5000, 10000];
const WAIT_OPTIONS = [
  { days: 1, label: '1 gün' },
  { days: 3, label: '3 gün' },
  { days: 7, label: '7 gün' },
];

export default function HomeScreen() {
  const { user, demo } = useAuth();
  const userId = user?.id ?? null;
  const cloud = Boolean(userId && !demo);

  const { settings } = useProfile(userId, cloud);
  const { decisions, add } = useDecisions(userId, cloud);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [waitDays, setWaitDays] = useState(3);
  const [notice, setNotice] = useState<string | null>(null);

  const resultScale = useRef(new Animated.Value(1)).current;

  const dailyHours = useMemo(() => dailyCommitmentHours(settings), [settings]);
  const rate = realHourlyRate(settings);
  const numericPrice = Number(price.replace(/\D/g, '')) || 0;
  const hours = useMemo(
    () => priceToHours(numericPrice, settings),
    [numericPrice, settings]
  );
  const duration = formatDuration(hours, dailyHours);

  const now = new Date();
  const savedHours = decisions
    .filter((decision) => {
      if (decision.status !== 'skipped') return false;
      const created = new Date(decision.createdAt);
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, decision) => sum + decision.hours, 0);

  const email = user && 'email' in user ? user.email ?? '' : '';
  const initial = email ? email.charAt(0).toUpperCase() : 'S';

  useEffect(() => {
    if (numericPrice <= 0) return;
    resultScale.setValue(0.96);
    Animated.spring(resultScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 140,
    }).start();
  }, [numericPrice, resultScale]);

  const showNotice = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 2200);
  };

  const addDecision = () => {
    if (numericPrice <= 0) return;
    const timestamp = Date.now();
    const decision: Decision = {
      id: `${timestamp}-${Math.random().toString(36).slice(2, 9)}`,
      name: name.trim() || 'İsimsiz istek',
      price: numericPrice,
      hours,
      status: 'waiting',
      createdAt: timestamp,
      decideAt: timestamp + waitDays * 24 * 60 * 60 * 1000,
    };

    void add(decision);
    setName('');
    setPrice('');
    showNotice('Karar listesine eklendi');
  };

  return (
    <Screen>
      <View style={styles.topBar}>
        <Text style={styles.logo}>
          SOLD<Text style={styles.logoDot}>.</Text>
        </Text>

        <Pressable
          style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
          onPress={() => router.push('/settings')}
        >
          <Text style={styles.avatarText}>{initial}</Text>
        </Pressable>
      </View>

      <Text style={styles.heading}>Bugün ne alacaksın?</Text>
      <Text style={styles.sub}>
        Fiyatı yaz; kaç saatlik emeğin olduğunu gör.
      </Text>

      <View style={styles.inputCard}>
        <TextInput
          style={styles.itemInput}
          value={name}
          onChangeText={setName}
          placeholder="Ne almak istiyorsun? (opsiyonel)"
          placeholderTextColor={C.faint}
          maxLength={60}
        />

        <View style={styles.priceRow}>
          <Text style={styles.currency}>₺</Text>
          <TextInput
            style={styles.priceInput}
            value={price}
            onChangeText={(text) => setPrice(text.replace(/\D/g, ''))}
            placeholder="0"
            placeholderTextColor={C.faint}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.chips}>
          {PRICE_CHIPS.map((value) => (
            <Pressable
              key={value}
              onPress={() => setPrice(String(value))}
              style={[
                styles.chip,
                numericPrice === value && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  numericPrice === value && styles.chipTextActive,
                ]}
              >
                {formatTL(value)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {numericPrice > 0 ? (
        <Animated.View
          style={[styles.result, { transform: [{ scale: resultScale }] }]}
        >
          <Text style={styles.resultLabel}>BU, SENİN</Text>
          <Text style={styles.resultValue}>{duration}</Text>
          <Text style={styles.resultSub}>emeğin.</Text>

          <View style={styles.resultMeta}>
            <Text style={styles.metaText}>
              Saatlik değerin {formatTL(rate)}
            </Text>
            <Text style={styles.metaText}>
              1 iş günü {formatNumber(dailyHours)} saat
            </Text>
          </View>
        </Animated.View>
      ) : null}

      <View style={styles.waitRow}>
        <Text style={styles.waitLabel}>Bekletme</Text>
        <View style={styles.waitOptions}>
          {WAIT_OPTIONS.map((option) => (
            <Pressable
              key={option.days}
              onPress={() => setWaitDays(option.days)}
              style={[
                styles.waitChip,
                waitDays === option.days && styles.waitChipActive,
              ]}
            >
              <Text
                style={[
                  styles.waitText,
                  waitDays === option.days && styles.waitTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        onPress={addDecision}
        disabled={numericPrice <= 0}
        style={({ pressed }) => [
          styles.addButton,
          numericPrice <= 0 && styles.addButtonDisabled,
          pressed && styles.pressed,
        ]}
      >
        <Text
          style={[
            styles.addButtonText,
            numericPrice <= 0 && styles.addButtonTextDisabled,
          ]}
        >
          Karar listesine ekle
        </Text>
      </Pressable>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.recent}>
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Son kararlar</Text>
          <Pressable onPress={() => router.push('/decisions')}>
            <Text style={styles.seeAll}>Tümü</Text>
          </Pressable>
        </View>

        {decisions.length === 0 ? (
          <Text style={styles.empty}>
            Henüz karar yok. İlk fiyatı yaz, listeye ekle.
          </Text>
        ) : (
          decisions.slice(0, 3).map((decision) => (
            <Pressable
              key={decision.id}
              onPress={() => router.push('/decisions')}
              style={styles.recentRow}
            >
              <View
                style={[
                  styles.statusDot,
                  decision.status === 'waiting' && styles.statusDotWaiting,
                  decision.status === 'skipped' && styles.statusDotSkipped,
                  decision.status === 'bought' && styles.statusDotBought,
                ]}
              />
              <View style={styles.recentCopy}>
                <Text style={styles.recentName}>{decision.name}</Text>
                <Text style={styles.recentPrice}>
                  {formatTL(decision.price)}
                </Text>
              </View>
              <Text style={styles.recentTime}>
                {formatDuration(decision.hours, dailyHours)}
              </Text>
            </Pressable>
          ))
        )}

        <Text style={styles.saved}>
          Bu ay{' '}
          {savedHours > 0 ? formatDuration(savedHours, dailyHours) : '0 saat'}{' '}
          kurtardın.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  logo: {
    color: C.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  logoDot: {
    color: C.accent,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: C.text,
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
  heading: {
    color: C.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -1.1,
    lineHeight: 34,
  },
  sub: {
    marginTop: 8,
    color: C.muted,
    fontSize: 13.5,
    lineHeight: 20,
  },
  inputCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
  },
  itemInput: {
    padding: 0,
    marginBottom: 14,
    color: C.text,
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  currency: {
    color: C.muted,
    fontSize: 24,
    fontWeight: '500',
  },
  priceInput: {
    flex: 1,
    padding: 0,
    color: C.text,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1.8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.border,
  },
  chipActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  chipText: {
    color: C.muted,
    fontSize: 12,
    fontWeight: '500',
  },
  chipTextActive: {
    color: C.accentInk,
    fontWeight: '600',
  },
  result: {
    marginTop: 20,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  resultLabel: {
    color: C.muted,
    fontSize: 12,
    fontWeight: '500',
  },
  resultValue: {
    marginTop: 6,
    color: C.lime,
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: -2,
    lineHeight: 48,
  },
  resultSub: {
    color: C.muted,
    fontSize: 14,
  },
  resultMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  metaText: {
    color: C.muted,
    fontSize: 11.5,
  },
  waitRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  waitLabel: {
    color: C.muted,
    fontSize: 12,
  },
  waitOptions: {
    flexDirection: 'row',
    gap: 6,
  },
  waitChip: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.border,
  },
  waitChipActive: {
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  waitText: {
    color: C.muted,
    fontSize: 12,
  },
  waitTextActive: {
    color: C.accent,
    fontWeight: '600',
  },
  addButton: {
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: C.accent,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  addButtonText: {
    color: C.accentInk,
    fontSize: 14,
    fontWeight: '600',
  },
  addButtonTextDisabled: {
    color: C.muted,
  },
  notice: {
    marginTop: 10,
    color: C.lime,
    fontSize: 12,
    textAlign: 'center',
  },
  recent: {
    marginTop: 32,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionTitle: {
    color: C.text,
    fontSize: 15,
    fontWeight: '600',
  },
  seeAll: {
    color: C.muted,
    fontSize: 12,
  },
  empty: {
    marginTop: 10,
    color: C.muted,
    fontSize: 12.5,
    lineHeight: 19,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  statusDotWaiting: {
    backgroundColor: C.muted,
  },
  statusDotSkipped: {
    backgroundColor: C.lime,
  },
  statusDotBought: {
    backgroundColor: C.clay,
  },
  recentCopy: {
    flex: 1,
  },
  recentName: {
    color: C.text,
    fontSize: 13.5,
    fontWeight: '500',
  },
  recentPrice: {
    marginTop: 2,
    color: C.muted,
    fontSize: 11,
  },
  recentTime: {
    color: C.lime,
    fontSize: 12.5,
    fontWeight: '600',
  },
  saved: {
    marginTop: 18,
    color: C.muted,
    fontSize: 11.5,
    textAlign: 'center',
  },
});
