import { Platform } from 'react-native';

export const C = {
  bg: '#08090a',
  card: '#101113',
  card2: '#15171a',
  border: '#222428',
  text: '#f5f6f4',
  muted: '#8f9399',
  faint: '#3a3d42',
  accent: '#c8ff4d',
  accentInk: '#0a0b08',
  danger: '#ff6b6b',
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
