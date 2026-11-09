import { useState, type ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { getTabBarHeight } from '@/components/navigation/AppTabBar';
import { C, MONO } from '@/lib/theme';

export function Screen({
  children,
  scroll = true,
}: {
  children: ReactNode;
  scroll?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const bottomPadding = getTabBarHeight(insets.bottom) + 12;
  const inner = <View style={styles.screenInner}>{children}</View>;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: bottomPadding },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

export function Header({ right }: { right?: ReactNode }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        <Text style={styles.brand}>
          SOLD<Text style={styles.brandAccent}>.</Text>
        </Text>
        <Text style={styles.tagline}>Fiyatları ömrüne çevir</Text>
      </View>
      {right}
    </View>
  );
}

export function RatePill({ rate }: { rate: string }) {
  return (
    <View style={styles.ratePill}>
      <Text style={styles.rateLabel}>Saatlik değerin</Text>
      <Text style={styles.rateValue}>{rate}</Text>
    </View>
  );
}

export function Mono({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[styles.mono, style]}>{children}</Text>;
}

export function Card({
  children,
  accent = false,
  style,
}: {
  children: ReactNode;
  accent?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.card, accent && styles.cardAccent, style]}>
      {children}
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryBtn,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
    </Pressable>
  );
}

export function GhostButton({
  label,
  onPress,
  danger = false,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.ghostBtn,
        danger && styles.ghostBtnDanger,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.ghostBtnText, danger && styles.ghostBtnTextDanger]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Chip({
  label,
  active = false,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  prefix,
  suffix,
  keyboardType = 'default',
  size = 'lg',
  multiline = false,
  autoCapitalize,
  secureTextEntry = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  keyboardType?: KeyboardTypeOptions;
  size?: 'lg' | 'md';
  multiline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.fieldRow, focused && styles.fieldRowFocus]}>
        {prefix ? <Text style={styles.affix}>{prefix}</Text> : null}
        <TextInput
          style={[
            styles.input,
            size === 'md' && styles.inputMd,
            multiline && styles.inputMultiline,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={C.faint}
          keyboardType={keyboardType}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {suffix ? <Text style={styles.affix}>{suffix}</Text> : null}
      </View>
    </View>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>{children}</Text>
    </View>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <View style={styles.toast} pointerEvents="none">
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
}

export function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  screenInner: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 22,
  },
  headerCopy: {
    flex: 1,
  },
  brand: {
    color: C.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  brandAccent: {
    color: C.lime,
  },
  tagline: {
    marginTop: 4,
    color: C.muted,
    fontFamily: MONO,
    fontSize: 11,
  },
  ratePill: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    backgroundColor: C.card,
    paddingHorizontal: 12,
    paddingVertical: 9,
    alignItems: 'flex-end',
  },
  rateLabel: {
    color: C.muted,
    fontFamily: MONO,
    fontSize: 10.5,
  },
  rateValue: {
    marginTop: 2,
    color: C.accent,
    fontFamily: MONO,
    fontSize: 15,
    fontWeight: '700',
  },
  mono: {
    color: C.muted,
    fontFamily: MONO,
    fontSize: 11,
  },
  card: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 22,
  },
  cardAccent: {
    borderColor: 'rgba(157,187,122,0.35)',
  },
  primaryBtn: {
    backgroundColor: C.accent,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: C.accentInk,
    fontFamily: MONO,
    fontSize: 14,
    fontWeight: '600',
  },
  ghostBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  ghostBtnDanger: {
    borderColor: 'rgba(255,107,107,0.3)',
  },
  ghostBtnText: {
    color: C.text,
    fontFamily: MONO,
    fontSize: 14,
    fontWeight: '500',
  },
  ghostBtnTextDanger: {
    color: C.danger,
  },
  disabled: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.75,
  },
  chip: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  chipText: {
    color: C.muted,
    fontFamily: MONO,
    fontSize: 13,
  },
  chipTextActive: {
    color: C.accentInk,
    fontWeight: '600',
  },
  stat: {
    flex: 1,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 15,
  },
  statLabel: {
    color: C.muted,
    fontFamily: MONO,
    fontSize: 11.5,
  },
  statValue: {
    marginTop: 6,
    color: C.text,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  field: {
    marginBottom: 14,
  },
  fieldLabel: {
    marginBottom: 7,
    color: C.muted,
    fontFamily: MONO,
    fontSize: 12,
    fontWeight: '500',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    backgroundColor: C.card2,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  fieldRowFocus: {
    borderColor: C.accent,
  },
  affix: {
    color: C.muted,
    fontFamily: MONO,
    fontSize: 13,
  },
  input: {
    flex: 1,
    padding: 0,
    color: C.text,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  inputMd: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
  },
  inputMultiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  empty: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: C.border,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 24,
    alignItems: 'center',
    backgroundColor: C.text,
    borderRadius: 999,
    paddingVertical: 12,
  },
  toastText: {
    color: C.bg,
    fontFamily: MONO,
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 16,
  },
});
