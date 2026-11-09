import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/lib/auth';
import { useDecisions } from '@/lib/decisions';
import { useProfile } from '@/lib/profile';
import { dailyCommitmentHours, priceToHours, realHourlyRate } from '@/lib/calc';
import { formatDuration, formatNumber, formatTL } from '@/lib/format';
import type { Decision } from '@/lib/types';
import {
  Card,
  Chip,
  Field,
  Header,
  Mono,
  PrimaryButton,
  RatePill,
  Screen,
  Stat,
} from '@/components/ui';
import { C, MONO } from '@/lib/theme';

const PRICE_CHIPS = [100, 500, 1000, 5000, 10000];
const WAIT_OPTIONS = [
  { days: 1, label: '1 GÜN' },
  { days: 3, label: '3 GÜN' },
  { days: 7, label: '7 GÜN' },
];

export default function CalculatorScreen() {
  const { user, demo } = useAuth();
  const userId = user?.id ?? null;
  const cloud = Boolean(userId && !demo);

  const { settings } = useProfile(userId, cloud);
  const { decisions, add } = useDecisions(userId, cloud);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [waitDays, setWaitDays] = useState(3);
  const [notice, setNotice] = useState<string | null>(null);

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
      <Header right={<RatePill rate={formatTL(rate)} />} />

      {notice ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>{notice}</Text>
        </View>
      ) : null}

      <Mono style={styles.section}>HESAPLA</Mono>

      <Card>
        <Field
          label="Ne almak istiyorsun? (opsiyonel)"
          value={name}
          onChangeText={setName}
          placeholder="Yeni telefon, ayakkabı..."
          size="md"
        />

        <Field
          label="Fiyatı"
          value={price}
          onChangeText={(text) => setPrice(text.replace(/\D/g, ''))}
          prefix="₺"
          placeholder="0"
          keyboardType="numeric"
        />

        <View style={styles.chips}>
          {PRICE_CHIPS.map((value) => (
            <Chip
              key={value}
              label={formatTL(value)}
              active={numericPrice === value}
              onPress={() => setPrice(String(value))}
            />
          ))}
        </View>
      </Card>

      {numericPrice > 0 ? (
        <Card accent style={styles.result}>
          <Mono>BU, SENİN</Mono>
          <Text style={styles.resultValue}>{duration}</Text>
          <Text style={styles.resultSub}>emeğin.</Text>
          <View style={styles.resultMeta}>
            <Mono>Saatlik değerin {formatTL(rate)}</Mono>
            <Mono>1 iş günü {formatNumber(dailyHours)} saat</Mono>
          </View>
        </Card>
      ) : null}

      {numericPrice > 0 ? (
        <Card>
          <Mono style={styles.cardTitle}>KARAR ZAMANI</Mono>
          <Text style={styles.help}>
            Hemen alma. Bir süre beklet, duygu geçsin.
          </Text>

          <View style={styles.chips}>
            {WAIT_OPTIONS.map((option) => (
              <Chip
                key={option.days}
                label={option.label}
                active={waitDays === option.days}
                onPress={() => setWaitDays(option.days)}
              />
            ))}
          </View>

          <View style={styles.addButton}>
            <PrimaryButton label="Listeye ekle" onPress={addDecision} />
          </View>
        </Card>
      ) : null}

      <View style={styles.stats}>
        <Stat
          label="Bu ay kurtardığın"
          value={
            savedHours > 0 ? formatDuration(savedHours, dailyHours) : '0 saat'
          }
        />
        <Stat
          label="Bekleyen karar"
          value={String(
            decisions.filter((decision) => decision.status === 'waiting')
              .length
          )}
        />
      </View>

      {decisions.length > 0 ? (
        <View style={styles.recentWrap}>
          <Mono style={styles.section}>SON KARARLAR</Mono>
          {decisions.slice(0, 3).map((decision) => (
            <View key={decision.id} style={styles.recent}>
              <View style={styles.recentCopy}>
                <Text style={styles.recentName}>{decision.name}</Text>
                <Text style={styles.recentPrice}>{formatTL(decision.price)}</Text>
              </View>
              <Text style={styles.recentHours}>
                {formatDuration(decision.hours, dailyHours)}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    marginLeft: 2,
  },
  notice: {
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.accent,
    backgroundColor: 'rgba(198,255,61,0.08)',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  noticeText: {
    color: C.accent,
    fontFamily: MONO,
    fontSize: 9,
    letterSpacing: 0.8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  result: {
    marginTop: 12,
  },
  resultValue: {
    marginTop: 8,
    color: C.text,
    fontSize: 46,
    fontWeight: '700',
    letterSpacing: -2,
  },
  resultSub: {
    color: C.muted,
    fontSize: 13,
  },
  resultMeta: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
    gap: 5,
  },
  cardTitle: {
    marginBottom: 4,
  },
  help: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  addButton: {
    marginTop: 14,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  recentWrap: {
    marginTop: 22,
  },
  recent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  recentCopy: {
    flex: 1,
  },
  recentName: {
    color: C.text,
    fontSize: 14,
    fontWeight: '600',
  },
  recentPrice: {
    marginTop: 2,
    color: C.muted,
    fontFamily: MONO,
    fontSize: 10,
  },
  recentHours: {
    color: C.accent,
    fontFamily: MONO,
    fontSize: 12,
    fontWeight: '700',
  },
});
