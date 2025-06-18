import type { 
  ExpectedValuesData, 
  ChartDataPoint, 
  SurvivalDataPoint 
} from './types';

export const formatNumber = (value: number, decimals: number = 2): string => {
  // Handle infinite or extremely large numbers
  if (!isFinite(value)) return '∞';
  if (Math.abs(value) > 1e10) return value > 0 ? '>10B' : '<-10B';
  return value.toFixed(decimals);
};

export const getEVColor = (ev: number): string => {
  if (ev > 0.1) return 'text-green-600 font-bold';
  if (ev > 0) return 'text-green-500';
  if (ev > -0.05) return 'text-yellow-500';
  return 'text-red-500';
};

export const getRecommendationColor = (recommendation: string): string => {
  if (recommendation.includes('Strongly favorable')) return 'text-green-600';
  if (recommendation.includes('Favorable')) return 'text-green-500';
  if (recommendation.includes('Neutral')) return 'text-yellow-500';
  return 'text-red-500';
};

export const formatChartData = (data: ExpectedValuesData | null): ChartDataPoint[] => {
  if (!data?.target_analysis) return [];
  return Object.entries(data.target_analysis).map(([key, analysis]) => ({
    target: parseFloat(key.replace('x', '')),
    expectedValue: analysis.expected_value,
    empiricalProb: analysis.empirical_probability,
    theoreticalProb: analysis.theoretical_probability,
    kellyFraction: analysis.kelly_criterion,
    edge: analysis.edge,
    breakevenProb: analysis.breakeven_probability,
    evPer100: analysis.ev_per_100_bets,
  }));
};

export const formatSurvivalData = (data: ExpectedValuesData | null): SurvivalDataPoint[] => {
  if (!data?.survival_probabilities) return [];
  return Object.entries(data.survival_probabilities).map(([, prob]) => ({
    range: `${prob.from}x→${prob.to}x`,
    probability: prob.conditional_probability,
    from: prob.from,
    to: prob.to,
  }));
};

export const parseTargets = (input: string): number[] => {
  try {
    return input.split(',').map((t) => {
      const num = parseFloat(t.trim());
      if (isNaN(num) || num <= 0) throw new Error();
      return num;
    });
  } catch {
    return [];
  }
};

export const validateLimit = (input: string): number | null => {
  const num = parseInt(input);
  if (!isNaN(num) && num > 0 && num <= 10000) {
    return num;
  }
  return null;
};