export * from './colors';
export * from './typography';
export * from './spacing';

import { colors } from './colors';
import { fontFamily, fontSize, lineHeight, fontWeight } from './typography';
import { spacing, borderRadius } from './spacing';

export const theme = {
  colors,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  spacing,
  borderRadius,
} as const;

export type Theme = typeof theme;
