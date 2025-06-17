import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import type { RiskAdjustedMetricsData } from './types';

interface ExportConfig {
	data: RiskAdjustedMetricsData | null;
	getRiskLevelColor: (value: number, metric: string) => string;
}

export function getHtmlConfig({
	data,
	getRiskLevelColor,
}: ExportConfig): HtmlChartConfig {
	if (!data) {
		return {
			title: 'Risk-Adjusted Performance Metrics',
			customHtml: '<p>No data available</p>',
		};
	}

	return {
		title: 'Risk-Adjusted Performance Metrics',
		subtitle: `Analysis of ${data.total_games} games`,
		customHtml: `
			<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px;">
				<h2 style="margin-bottom: 20px;">Risk-Adjusted Performance Analysis</h2>
				<p style="color: #666; margin-bottom: 20px;">Analysis of ${data.total_games} games from ${new Date(data.analysis_period.start).toLocaleDateString()} to ${new Date(data.analysis_period.end).toLocaleDateString()}</p>
				
				<table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
					<thead>
						<tr style="background: #f5f5f5;">
							<th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Target</th>
							<th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Win Rate</th>
							<th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Sharpe Ratio</th>
							<th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Max Drawdown</th>
						</tr>
					</thead>
					<tbody>
						${Object.entries(data.strategies).map(([key, strategy]) => `
							<tr>
								<td style="padding: 10px; border-bottom: 1px solid #eee;">${key}</td>
								<td style="padding: 10px; border-bottom: 1px solid #eee; color: ${getRiskLevelColor(strategy.performance.win_rate, 'win_rate')};">${strategy.performance.win_rate.toFixed(2)}%</td>
								<td style="padding: 10px; border-bottom: 1px solid #eee; color: ${getRiskLevelColor(strategy.risk_metrics.sharpe_ratio, 'sharpe')};">${strategy.risk_metrics.sharpe_ratio.toFixed(2)}</td>
								<td style="padding: 10px; border-bottom: 1px solid #eee; color: ${getRiskLevelColor(strategy.drawdown_analysis.max_drawdown_percent, 'drawdown')};">${strategy.drawdown_analysis.max_drawdown_percent.toFixed(2)}%</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
				
				${data.optimal_strategy ? `
					<div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
						<h3 style="margin-bottom: 10px;">Optimal Strategy</h3>
						<p style="margin-bottom: 10px;"><strong>Best Risk-Adjusted Target:</strong> ${data.optimal_strategy.best_sharpe_ratio}</p>
						<p style="margin-bottom: 10px;"><strong>Best Win Rate Target:</strong> ${data.optimal_strategy.best_win_rate}</p>
						<p style="margin-top: 15px; font-style: italic;">${data.optimal_strategy.recommendation}</p>
					</div>
				` : ''}
			</div>
		`
	};
}