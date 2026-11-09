import { StyleSheet, Text, View } from 'react-native';
import { Header, Screen } from '@/components/ui';
import { C } from '@/lib/theme';

const ITEMS = [
  {
    title: 'Haftalık rapor',
    text: 'Nereye gittiğini gör. Harcamalarını saat cinsinden oku.',
    tag: 'Yakında',
  },
  {
    title: 'Ana ekran widget’ı',
    text: 'Uygulamayı açmadan, anlık çevirici ile hesapla.',
    tag: 'Yakında',
  },
  {
    title: 'Arkadaşla paylaş',
    text: 'Kararını paylaş, destek al. Birlikte daha az harca.',
    tag: 'Yakında',
  },
  {
    title: 'Premium',
    text: 'Sınırsız karar, bulut senkronizasyonu ve detaylı analiz.',
    tag: 'Yakında',
  },
];

export default function ExploreScreen() {
  return (
    <Screen>
      <Header />

      <Text style={styles.heading}>Keşfet</Text>
      <Text style={styles.sub}>SOLD’u daha çok işine yarayacak hale getirecek özellikler.</Text>

      <View style={styles.list}>
        {ITEMS.map((item) => (
          <View key={item.title} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            </View>
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}
      </View>
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
  list: {
    marginTop: 22,
    gap: 10,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    color: C.text,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tagText: {
    color: C.lime,
    fontSize: 10,
    fontWeight: '600',
  },
  cardText: {
    marginTop: 8,
    color: C.muted,
    fontSize: 12.5,
    lineHeight: 19,
  },
});
