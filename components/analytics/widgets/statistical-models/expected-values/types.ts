export interface TargetAnalysis {
  empirical_probability: number;
  theoretical_probability: number;
  expected_value: number;
  edge: number;
  recommendation: string;
  kelly_criterion: number;
  breakeven_probability: number;
  ev_per_100_bets: number;
}

export interface SurvivalProbability {
  from: number;
  to: number;
  conditional_probability: number;
  interpretation: string;
}

export interface OptimalTarget {
  target: string;
  expected_value?: number;
  probability?: number;
  kelly_criterion?: number;
  risk_adjusted_score?: number;
}

export interface ExpectedValuesData {
  target_analysis: Record<string, TargetAnalysis>;
  survival_probabilities: Record<string, SurvivalProbability>;
  optimal_targets: {
    max_expected_value: OptimalTarget;
    max_kelly_criterion: OptimalTarget;
    best_risk_adjusted: OptimalTarget;
  };
}

export interface ExpectedValuesParams {
  targets: number[];
  limit: number;
  enabled: boolean;
}

export interface ChartDataPoint {
  target: number;
  expectedValue: number;
  empiricalProb: number;
  theoreticalProb: number;
  kellyFraction: number;
  edge: number;
  breakevenProb: number;
  evPer100: number;
}

export interface SurvivalDataPoint {
  range: string;
  probability: number;
  from: number;
  to: number;
}