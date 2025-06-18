import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import type { RiskAdjustedMetricsData } from './types';

interface ExportConfig {
	data: RiskAdjustedMetricsData | null;
}

export function getHtmlConfig({
	data,
}: ExportConfig): HtmlChartConfig {
	if (!data) {
		return {
			title: 'Risk-Adjusted Performance Metrics',
			customHtml: '<p>No data available</p>',
		};
	}

	// Build charts array
	const charts: import('@/utils/export-utils/chart-html').ChartDefinition[] = [];
	
	// Add Sharpe Ratio comparison chart
	const sharpeRatioData = Object.entries(data.strategies).map(([key, strategy]) => ({
		target: key,
		sharpeRatio: strategy.risk_metrics.sharpe_ratio,
	}));
	
	charts.push({
		id: 'sharpe-ratio-chart',
		title: 'Sharpe Ratio Comparison',
		type: 'bar',
		labels: sharpeRatioData.map(d => d.target),
		datasets: [{
			label: 'Sharpe Ratio',
			data: sharpeRatioData.map(d => d.sharpeRatio),
			backgroundColor: 'rgba(75, 192, 192, 0.8)',
			borderColor: 'rgba(75, 192, 192, 1)',
			borderWidth: 1,
		}],
		yAxisTitle: 'Sharpe Ratio',
		xAxisTitle: 'Target Strategy',
	});
	
	// Add Win Rate comparison chart
	const winRateData = Object.entries(data.strategies).map(([key, strategy]) => ({
		target: key,
		winRate: strategy.performance.win_rate,
	}));
	
	charts.push({
		id: 'win-rate-chart',
		title: 'Win Rate Comparison',
		type: 'bar',
		labels: winRateData.map(d => d.target),
		datasets: [{
			label: 'Win Rate (%)',
			data: winRateData.map(d => d.winRate),
			backgroundColor: 'rgba(54, 162, 235, 0.8)',
			borderColor: 'rgba(54, 162, 235, 1)',
			borderWidth: 1,
		}],
		yAxisTitle: 'Win Rate (%)',
		xAxisTitle: 'Target Strategy',
	});
	
	// Add Max Drawdown comparison chart
	const drawdownData = Object.entries(data.strategies).map(([key, strategy]) => ({
		target: key,
		drawdown: strategy.drawdown_analysis.max_drawdown_percent,
	}));
	
	charts.push({
		id: 'drawdown-chart',
		title: 'Maximum Drawdown Comparison',
		type: 'bar',
		labels: drawdownData.map(d => d.target),
		datasets: [{
			label: 'Max Drawdown (%)',
			data: drawdownData.map(d => d.drawdown),
			backgroundColor: 'rgba(255, 99, 132, 0.8)',
			borderColor: 'rgba(255, 99, 132, 1)',
			borderWidth: 1,
		}],
		yAxisTitle: 'Max Drawdown (%)',
		xAxisTitle: 'Target Strategy',
	});

	return {
		title: 'Risk-Adjusted Performance Metrics',
		subtitle: `Analysis of ${data.total_games} games from ${new Date(data.analysis_period.start).toLocaleDateString()} to ${new Date(data.analysis_period.end).toLocaleDateString()}`,
		charts,
		customHtml: `
			<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px;">
				<!-- Export timestamp -->
				<div style="text-align: right; color: #666; font-size: 0.875em; margin-bottom: 20px;">
					<p>Generated: ${new Date().toLocaleString()}</p>
				</div>
				
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
								<td style="padding: 10px; border-bottom: 1px solid #eee; color: ${strategy.performance.win_rate > 50 ? '#16a34a' : strategy.performance.win_rate > 40 ? '#ca8a04' : '#dc2626'};">${strategy.performance.win_rate.toFixed(2)}%</td>
								<td style="padding: 10px; border-bottom: 1px solid #eee; color: ${strategy.risk_metrics.sharpe_ratio > 1 ? '#16a34a' : strategy.risk_metrics.sharpe_ratio > 0.5 ? '#ca8a04' : '#dc2626'};">${strategy.risk_metrics.sharpe_ratio.toFixed(2)}</td>
								<td style="padding: 10px; border-bottom: 1px solid #eee; color: ${strategy.drawdown_analysis.max_drawdown_percent < 10 ? '#16a34a' : strategy.drawdown_analysis.max_drawdown_percent < 20 ? '#ca8a04' : '#dc2626'};">${strategy.drawdown_analysis.max_drawdown_percent.toFixed(2)}%</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
				
				${data.optimal_strategy ? `
					<div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
						<h3 style="margin-bottom: 10px;">Optimal Strategy</h3>
						<p style="margin-bottom: 10px;"><strong>Best Risk-Adjusted Target:</strong> ${data.optimal_strategy.best_sharpe_ratio}</p>
						<p style="margin-bottom: 10px;"><strong>Best Win Rate Target:</strong> ${data.optimal_strategy.best_win_rate}</p>
						<p style="margin-top: 15px; font-style: italic;">${data.optimal_strategy.recommendation}</p>
					</div>
				` : ''}
				
				<!-- Risk Metrics Table -->
				<h3 style="margin-top: 30px; margin-bottom: 15px;">Risk Metrics Details</h3>
				<div style="overflow-x: auto;">
					<table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
						<thead>
							<tr style="background: #f5f5f5;">
								<th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Target</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Sortino Ratio</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Std Dev</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">VaR (95%)</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">CVaR (95%)</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Profit Factor</th>
							</tr>
						</thead>
						<tbody>
							${Object.entries(data.strategies).map(([key, strategy]) => `
								<tr>
									<td style="padding: 10px; border-bottom: 1px solid #eee;">${key}</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${strategy.risk_metrics.sortino_ratio.toFixed(2)}</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${strategy.risk_metrics.standard_deviation.toFixed(2)}</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee; color: #dc2626;">${strategy.risk_metrics.value_at_risk_95.toFixed(2)}</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee; color: #dc2626;">${strategy.risk_metrics.conditional_var_95.toFixed(2)}</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${strategy.risk_metrics.profit_factor === Infinity ? '∞' : strategy.risk_metrics.profit_factor.toFixed(2)}</td>
								</tr>
							`).join('')}
						</tbody>
					</table>
				</div>
				
				<!-- Drawdown Analysis -->
				<h3 style="margin-top: 30px; margin-bottom: 15px;">Drawdown Analysis</h3>
				<div style="overflow-x: auto;">
					<table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
						<thead>
							<tr style="background: #f5f5f5;">
								<th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Target</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Drawdown Periods</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Avg Duration</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Longest Duration</th>
								<th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Max Consecutive Losses</th>
							</tr>
						</thead>
						<tbody>
							${Object.entries(data.strategies).map(([key, strategy]) => `
								<tr>
									<td style="padding: 10px; border-bottom: 1px solid #eee;">${key}</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${strategy.drawdown_analysis.drawdown_periods}</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${strategy.drawdown_analysis.avg_drawdown_duration.toFixed(2)} games</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${strategy.drawdown_analysis.longest_drawdown} games</td>
									<td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${strategy.risk_metrics.max_consecutive_losses}</td>
								</tr>
							`).join('')}
						</tbody>
					</table>
				</div>
			</div>
		`
	};
}