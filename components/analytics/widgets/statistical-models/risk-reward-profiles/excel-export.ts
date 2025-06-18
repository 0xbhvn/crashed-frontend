import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { RiskRewardData } from './types';

interface ExportProps {
  targets: number[];
  limit: number;
  data: RiskRewardData | null;
}

export function getExcelConfig({ targets, limit, data }: ExportProps): ExcelExportConfig {
  if (!data) {
    return {
      fileName: `risk-reward-profiles-${new Date().toISOString().split('T')[0]}`,
      sheets: [
        {
          name: 'No Data',
          columns: [
            { header: 'Message', key: 'Message', width: 50 },
          ],
          data: [{ Message: 'No data available for export' }],
        },
      ],
    };
  }

  const sheets: ExcelExportConfig['sheets'] = [];

  // Overview Sheet
  const overviewData = Object.entries(data.strategies).map(([key, strategy]) => ({
    Strategy: key,
    'Target Multiplier': strategy.target_multiplier,
    'Total Bets': strategy.performance.total_bets,
    'Win Rate (%)': strategy.performance.win_rate.toFixed(2),
    'Expected Value (%)': (strategy.performance.average_return * 100).toFixed(2),
    'Sharpe Ratio': strategy.risk_metrics.sharpe_ratio.toFixed(2),
    'Sortino Ratio': strategy.risk_metrics.sortino_ratio.toFixed(2),
    'Max Drawdown (%)': strategy.drawdown_analysis.max_drawdown_percent.toFixed(2),
  }));

  sheets.push({
    name: 'Overview',
    columns: [
      { header: 'Strategy', key: 'Strategy', width: 15 },
      { header: 'Target Multiplier', key: 'Target Multiplier', width: 18 },
      { header: 'Total Bets', key: 'Total Bets', width: 12 },
      { header: 'Win Rate (%)', key: 'Win Rate (%)', width: 15 },
      { header: 'Expected Value (%)', key: 'Expected Value (%)', width: 18 },
      { header: 'Sharpe Ratio', key: 'Sharpe Ratio', width: 15 },
      { header: 'Sortino Ratio', key: 'Sortino Ratio', width: 15 },
      { header: 'Max Drawdown (%)', key: 'Max Drawdown (%)', width: 18 },
    ],
    data: overviewData,
    autoFilter: true,
    freezeHeader: true,
  });

  // Risk Metrics Sheet
  const riskMetricsData = Object.entries(data.strategies).map(([key, strategy]) => ({
    Strategy: key,
    'Standard Deviation': strategy.risk_metrics.standard_deviation.toFixed(4),
    'Downside Deviation': strategy.risk_metrics.downside_deviation.toFixed(4),
    'VaR 95%': strategy.risk_metrics.value_at_risk_95.toFixed(4),
    'CVaR 95%': strategy.risk_metrics.conditional_var_95.toFixed(4),
    'Profit Factor': strategy.risk_metrics.profit_factor === Infinity 
      ? 'Infinity' 
      : strategy.risk_metrics.profit_factor.toFixed(2),
    'Max Consecutive Losses': strategy.risk_metrics.max_consecutive_losses,
    'Sharpe Ratio': strategy.risk_metrics.sharpe_ratio.toFixed(2),
    'Sortino Ratio': strategy.risk_metrics.sortino_ratio.toFixed(2),
  }));

  sheets.push({
    name: 'Risk Metrics',
    columns: [
      { header: 'Strategy', key: 'Strategy', width: 15 },
      { header: 'Standard Deviation', key: 'Standard Deviation', width: 20 },
      { header: 'Downside Deviation', key: 'Downside Deviation', width: 20 },
      { header: 'VaR 95%', key: 'VaR 95%', width: 12 },
      { header: 'CVaR 95%', key: 'CVaR 95%', width: 12 },
      { header: 'Profit Factor', key: 'Profit Factor', width: 15 },
      { header: 'Max Consecutive Losses', key: 'Max Consecutive Losses', width: 22 },
      { header: 'Sharpe Ratio', key: 'Sharpe Ratio', width: 15 },
      { header: 'Sortino Ratio', key: 'Sortino Ratio', width: 15 },
    ],
    data: riskMetricsData,
    autoFilter: true,
    freezeHeader: true,
  });

  // Performance Sheet
  const performanceData = Object.entries(data.strategies).map(([key, strategy]) => ({
    Strategy: key,
    'Total Bets': strategy.performance.total_bets,
    'Wins': strategy.performance.wins,
    'Losses': strategy.performance.total_bets - strategy.performance.wins,
    'Win Rate (%)': strategy.performance.win_rate.toFixed(2),
    'Average Return': strategy.performance.average_return.toFixed(4),
    'Total Return': strategy.performance.total_return.toFixed(2),
    'Expected Value (%)': (strategy.performance.average_return * 100).toFixed(2),
  }));

  sheets.push({
    name: 'Performance',
    columns: [
      { header: 'Strategy', key: 'Strategy', width: 15 },
      { header: 'Total Bets', key: 'Total Bets', width: 12 },
      { header: 'Wins', key: 'Wins', width: 10 },
      { header: 'Losses', key: 'Losses', width: 10 },
      { header: 'Win Rate (%)', key: 'Win Rate (%)', width: 15 },
      { header: 'Average Return', key: 'Average Return', width: 18 },
      { header: 'Total Return', key: 'Total Return', width: 15 },
      { header: 'Expected Value (%)', key: 'Expected Value (%)', width: 18 },
    ],
    data: performanceData,
    autoFilter: true,
    freezeHeader: true,
  });

  // Drawdown Analysis Sheet
  const drawdownData = Object.entries(data.strategies).map(([key, strategy]) => ({
    Strategy: key,
    'Max Drawdown (%)': strategy.drawdown_analysis.max_drawdown_percent.toFixed(2),
    'Drawdown Periods': strategy.drawdown_analysis.drawdown_periods,
    'Avg Drawdown Duration': strategy.drawdown_analysis.avg_drawdown_duration.toFixed(2),
    'Longest Drawdown': strategy.drawdown_analysis.longest_drawdown,
  }));

  sheets.push({
    name: 'Drawdown Analysis',
    columns: [
      { header: 'Strategy', key: 'Strategy', width: 15 },
      { header: 'Max Drawdown (%)', key: 'Max Drawdown (%)', width: 18 },
      { header: 'Drawdown Periods', key: 'Drawdown Periods', width: 18 },
      { header: 'Avg Drawdown Duration', key: 'Avg Drawdown Duration', width: 22 },
      { header: 'Longest Drawdown', key: 'Longest Drawdown', width: 18 },
    ],
    data: drawdownData,
    autoFilter: true,
    freezeHeader: true,
  });

  // Analysis Summary Sheet
  const summaryData = [
    {
      Metric: 'Total Games Analyzed',
      Value: data.total_games,
    },
    {
      Metric: 'Target Multipliers',
      Value: targets.join(', '),
    },
    {
      Metric: 'Games Limit',
      Value: limit,
    },
    {
      Metric: 'Best Sharpe Ratio',
      Value: data.optimal_strategy.best_sharpe_ratio,
    },
    {
      Metric: 'Best Expected Value',
      Value: data.optimal_strategy.best_roi,
    },
    {
      Metric: 'Best Win Rate',
      Value: data.optimal_strategy.best_win_rate,
    },
    {
      Metric: 'Recommendation',
      Value: data.optimal_strategy.recommendation,
    },
  ];

  sheets.push({
    name: 'Summary',
    columns: [
      { header: 'Metric', key: 'Metric', width: 30 },
      { header: 'Value', key: 'Value', width: 50 },
    ],
    data: summaryData,
  });

  // Add Risk Categories sheet
  const lowRiskStrategies = Object.entries(data.strategies).filter(
    ([, strategy]) => strategy.risk_metrics.standard_deviation < 0.5 && strategy.drawdown_analysis.max_drawdown_percent < 15
  );
  const mediumRiskStrategies = Object.entries(data.strategies).filter(
    ([, strategy]) => strategy.risk_metrics.standard_deviation >= 0.5 && strategy.risk_metrics.standard_deviation < 1 && strategy.drawdown_analysis.max_drawdown_percent < 30
  );
  const highRiskStrategies = Object.entries(data.strategies).filter(
    ([, strategy]) => strategy.risk_metrics.standard_deviation >= 1 || strategy.drawdown_analysis.max_drawdown_percent >= 30
  );

  const riskCategoriesData = [
    ...lowRiskStrategies.map(([key, strategy]) => ({
      Category: 'Low Risk',
      Strategy: key,
      'Expected Value (%)': (strategy.performance.average_return * 100).toFixed(2),
      'Risk (Std Dev)': strategy.risk_metrics.standard_deviation.toFixed(4),
      'Max Drawdown (%)': strategy.drawdown_analysis.max_drawdown_percent.toFixed(2),
    })),
    ...mediumRiskStrategies.map(([key, strategy]) => ({
      Category: 'Medium Risk',
      Strategy: key,
      'Expected Value (%)': (strategy.performance.average_return * 100).toFixed(2),
      'Risk (Std Dev)': strategy.risk_metrics.standard_deviation.toFixed(4),
      'Max Drawdown (%)': strategy.drawdown_analysis.max_drawdown_percent.toFixed(2),
    })),
    ...highRiskStrategies.map(([key, strategy]) => ({
      Category: 'High Risk',
      Strategy: key,
      'Expected Value (%)': (strategy.performance.average_return * 100).toFixed(2),
      'Risk (Std Dev)': strategy.risk_metrics.standard_deviation.toFixed(4),
      'Max Drawdown (%)': strategy.drawdown_analysis.max_drawdown_percent.toFixed(2),
    })),
  ];

  sheets.push({
    name: 'Risk Categories',
    columns: [
      { header: 'Category', key: 'Category', width: 15 },
      { header: 'Strategy', key: 'Strategy', width: 15 },
      { header: 'Expected Value (%)', key: 'Expected Value (%)', width: 18 },
      { header: 'Risk (Std Dev)', key: 'Risk (Std Dev)', width: 15 },
      { header: 'Max Drawdown (%)', key: 'Max Drawdown (%)', width: 18 },
    ],
    data: riskCategoriesData,
    autoFilter: true,
    freezeHeader: true,
  });

  return {
    fileName: `risk-reward-profiles-${targets.join('-')}x-${limit}games-${new Date().toISOString().split('T')[0]}`,
    sheets,
  };
}