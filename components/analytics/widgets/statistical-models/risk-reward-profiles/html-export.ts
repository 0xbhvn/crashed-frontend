import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import type { RiskRewardData } from './types';
import {
	transformToRiskRewardData,
	getSharpeRatioColor,
	getWinRateColor,
} from './utils';

interface ExportProps {
	data: RiskRewardData | null;
}

export function getHtmlConfig({ data }: ExportProps): HtmlChartConfig {
	if (!data) {
		return {
			title: 'Risk/Expected Value Profiles',
			customHtml: '<p>No data available for visualization</p>',
		};
	}

	const chartData = transformToRiskRewardData(data);

	// Build custom HTML content
	let customHtml = '';

	// Summary section
	customHtml += `
    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="margin-bottom: 15px;">Analysis Summary</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <div>
          <p style="color: #666; margin-bottom: 5px;">Best Sharpe Ratio</p>
          <p style="font-size: 1.2em; font-weight: bold;">${data.optimal_strategy.best_sharpe_ratio}</p>
        </div>
        <div>
          <p style="color: #666; margin-bottom: 5px;">Best Win Rate</p>
          <p style="font-size: 1.2em; font-weight: bold;">${data.optimal_strategy.best_win_rate}</p>
        </div>
        <div>
          <p style="color: #666; margin-bottom: 5px;">Best Expected Value</p>
          <p style="font-size: 1.2em; font-weight: bold;">${data.optimal_strategy.best_roi}</p>
        </div>
      </div>
      <div style="margin-top: 20px; padding: 15px; background: #fff; border-radius: 4px;">
        <p style="font-weight: bold; margin-bottom: 5px;">Recommendation</p>
        <p style="color: #333;">${data.optimal_strategy.recommendation}</p>
      </div>
    </div>
  `;

	// Risk/Reward Scatter Plot Data
	customHtml += `
    <h2 style="margin-top: 30px; margin-bottom: 15px;">Target vs Expected Value Analysis</h2>
    <p style="margin-bottom: 20px;">Each strategy is plotted by target crash point vs expected value per bet. This shows how different target points affect profitability.</p>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Strategy</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Target (x)</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Expected Value (%)</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Sharpe Ratio</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Risk (Std Dev %)</th>
          </tr>
        </thead>
        <tbody>
          ${chartData
				.map(
					(d) => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px;">${d.strategy}</td>
              <td style="padding: 10px; text-align: right;">${
					d.targetMultiplier
				}x</td>
              <td style="padding: 10px; text-align: right; color: ${
					d.expectedValue > 0 ? '#16a34a' : '#dc2626'
				};">
                ${d.expectedValue > 0 ? '+' : ''}${d.expectedValue.toFixed(2)}
              </td>
              <td style="padding: 10px; text-align: right;">
                <span style="color: ${
					getSharpeRatioColor(d.sharpeRatio) === 'green'
						? '#16a34a'
						: getSharpeRatioColor(d.sharpeRatio) === 'yellow'
						? '#ca8a04'
						: '#dc2626'
				};">
                  ${d.sharpeRatio.toFixed(2)}
                </span>
              </td>
              <td style="padding: 10px; text-align: right;">${d.risk.toFixed(
					2
				)}%</td>
            </tr>
          `
				)
				.join('')}
        </tbody>
      </table>
    </div>
  `;

	// Performance Metrics Comparison
	customHtml += `
    <h2 style="margin-top: 30px; margin-bottom: 15px;">Performance Metrics Comparison</h2>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Strategy</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Win Rate (%)</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Profit Factor</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Max Drawdown (%)</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Sharpe Ratio</th>
          </tr>
        </thead>
        <tbody>
          ${chartData
				.map(
					(d) => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px;">${d.strategy}</td>
              <td style="padding: 10px; text-align: right;">
                <span style="color: ${
					getWinRateColor(d.winRate) === 'green'
						? '#16a34a'
						: getWinRateColor(d.winRate) === 'yellow'
						? '#ca8a04'
						: '#dc2626'
				};">
                  ${d.winRate.toFixed(2)}
                </span>
              </td>
              <td style="padding: 10px; text-align: right;">
                ${d.profitFactor === 10 ? '∞' : d.profitFactor.toFixed(2)}
              </td>
              <td style="padding: 10px; text-align: right; color: ${
					d.maxDrawdown < 10
						? '#16a34a'
						: d.maxDrawdown < 20
						? '#ca8a04'
						: '#dc2626'
				};">
                ${d.maxDrawdown.toFixed(2)}
              </td>
              <td style="padding: 10px; text-align: right;">
                ${d.sharpeRatio.toFixed(2)}
              </td>
            </tr>
          `
				)
				.join('')}
        </tbody>
      </table>
    </div>
  `;

	// Risk Categories
	const lowRisk = chartData.filter((s) => s.risk < 50 && s.maxDrawdown < 15);
	const mediumRisk = chartData.filter(
		(s) => s.risk >= 50 && s.risk < 100 && s.maxDrawdown < 30
	);
	const highRisk = chartData.filter(
		(s) => s.risk >= 100 || s.maxDrawdown >= 30
	);

	customHtml += `
    <h2 style="margin-top: 30px; margin-bottom: 15px;">Risk Categories</h2>
    <div style="display: grid; gap: 20px;">
      <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h4 style="color: #16a34a; margin-bottom: 15px;">Low Risk Strategies</h4>
        ${
			lowRisk.length > 0
				? `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
            ${lowRisk
				.map(
					(s) => `
              <div>
                <p style="font-weight: bold;">${s.strategy}</p>
                <p style="color: #666; font-size: 0.875em;">EV: ${
					s.expectedValue > 0 ? '+' : ''
				}${s.expectedValue.toFixed(2)}%</p>
              </div>
            `
				)
				.join('')}
          </div>
        `
				: '<p style="color: #666;">No strategies in this category</p>'
		}
      </div>
      
      <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h4 style="color: #ca8a04; margin-bottom: 15px;">Medium Risk Strategies</h4>
        ${
			mediumRisk.length > 0
				? `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
            ${mediumRisk
				.map(
					(s) => `
              <div>
                <p style="font-weight: bold;">${s.strategy}</p>
                <p style="color: #666; font-size: 0.875em;">EV: ${
					s.expectedValue > 0 ? '+' : ''
				}${s.expectedValue.toFixed(2)}%</p>
              </div>
            `
				)
				.join('')}
          </div>
        `
				: '<p style="color: #666;">No strategies in this category</p>'
		}
      </div>
      
      <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h4 style="color: #dc2626; margin-bottom: 15px;">High Risk Strategies</h4>
        ${
			highRisk.length > 0
				? `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
            ${highRisk
				.map(
					(s) => `
              <div>
                <p style="font-weight: bold;">${s.strategy}</p>
                <p style="color: #666; font-size: 0.875em;">EV: ${
					s.expectedValue > 0 ? '+' : ''
				}${s.expectedValue.toFixed(2)}%</p>
              </div>
            `
				)
				.join('')}
          </div>
        `
				: '<p style="color: #666;">No strategies in this category</p>'
		}
      </div>
    </div>
  `;

	return {
		title: 'Risk/Expected Value Profiles Analysis',
		customHtml,
	};
}
