import { Platform } from 'react-native';

export const C = {
  bg: '#12100c',
  card: '#1b1712',
  card2: '#221d16',
  border: 'rgba(243,235,221,0.14)',
  text: '#f3ebdd',
  muted: '#a39b8b',
  faint: '#3a342a',
  accent: '#d9a441',
  accentInk: '#12100c',
  lime: '#c9f53f',
  moss: '#2f4a38',
  clay: '#c4553b',
  danger: '#c4553b',
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
