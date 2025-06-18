import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { RiskAdjustedMetricsData } from './types';

interface ExportConfig {
	targets: number[];
	limit: number;
	data: RiskAdjustedMetricsData | null;
}

export function getExcelConfig({
	targets,
	limit,
	data,
}: ExportConfig): ExcelExportConfig {
	if (!data) {
		return {
			fileName: `risk-adjusted-metrics_${targets.join('-')}_${limit}games`,
			sheets: [],
		};
	}

	// Add summary sheet with optimal strategy info
	const summaryData = [];
	if (data.optimal_strategy) {
		summaryData.push(
			{ metric: 'Total Games Analyzed', value: data.total_games },
			{ metric: 'Analysis Period Start', value: new Date(data.analysis_period.start).toLocaleDateString() },
			{ metric: 'Analysis Period End', value: new Date(data.analysis_period.end).toLocaleDateString() },
			{ metric: 'Best Risk-Adjusted Target', value: data.optimal_strategy.best_sharpe_ratio },
			{ metric: 'Best Win Rate Target', value: data.optimal_strategy.best_win_rate },
			{ metric: 'Recommendation', value: data.optimal_strategy.recommendation },
		);
	}

	return {
		fileName: `risk-adjusted-metrics_${targets.join('-')}_${limit}games_${new Date().toISOString().split('T')[0]}`,
		sheets: [
			// Summary sheet
			{
				name: 'Summary',
				columns: [
					{ header: 'Metric', key: 'metric', width: 35 },
					{ header: 'Value', key: 'value', width: 50 },
				],
				data: summaryData,
			},
			// Overview sheet
			{
				name: 'Overview',
				columns: [
					{ header: 'Target', key: 'target', width: 15 },
					{ header: 'Win Rate', key: 'winRate', width: 15 },
					{ header: 'Sharpe Ratio', key: 'sharpeRatio', width: 15 },
					{ header: 'Sortino Ratio', key: 'sortinoRatio', width: 15 },
					{ header: 'Max Drawdown', key: 'maxDrawdown', width: 15 },
					{ header: 'Profit Factor', key: 'profitFactor', width: 15 },
				],
				data: Object.entries(data.strategies).map(([key, strategy]) => ({
					target: key,
					winRate: `${strategy.performance.win_rate.toFixed(2)}%`,
					sharpeRatio: strategy.risk_metrics.sharpe_ratio.toFixed(2),
					sortinoRatio: strategy.risk_metrics.sortino_ratio.toFixed(2),
					maxDrawdown: `${strategy.drawdown_analysis.max_drawdown_percent.toFixed(2)}%`,
					profitFactor: strategy.risk_metrics.profit_factor === Infinity ? '∞' : strategy.risk_metrics.profit_factor.toFixed(2),
				})),
				autoFilter: true,
				freezeHeader: true,
			},
			// Risk Metrics sheet
			{
				name: 'Risk Metrics',
				columns: [
					{ header: 'Target', key: 'target', width: 15 },
					{ header: 'Sortino Ratio', key: 'sortinoRatio', width: 15 },
					{ header: 'Std Dev', key: 'stdDev', width: 15 },
					{ header: 'VaR (95%)', key: 'var95', width: 15 },
					{ header: 'CVaR (95%)', key: 'cvar95', width: 15 },
					{ header: 'Profit Factor', key: 'profitFactor', width: 15 },
				],
				data: Object.entries(data.strategies).map(([key, strategy]) => ({
					target: key,
					sortinoRatio: strategy.risk_metrics.sortino_ratio.toFixed(2),
					stdDev: strategy.risk_metrics.standard_deviation.toFixed(2),
					var95: strategy.risk_metrics.value_at_risk_95.toFixed(2),
					cvar95: strategy.risk_metrics.conditional_var_95.toFixed(2),
					profitFactor:
						strategy.risk_metrics.profit_factor === Infinity
							? '∞'
							: strategy.risk_metrics.profit_factor.toFixed(2),
				})),
				autoFilter: true,
				freezeHeader: true,
			},
			// Drawdown sheet
			{
				name: 'Drawdown',
				columns: [
					{ header: 'Target', key: 'target', width: 15 },
					{ header: 'Max Drawdown', key: 'maxDrawdown', width: 15 },
					{ header: 'Drawdown Periods', key: 'drawdownPeriods', width: 20 },
					{ header: 'Avg Duration', key: 'avgDuration', width: 15 },
					{ header: 'Longest Duration', key: 'longestDuration', width: 20 },
					{
						header: 'Max Consecutive Losses',
						key: 'maxConsecutiveLosses',
						width: 25,
					},
				],
				data: Object.entries(data.strategies).map(([key, strategy]) => ({
					target: key,
					maxDrawdown: `${strategy.drawdown_analysis.max_drawdown_percent.toFixed(2)}%`,
					drawdownPeriods: strategy.drawdown_analysis.drawdown_periods,
					avgDuration: `${strategy.drawdown_analysis.avg_drawdown_duration.toFixed(2)} games`,
					longestDuration: `${strategy.drawdown_analysis.longest_drawdown} games`,
					maxConsecutiveLosses: strategy.risk_metrics.max_consecutive_losses,
				})),
				autoFilter: true,
				freezeHeader: true,
			},
			// Performance Details sheet
			{
				name: 'Performance Details',
				columns: [
					{ header: 'Target', key: 'target', width: 15 },
					{ header: 'Total Bets', key: 'totalBets', width: 15 },
					{ header: 'Wins', key: 'wins', width: 15 },
					{ header: 'Win Rate', key: 'winRate', width: 15 },
					{ header: 'Average Return', key: 'avgReturn', width: 15 },
					{ header: 'Total Return', key: 'totalReturn', width: 15 },
				],
				data: Object.entries(data.strategies).map(([key, strategy]) => ({
					target: key,
					totalBets: strategy.performance.total_bets,
					wins: strategy.performance.wins,
					winRate: `${strategy.performance.win_rate.toFixed(2)}%`,
					avgReturn: strategy.performance.average_return.toFixed(4),
					totalReturn: strategy.performance.total_return.toFixed(2),
				})),
				autoFilter: true,
				freezeHeader: true,
			},
			// Strategy Comparison sheet
			{
				name: 'Strategy Comparison',
				columns: [
					{ header: 'Metric', key: 'metric', width: 25 },
					...Object.keys(data.strategies).map(key => ({
						header: key,
						key: key.replace('Target ', 'target_'),
						width: 15,
					})),
				],
				data: [
					{
						metric: 'Win Rate (%)',
						...Object.entries(data.strategies).reduce((acc, [key, strategy]) => ({
							...acc,
							[key.replace('Target ', 'target_')]: strategy.performance.win_rate.toFixed(2),
						}), {}),
					},
					{
						metric: 'Sharpe Ratio',
						...Object.entries(data.strategies).reduce((acc, [key, strategy]) => ({
							...acc,
							[key.replace('Target ', 'target_')]: strategy.risk_metrics.sharpe_ratio.toFixed(2),
						}), {}),
					},
					{
						metric: 'Sortino Ratio',
						...Object.entries(data.strategies).reduce((acc, [key, strategy]) => ({
							...acc,
							[key.replace('Target ', 'target_')]: strategy.risk_metrics.sortino_ratio.toFixed(2),
						}), {}),
					},
					{
						metric: 'Max Drawdown (%)',
						...Object.entries(data.strategies).reduce((acc, [key, strategy]) => ({
							...acc,
							[key.replace('Target ', 'target_')]: strategy.drawdown_analysis.max_drawdown_percent.toFixed(2),
						}), {}),
					},
					{
						metric: 'VaR 95%',
						...Object.entries(data.strategies).reduce((acc, [key, strategy]) => ({
							...acc,
							[key.replace('Target ', 'target_')]: strategy.risk_metrics.value_at_risk_95.toFixed(2),
						}), {}),
					},
				],
				autoFilter: false,
				freezeHeader: true,
			},
			// Analysis Info sheet
			{
				name: 'Analysis Info',
				columns: [
					{ header: 'Parameter', key: 'parameter', width: 30 },
					{ header: 'Value', key: 'value', width: 40 },
				],
				data: [
					{ parameter: 'Total Games Analyzed', value: data.total_games },
					{ parameter: 'Analysis Period', value: `${new Date(data.analysis_period.start).toLocaleDateString()} to ${new Date(data.analysis_period.end).toLocaleDateString()}` },
					{ parameter: 'Target Multipliers', value: targets.join(', ') },
					{ parameter: 'Games Limit', value: limit },
					{ parameter: 'Number of Strategies', value: Object.keys(data.strategies).length },
					{ parameter: 'Export Date', value: new Date().toLocaleString() },
				],
			},
		],
	};
}