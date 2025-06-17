import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { PatternAnalysisData, PatternAnalysisParams } from './types';
import { formatClusterData, formatAutocorrelationData } from './utils';

interface ExportProps {
  params: PatternAnalysisParams;
  data: PatternAnalysisData | null;
}

export function getExcelConfig({ params, data }: ExportProps): ExcelExportConfig {
  if (!data) {
    return {
      sheets: [{
        name: 'Pattern Analysis',
        columns: [{ key: 'message', header: 'Message' }],
        data: [{ message: 'No data available for export' }],
      }],
    };
  }

  const clusterData = formatClusterData(data);
  const autocorrelationData = formatAutocorrelationData(data);

  return {
    sheets: [
      {
        name: 'Summary',
        columns: [
          { key: 'metric', header: 'Metric' },
          { key: 'value', header: 'Value' },
        ],
        data: [
          { metric: 'Randomness Score', value: `${data.summary.randomness_score.toFixed(2)}%` },
          { metric: 'Total Anomalies', value: data.summary.total_anomalies },
          { metric: 'Anomaly Rate', value: `${data.summary.anomaly_rate.toFixed(2)}%` },
          { metric: 'Dominant Pattern', value: data.summary.dominant_pattern },
          { metric: 'Entropy', value: data.randomness_metrics.entropy.toFixed(2) },
          { metric: 'Entropy Ratio', value: `${(data.randomness_metrics.entropy_ratio * 100).toFixed(2)}%` },
          { metric: 'Interpretation', value: data.randomness_metrics.interpretation },
          { metric: 'Games Analyzed', value: params.limit },
          { metric: 'Anomaly Threshold', value: params.anomalyThreshold },
        ],
      },
      {
        name: 'Clustering',
        columns: [
          { key: 'category', header: 'Category' },
          { key: 'count', header: 'Count' },
          { key: 'percentage', header: 'Percentage' },
          { key: 'range', header: 'Range' },
        ],
        data: clusterData.map(cluster => ({
          category: cluster.name,
          count: cluster.count,
          percentage: `${cluster.value.toFixed(2)}%`,
          range: cluster.range,
        })),
      },
      {
        name: 'Anomalies',
        columns: [
          { key: 'game_id', header: 'Game ID' },
          { key: 'crash_point', header: 'Crash Point' },
          { key: 'z_score', header: 'Z-Score' },
          { key: 'time', header: 'Time' },
        ],
        data: data.anomalies.anomalous_games.map(game => ({
          game_id: game.game_id,
          crash_point: game.crash_point.toFixed(2),
          z_score: game.z_score.toFixed(2),
          time: new Date(game.time).toLocaleString(),
        })),
      },
      {
        name: 'Autocorrelation',
        columns: [
          { key: 'lag', header: 'Lag' },
          { key: 'correlation', header: 'Correlation' },
          { key: 'significant', header: 'Significant' },
        ],
        data: autocorrelationData.map(item => ({
          lag: item.lag,
          correlation: item.correlation.toFixed(4),
          significant: item.significant ? 'Yes' : 'No',
        })),
      },
      {
        name: 'Patterns',
        columns: [
          { key: 'pattern_type', header: 'Pattern Type' },
          { key: 'description', header: 'Description' },
          { key: 'value', header: 'Value' },
        ],
        data: [
          {
            pattern_type: 'Trend',
            description: 'Direction',
            value: data.patterns.trend.direction,
          },
          {
            pattern_type: 'Trend',
            description: 'Slope',
            value: data.patterns.trend.slope.toFixed(4),
          },
          {
            pattern_type: 'Peaks',
            description: 'Count',
            value: data.patterns.peaks.count.toString(),
          },
          {
            pattern_type: 'Peaks',
            description: 'Average Height',
            value: data.patterns.peaks.average_height.toFixed(2),
          },
          {
            pattern_type: 'Periodicity',
            description: 'Has Cycle',
            value: data.patterns.periodicity.has_cycle ? 'Yes' : 'No',
          },
          {
            pattern_type: 'Periodicity',
            description: 'Dominant Period',
            value: data.patterns.periodicity.dominant_period.toFixed(2),
          },
        ],
      },
    ],
  };
}