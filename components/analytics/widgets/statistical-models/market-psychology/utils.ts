export const getFearGreedColor = (index: number) => {
  if (index >= 75) return '#ef4444'; // Extreme Greed - Red
  if (index >= 60) return '#f59e0b'; // Greed - Orange
  if (index >= 40) return '#facc15'; // Neutral - Yellow
  if (index >= 25) return '#84cc16'; // Fear - Light Green
  return '#10b981'; // Extreme Fear - Green
};

export const getFearGreedBadgeColor = (index: number) => {
  if (index >= 75) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  if (index >= 60) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
  if (index >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  if (index >= 25) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
};

export const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'Very High':
      return 'text-red-600 dark:text-red-400';
    case 'High':
      return 'text-red-500 dark:text-red-400';
    case 'Medium':
      return 'text-yellow-500 dark:text-yellow-400';
    case 'Low':
      return 'text-green-500 dark:text-green-400';
    default:
      return '';
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

export const getOpportunityScoreColor = (score: number) => {
  if (score > 70) return 'text-green-500';
  if (score > 40) return 'text-yellow-500';
  return 'text-red-500';
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals) + '%';
};

export const formatMultiplier = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals) + 'x';
};