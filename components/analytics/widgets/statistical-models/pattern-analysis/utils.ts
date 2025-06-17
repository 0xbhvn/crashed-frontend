import type { PatternAnalysisData, ClusterData, AutocorrelationData } from './types';

// Match the color scheme from other widgets
export const COLORS = [
  'hsl(142, 90%, 40%)', // Green
  'hsl(48, 95%, 50%)',  // Yellow  
  'hsl(0, 90%, 45%)',   // Red
  'hsl(210, 90%, 50%)', // Blue
  'hsl(270, 90%, 50%)', // Purple
];

export const getRandomnessColor = (score: number): string => {
  if (score > 80) return 'text-green-500';
  if (score > 60) return 'text-yellow-500';
  if (score > 40) return 'text-orange-500';
  return 'text-red-500';
};

export const getAnomalyColor = (zScore: number): string => {
  const absScore = Math.abs(zScore);
  if (absScore > 4) return 'text-red-500';
  if (absScore > 3) return 'text-orange-500';
  return 'text-yellow-500';
};

export const formatClusterData = (data: PatternAnalysisData | null): ClusterData[] => {
  if (!data?.clustering) return [];
  return Object.entries(data.clustering).map(([name, info]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: info.percentage,
    count: info.count,
    range: info.range,
  }));
};

export const formatAutocorrelationData = (data: PatternAnalysisData | null): AutocorrelationData[] => {
  if (!data?.autocorrelation?.correlations) return [];
  return Object.entries(data.autocorrelation.correlations).map(([lag, corr]) => ({
    lag: parseInt(lag),
    correlation: corr,
    significant: data.autocorrelation.significant_lags.includes(parseInt(lag)),
  }));
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};