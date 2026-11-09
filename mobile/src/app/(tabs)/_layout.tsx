import { Redirect, Tabs } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/lib/auth';
import { AppTabBar } from '@/components/navigation/AppTabBar';
import { C } from '@/lib/theme';

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: C.bg }} />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props: any) => <AppTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Ana Sayfa' }} />
      <Tabs.Screen name="decisions" options={{ title: 'Kararlar' }} />
      <Tabs.Screen name="stats" options={{ title: 'İstatistik' }} />
      <Tabs.Screen name="explore" options={{ title: 'Keşfet' }} />
      <Tabs.Screen name="settings" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
