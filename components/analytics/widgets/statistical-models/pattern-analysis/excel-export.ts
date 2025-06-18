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
      fileName: `pattern-analysis-${new Date().toISOString().split('T')[0]}`,
      sheets: [{
        name: 'Pattern Analysis',
        columns: [{ key: 'message', header: 'Message', width: 50 }],
        data: [{ message: 'No data available for export' }],
      }],
    };
  }

  const clusterData = formatClusterData(data);
  const autocorrelationData = formatAutocorrelationData(data);

  return {
    fileName: `pattern-analysis-${params.limit}games-${new Date().toISOString().split('T')[0]}`,
    sheets: [
      {
        name: 'Summary',
        columns: [
          { key: 'metric', header: 'Metric', width: 25 },
          { key: 'value', header: 'Value', width: 30 },
        ],
        autoFilter: true,
        freezeHeader: true,
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
          { key: 'category', header: 'Category', width: 20 },
          { key: 'count', header: 'Count', width: 12 },
          { key: 'percentage', header: 'Percentage', width: 15 },
          { key: 'range', header: 'Range', width: 20 },
        ],
        autoFilter: true,
        freezeHeader: true,
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
          { key: 'game_id', header: 'Game ID', width: 15 },
          { key: 'crash_point', header: 'Crash Point', width: 15 },
          { key: 'z_score', header: 'Z-Score', width: 12 },
          { key: 'anomaly_type', header: 'Anomaly Type', width: 15 },
          { key: 'time', header: 'Time', width: 25 },
        ],
        autoFilter: true,
        freezeHeader: true,
        data: data.anomalies.anomalous_games.map(game => ({
          game_id: game.game_id,
          crash_point: `${game.crash_point.toFixed(2)}x`,
          z_score: `${game.z_score > 0 ? '+' : ''}${game.z_score.toFixed(2)}`,
          anomaly_type: Math.abs(game.z_score) > 4 ? 'Extreme' : Math.abs(game.z_score) > 3 ? 'High' : 'Moderate',
          time: new Date(game.time).toLocaleString(),
        })),
      },
      {
        name: 'Autocorrelation',
        columns: [
          { key: 'lag', header: 'Lag', width: 10 },
          { key: 'correlation', header: 'Correlation', width: 15 },
          { key: 'significant', header: 'Significant', width: 15 },
          { key: 'interpretation', header: 'Interpretation', width: 30 },
        ],
        autoFilter: true,
        freezeHeader: true,
        data: autocorrelationData.map(item => ({
          lag: item.lag,
          correlation: item.correlation.toFixed(4),
          significant: item.significant ? 'Yes' : 'No',
          interpretation: item.significant ? 'Potential pattern detected' : 'No significant pattern',
        })),
      },
      {
        name: 'Patterns',
        columns: [
          { key: 'pattern_type', header: 'Pattern Type', width: 20 },
          { key: 'description', header: 'Description', width: 20 },
          { key: 'value', header: 'Value', width: 25 },
          { key: 'interpretation', header: 'Interpretation', width: 35 },
        ],
        autoFilter: true,
        freezeHeader: true,
        data: [
          {
            pattern_type: 'Trend',
            description: 'Direction',
            value: data.patterns.trend.direction,
            interpretation: data.patterns.trend.direction === 'neutral' ? 'No clear trend detected' : `${data.patterns.trend.direction} trend observed`,
          },
          {
            pattern_type: 'Trend',
            description: 'Slope',
            value: data.patterns.trend.slope.toFixed(4),
            interpretation: Math.abs(data.patterns.trend.slope) < 0.001 ? 'Nearly flat' : `${data.patterns.trend.slope > 0 ? 'Positive' : 'Negative'} slope`,
          },
          {
            pattern_type: 'Peaks',
            description: 'Count',
            value: data.patterns.peaks.count.toString(),
            interpretation: `${data.patterns.peaks.count} significant peaks detected`,
          },
          {
            pattern_type: 'Peaks',
            description: 'Average Height',
            value: `${data.patterns.peaks.average_height.toFixed(2)}x`,
            interpretation: data.patterns.peaks.average_height > 10 ? 'High volatility peaks' : 'Moderate peak heights',
          },
          {
            pattern_type: 'Periodicity',
            description: 'Has Cycle',
            value: data.patterns.periodicity.has_cycle ? 'Yes' : 'No',
            interpretation: data.patterns.periodicity.has_cycle ? 'Cyclical pattern detected' : 'No cyclical pattern found',
          },
          {
            pattern_type: 'Periodicity',
            description: 'Dominant Period',
            value: data.patterns.periodicity.has_cycle ? `~${Math.round(data.patterns.periodicity.dominant_period)} games` : 'N/A',
            interpretation: data.patterns.periodicity.has_cycle ? `Repeating pattern every ~${Math.round(data.patterns.periodicity.dominant_period)} games` : 'No periodic behavior',
          },
        ],
      },
      {
        name: 'Analysis Info',
        columns: [
          { key: 'parameter', header: 'Parameter', width: 30 },
          { key: 'value', header: 'Value', width: 30 },
        ],
        data: [
          { parameter: 'Games Analyzed', value: params.limit },
          { parameter: 'Anomaly Threshold (Z-Score)', value: params.anomalyThreshold },
          { parameter: 'Total Anomalies Found', value: data.summary.total_anomalies },
          { parameter: 'Anomaly Rate', value: `${data.summary.anomaly_rate.toFixed(2)}%` },
          { parameter: 'IQR Lower Bound', value: `${data.anomalies.iqr_bounds.lower.toFixed(2)}x` },
          { parameter: 'IQR Upper Bound', value: `${data.anomalies.iqr_bounds.upper.toFixed(2)}x` },
          { parameter: 'IQR Anomaly Count', value: data.anomalies.iqr_anomaly_count },
          { parameter: 'Significant Autocorrelation Lags', value: data.autocorrelation.significant_lags.length > 0 ? data.autocorrelation.significant_lags.join(', ') : 'None' },
        ],
      },
    ],
  };
}