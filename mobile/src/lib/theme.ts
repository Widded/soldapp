import { Platform } from 'react-native';

export const C = {
  bg: '#14120e',
  card: '#1c1914',
  card2: '#242019',
  border: 'rgba(237,230,216,0.13)',
  text: '#ede6d8',
  muted: '#9c958a',
  faint: '#3a352c',
  accent: '#c6a15b',
  accentInk: '#14120e',
  lime: '#9dbb7a',
  moss: '#3a4a35',
  clay: '#b26b57',
  danger: '#b26b57',
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
