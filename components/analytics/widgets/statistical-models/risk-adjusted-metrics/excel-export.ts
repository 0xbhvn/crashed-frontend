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

	return {
		fileName: `risk-adjusted-metrics_${targets.join('-')}_${limit}games`,
		sheets: [
			// Overview sheet
			{
				name: 'Overview',
				columns: [
					{ header: 'Target', key: 'target', width: 15 },
					{ header: 'Win Rate', key: 'winRate', width: 15 },
					{ header: 'Sharpe Ratio', key: 'sharpeRatio', width: 15 },
					{ header: 'Max Drawdown', key: 'maxDrawdown', width: 15 },
				],
				data: Object.entries(data.strategies).map(([key, strategy]) => ({
					target: key,
					winRate: `${strategy.performance.win_rate.toFixed(2)}%`,
					sharpeRatio: strategy.risk_metrics.sharpe_ratio.toFixed(2),
					maxDrawdown: `${strategy.drawdown_analysis.max_drawdown_percent.toFixed(2)}%`,
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
			// Details sheet
			{
				name: 'Details',
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
					avgReturn: strategy.performance.average_return.toFixed(2),
					totalReturn: strategy.performance.total_return.toFixed(2),
				})),
				autoFilter: true,
				freezeHeader: true,
			},
		],
	};
}