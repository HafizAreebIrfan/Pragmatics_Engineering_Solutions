export const colors = {
  // Background colors
  background: {
    primary: '#0D0D0D',
    secondary: '#1A1A1A',
    tertiary: '#262626',
  },

  // Brand colors
  brand: {
    primary: '#00D26A',
    secondary: '#00FF7F',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0A0',
    muted: '#666666',
  },

  // Status colors
  status: {
    success: '#00D26A',
    warning: '#FFB800',
    error: '#FF4757',
    info: '#3498DB',
  },

  // Border colors
  border: {
    default: '#333333',
    focus: '#00D26A',
  },

  // SLD (Single Line Diagram) colors
  sld: {
    renewable: '#00D26A', // Green - Solar/Wind power flow
    grid: '#3B82F6', // Blue - Grid power flow
    site: '#EF4444', // Red - Site node border
    dotGrid: '#2A2A2A', // Dot grid background
    nodeBackground: '#1A1A1A',
    nodeBorder: '#333333',
    metricText: '#A0A0A0',
  },
} as const;

export type Colors = typeof colors;
