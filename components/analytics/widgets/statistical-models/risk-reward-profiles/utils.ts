import type { RiskRewardChartData, StrategyProfile, RiskRewardData } from './types';

// Standard badge color classes
export const colorClasses = {
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
};

// Text color classes for non-badge elements
export const textColors = {
  green: 'text-green-600 dark:text-green-400',
  yellow: 'text-yellow-600 dark:text-yellow-400',
  red: 'text-red-600 dark:text-red-400'
};

export function formatNumber(value: number, decimals: number = 2): string {
  // Handle infinite or extremely large numbers
  if (!isFinite(value)) return '∞';
  if (Math.abs(value) > 1e10) return value > 0 ? '>10B' : '<-10B';
  return value.toFixed(decimals);
}

export function getRiskLevelColor(risk: number, drawdown: number): 'green' | 'yellow' | 'red' {
  if (risk < 50 && drawdown < 15) return 'green';
  if (risk < 100 && drawdown < 30) return 'yellow';
  return 'red';
}

export function getSharpeRatioColor(sharpeRatio: number): 'green' | 'yellow' | 'red' {
  if (sharpeRatio > 1) return 'green';
  if (sharpeRatio > 0.5) return 'yellow';
  return 'red';
}

export function getWinRateColor(winRate: number): 'green' | 'yellow' | 'red' {
  if (winRate > 50) return 'green';
  if (winRate > 30) return 'yellow';
  return 'red';
}

export function getDrawdownColor(drawdown: number): 'green' | 'yellow' | 'red' {
  if (drawdown < 10) return 'green';
  if (drawdown < 20) return 'yellow';
  return 'red';
}

export function transformToRiskRewardData(data: RiskRewardData): RiskRewardChartData[] {
  if (!data?.strategies) return [];

  return Object.entries(data.strategies).map(([key, strategy]) => ({
    strategy: key,
    targetMultiplier: strategy.target_multiplier,
    risk: strategy.risk_metrics.standard_deviation * 100, // Convert to percentage
    expectedValue: strategy.performance.average_return * 100, // Expected value per bet as percentage
    sharpeRatio: strategy.risk_metrics.sharpe_ratio,
    winRate: strategy.performance.win_rate,
    maxDrawdown: strategy.drawdown_analysis.max_drawdown_percent,
    profitFactor:
      strategy.risk_metrics.profit_factor === Infinity
        ? 10
        : strategy.risk_metrics.profit_factor,
    avgReturn: strategy.performance.average_return,
  }));
}

export function getStrategyProfiles(strategyKey: string, data: RiskRewardData): StrategyProfile[] {
  if (!data?.strategies || !data.strategies[strategyKey]) return [];

  const strategy = data.strategies[strategyKey];
  const allStrategies = Object.values(data.strategies);

  // Calculate benchmarks (averages across all strategies)
  const avgSharpe =
    allStrategies.reduce(
      (sum, s) => sum + s.risk_metrics.sharpe_ratio,
      0
    ) / allStrategies.length;
  const avgWinRate =
    allStrategies.reduce((sum, s) => sum + s.performance.win_rate, 0) /
    allStrategies.length;
  const avgExpectedValue =
    allStrategies.reduce((sum, s) => sum + s.performance.average_return * 100, 0) /
    allStrategies.length;
  const avgDrawdown =
    allStrategies.reduce(
      (sum, s) => sum + s.drawdown_analysis.max_drawdown_percent,
      0
    ) / allStrategies.length;
  const avgProfitFactor =
    allStrategies.reduce(
      (sum, s) =>
        sum +
        (s.risk_metrics.profit_factor === Infinity
          ? 10
          : s.risk_metrics.profit_factor),
      0
    ) / allStrategies.length;

  return [
    {
      metric: 'Sharpe Ratio',
      value: Math.max(
        0,
        Math.min(100, strategy.risk_metrics.sharpe_ratio * 25)
      ), // Normalize to 0-100
      benchmark: Math.max(0, Math.min(100, avgSharpe * 25)),
    },
    {
      metric: 'Win Rate',
      value: strategy.performance.win_rate,
      benchmark: avgWinRate,
    },
    {
      metric: 'Expected Value',
      value: Math.max(
        0,
        Math.min(100, strategy.performance.average_return * 100 + 50)
      ), // Normalize negative EV
      benchmark: Math.max(0, Math.min(100, avgExpectedValue + 50)),
    },
    {
      metric: 'Risk Control',
      value: Math.max(
        0,
        100 - strategy.drawdown_analysis.max_drawdown_percent
      ), // Inverse of drawdown
      benchmark: Math.max(0, 100 - avgDrawdown),
    },
    {
      metric: 'Profit Factor',
      value: Math.min(
        100,
        strategy.risk_metrics.profit_factor === Infinity
          ? 100
          : strategy.risk_metrics.profit_factor * 20
      ),
      benchmark: Math.min(100, avgProfitFactor * 20),
    },
  ];
}

export function categorizeByRisk(data: RiskRewardChartData[]) {
  const categories = {
    'Low Risk': data.filter((s) => s.risk < 50 && s.maxDrawdown < 15),
    'Medium Risk': data.filter((s) => s.risk >= 50 && s.risk < 100 && s.maxDrawdown < 30),
    'High Risk': data.filter((s) => s.risk >= 100 || s.maxDrawdown >= 30),
  };
  
  return categories;
}