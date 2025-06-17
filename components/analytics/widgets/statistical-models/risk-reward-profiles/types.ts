export interface RiskMetrics {
  sharpe_ratio: number;
  sortino_ratio: number;
  standard_deviation: number;
  downside_deviation: number;
  value_at_risk_95: number;
  conditional_var_95: number;
  profit_factor: number;
  max_consecutive_losses: number;
}

export interface DrawdownAnalysis {
  max_drawdown_percent: number;
  drawdown_periods: number;
  avg_drawdown_duration: number;
  longest_drawdown: number;
}

export interface StrategyPerformance {
  total_bets: number;
  wins: number;
  win_rate: number;
  average_return: number;
  total_return: number;
  final_balance: number;
  roi: number;
}

export interface Strategy {
  target_multiplier: number;
  performance: StrategyPerformance;
  risk_metrics: RiskMetrics;
  drawdown_analysis: DrawdownAnalysis;
}

export interface OptimalStrategy {
  best_sharpe_ratio: string;
  best_roi: string;
  best_win_rate: string;
  recommendation: string;
}

export interface RiskRewardData {
  total_games: number;
  analysis_period: {
    start: string;
    end: string;
  };
  strategies: Record<string, Strategy>;
  optimal_strategy: OptimalStrategy;
}

export interface RiskRewardChartData {
  strategy: string;
  targetMultiplier: number;
  risk: number;
  expectedValue: number;
  sharpeRatio: number;
  winRate: number;
  maxDrawdown: number;
  profitFactor: number;
  avgReturn: number;
}

export interface StrategyProfile {
  metric: string;
  value: number;
  benchmark: number;
}

export interface RiskRewardProfilesControlsProps {
  targets: number[];
  inputValue: string;
  limitInput: string;
  onInputValueChange: (value: string) => void;
  onLimitInputChange: (value: string) => void;
  handleAddTarget: (value: string) => void;
  handleRemoveTarget: (target: number) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  applyLimitChange: () => void;
  getExcelConfig: () => Promise<import('@/utils/export-utils/excel').ExcelExportConfig>;
  getChartConfig: () => Promise<import('@/utils/export-utils/chart-html').HtmlChartConfig>;
}