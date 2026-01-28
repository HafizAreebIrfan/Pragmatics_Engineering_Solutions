/**
 * TypeScript types for chart components
 */

import { ViewStyle } from 'react-native';

// Base chart props that all charts share
export interface BaseChartProps {
  /** Height of the chart in pixels */
  height?: number;
  /** Whether the chart is loading */
  loading?: boolean;
  /** Additional styles for the chart container */
  style?: ViewStyle;
  /** Callback when the chart is ready */
  onChartReady?: () => void;
}

// Data point for time series charts
export interface TimeSeriesDataPoint {
  time: string;
  value: number;
}

// Data point for category charts
export interface CategoryDataPoint {
  category: string;
  value: number;
}

// Series configuration for multi-series charts
export interface SeriesConfig {
  name: string;
  data: number[];
  color?: string;
  type?: 'line' | 'bar' | 'area';
}

// Line chart specific props
export interface LineChartProps extends BaseChartProps {
  /** X-axis labels (categories or time) */
  xAxisData: string[];
  /** Series data configuration */
  series: SeriesConfig[];
  /** Show area fill under lines */
  showArea?: boolean;
  /** Enable smooth curves */
  smooth?: boolean;
  /** Y-axis label/unit */
  yAxisUnit?: string;
  /** Show legend */
  showLegend?: boolean;
}

// Bar chart specific props
export interface BarChartProps extends BaseChartProps {
  /** X-axis labels (categories) */
  xAxisData: string[];
  /** Series data configuration */
  series: SeriesConfig[];
  /** Y-axis label/unit */
  yAxisUnit?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Stack bars on top of each other */
  stacked?: boolean;
  /** Make bars horizontal */
  horizontal?: boolean;
}

// Area chart specific props
export interface AreaChartProps extends BaseChartProps {
  /** X-axis labels (categories or time) */
  xAxisData: string[];
  /** Series data configuration */
  series: SeriesConfig[];
  /** Enable smooth curves */
  smooth?: boolean;
  /** Y-axis label/unit */
  yAxisUnit?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Stack areas on top of each other */
  stacked?: boolean;
}

// Gauge chart specific props
export interface GaugeChartProps extends BaseChartProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Unit label */
  unit?: string;
  /** Title text */
  title?: string;
  /** Color for the gauge progress */
  color?: string;
}

// Pie/Donut chart specific props
export interface PieChartProps extends BaseChartProps {
  /** Data for the pie chart */
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  /** Show as donut (with hole in center) */
  donut?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Center text (for donut charts) */
  centerText?: string;
}

// Mixed chart (combining line and bar)
export interface MixedChartProps extends BaseChartProps {
  /** X-axis labels (categories or time) */
  xAxisData: string[];
  /** Line series data */
  lineSeries?: SeriesConfig[];
  /** Bar series data */
  barSeries?: SeriesConfig[];
  /** Show legend */
  showLegend?: boolean;
  /** Left Y-axis unit (for bars) */
  leftYAxisUnit?: string;
  /** Right Y-axis unit (for lines) */
  rightYAxisUnit?: string;
}

// Power flow data for the SLD chart
export interface PowerFlowData {
  solarPower: number;
  windPower: number;
  gridPower: number;
  loadPower: number;
  batteryPower: number;
  batteryLevel: number;
}

// Alarm trends data
export interface AlarmTrendData {
  time: string;
  critical: number;
  warning: number;
  info: number;
}

// Power generation data
export interface PowerGenerationData {
  time: string;
  solar: number;
  wind: number;
  grid: number;
  total: number;
}

// Efficiency data
export interface EfficiencyData {
  time: string;
  efficiency: number;
  target: number;
}
