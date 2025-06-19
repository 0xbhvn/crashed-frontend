export const getFearGreedColor = (index: number) => {
  if (index >= 75) return '#10b981'; // Extreme Greed - Green
  if (index >= 60) return '#84cc16'; // Greed - Light Green
  if (index >= 40) return '#facc15'; // Neutral - Yellow
  if (index >= 25) return '#f59e0b'; // Fear - Orange
  return '#ef4444'; // Extreme Fear - Red
};

export const getFearGreedBadgeColor = (index: number) => {
  if (index >= 75) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (index >= 60) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (index >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  if (index >= 25) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
};

export const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'Very High':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'High':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export const getMomentumBadgeColor = (trend: string) => {
  switch (trend) {
    case 'bullish':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'bearish':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  }
};

export const getMomentumBadgeVariant = (trend: string): 'default' | 'destructive' | 'secondary' => {
  switch (trend) {
    case 'bullish':
      return 'default';
    case 'bearish':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const getOpportunityScoreBadgeColor = (score: number) => {
  if (score >= 80) return 'bg-green-200 text-green-900 dark:bg-green-800/40 dark:text-green-300'; // Darker green
  if (score >= 60) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Regular green
  if (score >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'; // Yellow
  if (score >= 20) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'; // Orange
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Red
};

export const getOpportunityScoreColor = (score: number) => {
  if (score > 70) return 'text-green-600 dark:text-green-400';
  if (score > 40) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

export const getBustFrequencyBadgeColor = (index: number) => {
  if (index > 120) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  if (index > 110) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
  if (index > 90) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
};

export const getVolatilityRegimeBadgeColor = (regime: string) => {
  switch (regime.toLowerCase()) {
    case 'extreme':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    case 'normal':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export const getRSIBadgeColor = (rsi: number) => {
  if (rsi >= 70) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Overbought
  if (rsi >= 60) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
  if (rsi >= 40) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'; // Neutral
  if (rsi >= 30) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Oversold
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals) + '%';
};

export const formatMultiplier = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals) + 'x';
};