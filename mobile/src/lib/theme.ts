import { Platform } from 'react-native';

export const C = {
  bg: '#050505',
  card: '#0b0b0b',
  card2: '#080808',
  border: '#1c1c1c',
  text: '#f4f4f0',
  muted: '#8b8b85',
  faint: '#3d3d3d',
  accent: '#c6ff3d',
  accentInk: '#050505',
  danger: '#ff6b6b',
};

export const MONO = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export const SERIF = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia',
});
