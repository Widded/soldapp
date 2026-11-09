import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { C } from '@/lib/theme';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

interface TabConfig {
  label: string;
  icon: FeatherName;
}

/** Bar height without the bottom safe-area inset. */
export const TAB_BAR_BASE_HEIGHT = 76;

/** Total height the floating bar occupies above the screen's bottom edge. */
export function getTabBarHeight(bottomInset: number): number {
  return TAB_BAR_BASE_HEIGHT + Math.max(bottomInset, 8);
}

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { label: 'Ana Sayfa', icon: 'home' },
  decisions: { label: 'Kararlar', icon: 'list' },
  stats: { label: 'İstatistik', icon: 'bar-chart-2' },
  explore: { label: 'Keşfet', icon: 'compass' },
  settings: { label: 'Profil', icon: 'user' },
};

const TAB_PATHS: Record<
  string,
  '/' | '/decisions' | '/stats' | '/explore' | '/settings'
> = {
  index: '/',
  decisions: '/decisions',
  stats: '/stats',
  explore: '/explore',
  settings: '/settings',
};

interface TabRoute {
  key: string;
  name: string;
}

interface AppTabBarProps {
  state: { index: number; routes: TabRoute[] };
  insets?: { bottom: number };
}

/**
 * Floating, frosted bottom navigation.
 * Rendered above the screen content (absolute) so the app background never
 * shows as a solid band behind the bar; content scrolls behind the blur.
 * Screens add `getTabBarHeight()` as bottom padding to keep content reachable.
 */
export function AppTabBar({ state, insets }: AppTabBarProps) {
  const safeInsets = useSafeAreaInsets();
  const router = useRouter();
  const bottomInset = Math.max(insets?.bottom ?? safeInsets.bottom, 8);

  return (
    <View
      style={[styles.container, { paddingBottom: bottomInset + 6 }]}
      pointerEvents="box-none"
    >
      <View style={styles.shadow}>
        <View style={styles.card}>
          <BlurView intensity={60} tint="dark" style={styles.blur} />
          <View pointerEvents="none" style={styles.tint} />

          {state.routes.map((route, index) => {
            const config = TAB_CONFIG[route.name];
            if (!config) return null;

            const focused = state.index === index;

            return (
              <Pressable
                key={route.key}
                onPress={() => router.navigate(TAB_PATHS[route.name] ?? '/')}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={config.label}
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
              >
                <View
                  style={[styles.iconWrap, focused && styles.iconWrapFocused]}
                >
                  <Feather
                    name={config.icon}
                    size={18}
                    color={focused ? C.accentInk : C.muted}
                  />
                </View>
                <Text
                  style={[styles.label, focused && styles.labelFocused]}
                  numberOfLines={1}
                >
                  {config.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  shadow: {
    borderRadius: 21,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.45,
        shadowRadius: 20,
      },
    }),
  },
  card: {
    height: 62,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.09)',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'rgba(16, 16, 16, 0.72)',
    ...Platform.select({
      android: {
        elevation: 18,
      },
    }),
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 5, 0.25)',
  },
  item: {
    flex: 1,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  itemPressed: {
    opacity: 0.65,
  },
  iconWrap: {
    width: 34,
    height: 26,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapFocused: {
    backgroundColor: C.accent,
  },
  label: {
    color: C.muted,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  labelFocused: {
    color: C.text,
    fontWeight: '700',
  },
});
