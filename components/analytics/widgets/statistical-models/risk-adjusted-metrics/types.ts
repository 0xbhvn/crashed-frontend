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
}

export interface Strategy {
	target_multiplier: number;
	performance: StrategyPerformance;
	risk_metrics: RiskMetrics;
	drawdown_analysis: DrawdownAnalysis;
}

export interface OptimalStrategy {
	best_sharpe_ratio: string;
	best_win_rate: string;
	recommendation: string;
}

export interface RiskAdjustedMetricsData {
	total_games: number;
	analysis_period: {
		start: string;
		end: string;
	};
	strategies: Record<string, Strategy>;
	optimal_strategy: OptimalStrategy;
}