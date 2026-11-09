import { Redirect, Tabs } from 'expo-router';
import { View, type ColorValue } from 'react-native';
import { useAuth } from '@/lib/auth';
import { C, MONO } from '@/lib/theme';

function Dot({ color }: { color: ColorValue }) {
  return (
    <View
      style={{
        width: 6,
        height: 6,
        backgroundColor: color,
        marginBottom: 2,
      }}
    />
  );
}

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
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: C.card,
          borderTopColor: C.border,
          height: 64,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: C.accent,
        tabBarInactiveTintColor: C.muted,
        tabBarLabelStyle: {
          fontFamily: MONO,
          fontSize: 8,
          letterSpacing: 1,
          textTransform: 'uppercase',
        },
        tabBarIcon: ({ color }) => <Dot color={color} />,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Hesapla' }} />
      <Tabs.Screen name="decisions" options={{ title: 'Kararlar' }} />
      <Tabs.Screen name="settings" options={{ title: 'Ayarlar' }} />
    </Tabs>
  );
}
