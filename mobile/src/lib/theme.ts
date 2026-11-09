import { Platform } from 'react-native';

export const C = {
  bg: '#091413',
  card: '#10201a',
  card2: '#142a22',
  border: 'rgba(176,228,204,0.12)',
  text: '#b0e4cc',
  muted: '#7fa898',
  faint: '#2a4a3e',
  accent: '#408a71',
  accentInk: '#091413',
  lime: '#b0e4cc',
  moss: '#285a48',
  clay: '#7fa898',
  danger: '#c47a5a',
};

export const MONO = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'system-ui',
});

export const SERIF = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia',
});
