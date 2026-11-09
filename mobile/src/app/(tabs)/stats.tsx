import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/lib/auth';
import { useDecisions } from '@/lib/decisions';
import { useProfile } from '@/lib/profile';
import { dailyCommitmentHours, realHourlyRate } from '@/lib/calc';
import { formatDuration, formatTL } from '@/lib/format';
import type { DecisionStatus } from '@/lib/types';
import { Header, RatePill, Screen, Stat } from '@/components/ui';
import { C } from '@/lib/theme';

function statusLabel(status: DecisionStatus): string {
  if (status === 'waiting') return 'Bekliyor';
  if (status === 'bought') return 'Aldın';
  return 'Vazgeçtin';
}

export default function StatsScreen() {
  const { user, demo } = useAuth();
  const userId = user?.id ?? null;
  const cloud = Boolean(userId && !demo);

  const { settings } = useProfile(userId, cloud);
  const { decisions } = useDecisions(userId, cloud);

  const dailyHours = useMemo(() => dailyCommitmentHours(settings), [settings]);
  const rate = realHourlyRate(settings);

  const waiting = decisions.filter((decision) => decision.status === 'waiting');
  const skipped = decisions.filter((decision) => decision.status === 'skipped');
  const bought = decisions.filter((decision) => decision.status === 'bought');
  const savedHours = skipped.reduce((sum, decision) => sum + decision.hours, 0);

  const now = new Date();
  const monthlySaved = skipped
    .filter((decision) => {
      const created = new Date(decision.createdAt);
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, decision) => sum + decision.hours, 0);

  return (
    <Screen>
      <Header right={<RatePill rate={formatTL(rate)} />} />

      <Text style={styles.heading}>İstatistik</Text>
      <Text style={styles.sub}>Zamanın nereye gittiğini gör.</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Toplam kurtardığın</Text>
        <Text style={styles.heroValue}>
          {savedHours > 0 ? formatDuration(savedHours, dailyHours) : '0 saat'}
        </Text>
        <Text style={styles.heroMeta}>
          Bu ay {monthlySaved > 0 ? formatDuration(monthlySaved, dailyHours) : '0 saat'}
          {' · '}
          {skipped.length} karardan
        </Text>
      </View>

      <View style={styles.row}>
        <Stat label="Bekleyen" value={String(waiting.length)} />
        <Stat label="Vazgeçtin" value={String(skipped.length)} />
      </View>
      <View style={styles.row}>
        <Stat label="Aldın" value={String(bought.length)} />
        <Stat label="Saatlik değerin" value={formatTL(rate)} />
      </View>

      <Text style={styles.sectionTitle}>Son kararlar</Text>

      {decisions.length === 0 ? (
        <Text style={styles.empty}>
          Henüz veri yok. İlk kararını Ana Sayfa'dan ekle.
        </Text>
      ) : (
        decisions.slice(0, 5).map((decision) => (
          <View key={decision.id} style={styles.recentRow}>
            <View style={styles.recentCopy}>
              <Text style={styles.recentName}>{decision.name}</Text>
              <Text style={styles.recentMeta}>
                {formatTL(decision.price)} · {statusLabel(decision.status)}
              </Text>
            </View>
            <Text style={styles.recentTime}>
              {formatDuration(decision.hours, dailyHours)}
            </Text>
          </View>
        ))
      )}
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
    marginTop: 8,
    color: C.muted,
    fontSize: 13.5,
    lineHeight: 20,
  },
  heroCard: {
    marginTop: 22,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200,255,77,0.24)',
    backgroundColor: C.card,
  },
  heroLabel: {
    color: C.muted,
    fontSize: 12,
  },
  heroValue: {
    marginTop: 6,
    color: C.accent,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1.6,
    lineHeight: 44,
  },
  heroMeta: {
    marginTop: 4,
    color: C.muted,
    fontSize: 11.5,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 6,
    color: C.text,
    fontSize: 15,
    fontWeight: '600',
  },
  empty: {
    marginTop: 8,
    color: C.muted,
    fontSize: 12.5,
    lineHeight: 19,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  recentCopy: {
    flex: 1,
  },
  recentName: {
    color: C.text,
    fontSize: 13.5,
    fontWeight: '500',
  },
  recentMeta: {
    marginTop: 2,
    color: C.muted,
    fontSize: 11,
  },
  recentTime: {
    color: C.text,
    fontSize: 12.5,
    fontWeight: '600',
  },
});
