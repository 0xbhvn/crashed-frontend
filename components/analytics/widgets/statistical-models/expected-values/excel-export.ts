import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { ExpectedValuesData } from './types';

interface ExportConfig {
  targets: number[];
  limit: number;
  data: ExpectedValuesData | null;
}

export function getExpectedValuesExcelConfig({
  targets,
  limit,
  data,
}: ExportConfig): ExcelExportConfig {
  if (!data) {
    return {
      fileName: `expected-values_${targets.join('-')}_${limit}games`,
      sheets: [],
    };
  }

  const summaryData = [
    { metric: 'Total Games Analyzed', value: limit.toString() },
    { metric: '', value: '' },
    { metric: 'Optimal Targets', value: '' },
    {
      metric: 'Max Expected Value',
      value: `${data.optimal_targets.max_expected_value.target}x`,
      detail: `EV: ${data.optimal_targets.max_expected_value.expected_value?.toFixed(4) || 'N/A'}`,
      info: `Probability: ${data.optimal_targets.max_expected_value.probability?.toFixed(2)}%`,
    },
    {
      metric: 'Max Kelly Criterion',
      value: `${data.optimal_targets.max_kelly_criterion.target}x`,
      detail: `Kelly: ${data.optimal_targets.max_kelly_criterion.kelly_criterion?.toFixed(2)}%`,
      info: `EV: ${data.optimal_targets.max_kelly_criterion.expected_value?.toFixed(4)}`,
    },
    {
      metric: 'Best Risk-Adjusted',
      value: `${data.optimal_targets.best_risk_adjusted.target}x`,
      detail: `Score: ${data.optimal_targets.best_risk_adjusted.risk_adjusted_score?.toFixed(4) || 'N/A'}`,
      info: 'Balanced risk/reward',
    },
  ];

  const targetAnalysisData = Object.entries(data.target_analysis).map(([key, analysis]) => ({
    target: key,
    empiricalProbability: analysis.empirical_probability.toFixed(4),
    theoreticalProbability: analysis.theoretical_probability.toFixed(4),
    expectedValue: analysis.expected_value.toFixed(6),
    edge: analysis.edge.toFixed(4),
    kellyCriterion: analysis.kelly_criterion.toFixed(4),
    breakevenProbability: analysis.breakeven_probability.toFixed(4),
    evPer100Bets: analysis.ev_per_100_bets.toFixed(4),
    recommendation: analysis.recommendation,
  }));

  const survivalData = Object.entries(data.survival_probabilities).map(([, prob]) => ({
    range: `${prob.from}x → ${prob.to}x`,
    from: prob.from.toString(),
    to: prob.to.toString(),
    conditionalProbability: prob.conditional_probability.toFixed(4),
    interpretation: prob.interpretation,
  }));

  return {
    fileName: `expected-values_${targets.join('-')}_${limit}games_${new Date().toISOString().split('T')[0]}`,
    sheets: [
      {
        name: 'Summary',
        columns: [
          { header: 'Metric', key: 'metric', width: 30 },
          { header: 'Value', key: 'value', width: 20 },
          { header: 'Detail', key: 'detail', width: 25 },
          { header: 'Info', key: 'info', width: 35 },
        ],
        data: summaryData,
        autoFilter: false,
        freezeHeader: false,
      },
      {
        name: 'Target Analysis',
        columns: [
          { header: 'Target', key: 'target', width: 12 },
          { header: 'Empirical Prob %', key: 'empiricalProbability', width: 18 },
          { header: 'Theoretical Prob %', key: 'theoreticalProbability', width: 20 },
          { header: 'Expected Value', key: 'expectedValue', width: 18 },
          { header: 'Edge %', key: 'edge', width: 15 },
          { header: 'Kelly Criterion %', key: 'kellyCriterion', width: 18 },
          { header: 'Breakeven Prob %', key: 'breakevenProbability', width: 20 },
          { header: 'EV per 100 Bets', key: 'evPer100Bets', width: 18 },
          { header: 'Recommendation', key: 'recommendation', width: 25 },
        ],
        data: targetAnalysisData,
        autoFilter: true,
        freezeHeader: true,
      },
      {
        name: 'Survival Analysis',
        columns: [
          { header: 'Range', key: 'range', width: 20 },
          { header: 'From', key: 'from', width: 12 },
          { header: 'To', key: 'to', width: 12 },
          { header: 'Conditional Probability %', key: 'conditionalProbability', width: 25 },
          { header: 'Interpretation', key: 'interpretation', width: 50 },
        ],
        data: survivalData,
        autoFilter: true,
        freezeHeader: true,
      },
      {
        name: 'Analysis Info',
        columns: [
          { header: 'Parameter', key: 'parameter', width: 30 },
          { header: 'Value', key: 'value', width: 50 },
        ],
        data: [
          { parameter: 'Analysis Type', value: 'Expected Value & Kelly Criterion Analysis' },
          { parameter: 'Games Analyzed', value: limit.toString() },
          { parameter: 'Targets Analyzed', value: targets.join(', ') },
          { parameter: 'Generated At', value: new Date().toLocaleString() },
        ],
        autoFilter: false,
        freezeHeader: false,
      },
    ],
  };
}