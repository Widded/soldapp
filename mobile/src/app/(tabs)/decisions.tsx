import { useMemo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/lib/auth';
import { useDecisions } from '@/lib/decisions';
import { useProfile } from '@/lib/profile';
import { dailyCommitmentHours, realHourlyRate } from '@/lib/calc';
import { formatDuration, formatTL } from '@/lib/format';
import type { DecisionStatus } from '@/lib/types';
import {
  Card,
  Empty,
  GhostButton,
  Header,
  Mono,
  PrimaryButton,
  RatePill,
  Screen,
  Stat,
} from '@/components/ui';
import { C, MONO } from '@/lib/theme';

function remainingLabel(decideAt: number): string {
  const diff = decideAt - Date.now();
  if (diff <= 0) return 'KARAR ZAMANI';
  const totalHours = Math.ceil(diff / (1000 * 60 * 60));
  if (totalHours < 24) return `${totalHours} SAAT KALDI`;
  const days = Math.ceil(totalHours / 24);
  return `${days} GÜN KALDI`;
}

export default function DecisionsScreen() {
  const { user, demo } = useAuth();
  const userId = user?.id ?? null;
  const cloud = Boolean(userId && !demo);

  const { settings } = useProfile(userId, cloud);
  const { decisions, updateStatus, remove } = useDecisions(userId, cloud);

  const dailyHours = useMemo(() => dailyCommitmentHours(settings), [settings]);
  const rate = realHourlyRate(settings);

  const waiting = decisions.filter((decision) => decision.status === 'waiting');
  const skipped = decisions.filter((decision) => decision.status === 'skipped');
  const savedHours = skipped.reduce((sum, decision) => sum + decision.hours, 0);

  const handleStatus = (id: string, status: DecisionStatus) => {
    void updateStatus(id, status);
  };

  const confirmDelete = (id: string) => {
    Alert.alert('Listeden kaldır', 'Bu kararı silmek istiyor musun?', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Kaldır',
        style: 'destructive',
        onPress: () => {
          void remove(id);
        },
      },
    ]);
  };

  return (
    <Screen>
      <Header right={<RatePill rate={formatTL(rate)} />} />

      <Mono style={styles.section}>KARARLARIN</Mono>

      <View style={styles.stats}>
        <Stat
          label="Kurtardığın hayat"
          value={savedHours > 0 ? formatDuration(savedHours, dailyHours) : '0 saat'}
        />
        <Stat label="Bekleyen" value={String(waiting.length)} />
      </View>

      {decisions.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Empty>
            Henüz karar yok.{'\n'}Hesapla sekmesinden bir şey ekle, burada
            beklesin.
          </Empty>
        </View>
      ) : null}

      <View style={styles.list}>
        {decisions.map((decision) => (
          <Card key={decision.id}>
            <View style={styles.top}>
              <View style={styles.topCopy}>
                <Text style={styles.name}>{decision.name}</Text>
                <Text style={styles.price}>{formatTL(decision.price)}</Text>
              </View>
              <Text style={styles.hours}>
                {formatDuration(decision.hours, dailyHours)}
              </Text>
            </View>

            {decision.status === 'waiting' ? (
              <Text style={[styles.badge, styles.badgeWaiting]}>
                {remainingLabel(decision.decideAt)}
              </Text>
            ) : null}
            {decision.status === 'bought' ? (
              <Text style={[styles.badge, styles.badgeMuted]}>ALDIN</Text>
            ) : null}
            {decision.status === 'skipped' ? (
              <Text style={[styles.badge, styles.badgeSkipped]}>
                VAZGEÇTİN
              </Text>
            ) : null}

            <View style={styles.actions}>
              {decision.status === 'waiting' ? (
                <>
                  <View style={styles.actionItem}>
                    <GhostButton
                      label="Aldım"
                      onPress={() => handleStatus(decision.id, 'bought')}
                    />
                  </View>
                  <View style={styles.actionItem}>
                    <PrimaryButton
                      label="Vazgeçtim"
                      onPress={() => handleStatus(decision.id, 'skipped')}
                    />
                  </View>
                </>
              ) : (
                <View style={styles.actionItem}>
                  <GhostButton
                    label="Listeden kaldır"
                    danger
                    onPress={() => confirmDelete(decision.id)}
                  />
                </View>
              )}
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    marginLeft: 2,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  emptyWrap: {
    marginTop: 6,
  },
  list: {
    gap: 10,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  topCopy: {
    flex: 1,
  },
  name: {
    color: C.text,
    fontSize: 15,
    fontWeight: '600',
  },
  price: {
    marginTop: 3,
    color: C.muted,
    fontFamily: MONO,
    fontSize: 10,
  },
  hours: {
    color: C.accent,
    fontFamily: MONO,
    fontSize: 12,
    fontWeight: '700',
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    fontFamily: MONO,
    fontSize: 8,
    letterSpacing: 0.8,
    overflow: 'hidden',
  },
  badgeWaiting: {
    color: C.accent,
    backgroundColor: 'rgba(198,255,61,0.08)',
  },
  badgeMuted: {
    color: C.muted,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  badgeSkipped: {
    color: C.accent,
    backgroundColor: 'rgba(198,255,61,0.08)',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  actionItem: {
    flex: 1,
  },
});
