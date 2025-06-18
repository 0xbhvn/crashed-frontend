import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import type { ExpectedValuesData } from './types';

export function getExpectedValuesHtmlConfig(
  data: ExpectedValuesData | null
): HtmlChartConfig {
  if (!data) {
    return {
      title: 'Expected Value Analysis',
      subtitle: 'No data available',
      charts: [],
    };
  }

  // Format chart data
  const chartData = Object.entries(data.target_analysis).map(([key, analysis]) => ({
    target: parseFloat(key.replace('x', '')),
    expectedValue: analysis.expected_value,
    empiricalProb: analysis.empirical_probability,
    theoreticalProb: analysis.theoretical_probability,
    kellyFraction: analysis.kelly_criterion,
    edge: analysis.edge,
    breakevenProb: analysis.breakeven_probability,
    evPer100: analysis.ev_per_100_bets,
  }));

  const survivalData = Object.entries(data.survival_probabilities).map(([, prob]) => ({
    range: `${prob.from}x→${prob.to}x`,
    probability: prob.conditional_probability,
    from: prob.from,
    to: prob.to,
  }));

  return {
    title: 'Expected Value Analysis',
    subtitle: `Optimal Strategies and Risk Analysis`,
    fileName: `expected-values_${new Date().toISOString().split('T')[0]}`,
    configTable: {
      entries: [
        { parameter: 'Max EV Target', value: data.optimal_targets.max_expected_value.target },
        { parameter: 'Max EV', value: data.optimal_targets.max_expected_value.expected_value?.toFixed(4) || 'N/A' },
        { parameter: 'Max Kelly Target', value: data.optimal_targets.max_kelly_criterion.target },
        { parameter: 'Max Kelly %', value: `${data.optimal_targets.max_kelly_criterion.kelly_criterion?.toFixed(2)}%` || 'N/A' },
        { parameter: 'Best Risk-Adjusted', value: data.optimal_targets.best_risk_adjusted.target },
        { parameter: 'Risk-Adjusted Score', value: data.optimal_targets.best_risk_adjusted.risk_adjusted_score?.toFixed(4) || 'N/A' },
      ],
    },
    charts: [
      {
        id: 'ev-chart',
        type: 'line',
        title: 'Expected Value by Target',
        labels: chartData.map((d) => `${d.target}x`),
        datasets: [
          {
            label: 'Expected Value',
            data: chartData.map((d) => d.expectedValue),
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            borderColor: 'rgb(20, 184, 166)',
            borderWidth: 2,
          },
        ],
        xAxisTitle: 'Target Multiplier',
        yAxisTitle: 'Expected Value',
      },
      {
        id: 'kelly-ev-chart',
        type: 'line',
        title: 'Kelly Criterion & Expected Value Analysis',
        labels: chartData.map((d) => `${d.target}x`),
        datasets: [
          {
            label: 'Kelly Criterion %',
            data: chartData.map((d) => d.kellyFraction),
            borderColor: 'rgb(147, 51, 234)',
            backgroundColor: 'rgba(147, 51, 234, 0.1)',
            borderWidth: 2,
          },
          {
            label: 'EV/100',
            data: chartData.map((d) => d.evPer100),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
          },
        ],
        xAxisTitle: 'Target Multiplier',
        yAxisTitle: 'Kelly % / EV per 100',
      },
      {
        id: 'probability-chart',
        type: 'line',
        title: 'Probability Analysis',
        labels: chartData.map((d) => `${d.target}x`),
        datasets: [
          {
            label: 'Breakeven %',
            data: chartData.map((d) => d.breakevenProb),
            borderColor: 'rgb(251, 146, 60)',
            backgroundColor: 'rgba(251, 146, 60, 0.1)',
            borderWidth: 2,
          },
          {
            label: 'Actual %',
            data: chartData.map((d) => d.empiricalProb),
            borderColor: 'rgb(14, 165, 233)',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            borderWidth: 2,
          },
        ],
        xAxisTitle: 'Target Multiplier',
        yAxisTitle: 'Probability %',
      },
      {
        id: 'survival-chart',
        type: 'bar',
        title: 'Conditional Survival Probabilities',
        labels: survivalData.map((d) => d.range),
        datasets: [
          {
            label: 'Probability %',
            data: survivalData.map((d) => d.probability),
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: 'rgb(139, 92, 246)',
            borderWidth: 1,
          },
        ],
        xAxisTitle: 'Range',
        yAxisTitle: 'Probability %',
      },
    ],
    dataTable: {
      columns: [
        { header: 'Target', key: 'target' },
        { header: 'Empirical %', key: 'empiricalProbability', formatter: (v) => `${v}%` },
        { header: 'Theoretical %', key: 'theoreticalProbability', formatter: (v) => `${v}%` },
        { header: 'Expected Value', key: 'expectedValue', formatter: (v) => Number(v).toFixed(6) },
        { header: 'Edge %', key: 'edge', formatter: (v) => `${v}%` },
        { header: 'Kelly %', key: 'kellyCriterion', formatter: (v) => `${v}%` },
        { header: 'EV/100', key: 'evPer100', formatter: (v) => Number(v).toFixed(2) },
        { header: 'Recommendation', key: 'recommendation' },
      ],
      data: Object.entries(data.target_analysis).map(([key, analysis]) => ({
        target: key,
        empiricalProbability: analysis.empirical_probability.toFixed(2),
        theoreticalProbability: analysis.theoretical_probability.toFixed(2),
        expectedValue: analysis.expected_value,
        edge: analysis.edge.toFixed(2),
        kellyCriterion: analysis.kelly_criterion.toFixed(2),
        evPer100: analysis.ev_per_100_bets,
        recommendation: analysis.recommendation,
      })),
    },
    customHtml: `
      <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <h3 style="margin-bottom: 15px; color: #333;">Analysis Summary</h3>
        <p style="margin-bottom: 10px;"><strong>Best Strategy:</strong> Target ${data.optimal_targets.max_expected_value.target} provides the highest expected value.</p>
        <p style="margin-bottom: 10px;"><strong>Optimal Bet Sizing:</strong> Target ${data.optimal_targets.max_kelly_criterion.target} suggests ${data.optimal_targets.max_kelly_criterion.kelly_criterion?.toFixed(2)}% Kelly allocation.</p>
        <p style="margin-bottom: 10px;"><strong>Risk-Adjusted Choice:</strong> Target ${data.optimal_targets.best_risk_adjusted.target} offers the best balance of risk and reward.</p>
      </div>
      <div style="text-align: right; color: #666; font-size: 0.875em; margin-top: 20px;">
        <p>Generated: ${new Date().toLocaleString()}</p>
      </div>
    `,
  };
}