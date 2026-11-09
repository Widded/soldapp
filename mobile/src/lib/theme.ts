import { Platform } from 'react-native';

export const C = {
  bg: '#050505',
  card: '#101010',
  card2: '#181818',
  border: 'rgba(255,255,255,0.09)',
  text: '#ededed',
  muted: '#8f8f8f',
  faint: '#2a2a2a',
  accent: '#ededed',
  accentInk: '#050505',
  lime: '#ffffff',
  moss: '#1c1c1c',
  clay: '#8f8f8f',
  danger: '#e07a5f',
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
