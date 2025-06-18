import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import type { PatternAnalysisData } from './types';
import { formatClusterData } from './utils';

interface ExportProps {
  data: PatternAnalysisData | null;
}

export function getHtmlConfig({ data }: ExportProps): HtmlChartConfig {
  if (!data) {
    return {
      title: 'Pattern Analysis & Anomaly Detection',
      subtitle: 'No data available',
      customHtml: '<div style="text-align: center; padding: 40px; color: #666;"><p>No data available for visualization</p></div>',
    };
  }

  const clusterData = formatClusterData(data);

  let customHtml = '';

  // Add export timestamp
  customHtml += `
    <div style="text-align: right; color: #666; font-size: 0.875em; margin-bottom: 20px;">
      <p>Generated: ${new Date().toLocaleString()}</p>
    </div>
  `;

  // Summary section
  customHtml += `
    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="margin-bottom: 15px;">Analysis Summary</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
        <div>
          <p style="color: #666; margin-bottom: 5px;">Randomness Score</p>
          <p style="font-size: 1.2em; font-weight: bold; color: ${
            data.summary.randomness_score > 80 ? '#10b981' :
            data.summary.randomness_score > 60 ? '#f59e0b' :
            data.summary.randomness_score > 40 ? '#f97316' : '#ef4444'
          };">${data.summary.randomness_score.toFixed(2)}%</p>
          <p style="font-size: 0.875em; color: #666;">${data.randomness_metrics.interpretation}</p>
        </div>
        <div>
          <p style="color: #666; margin-bottom: 5px;">Anomalies Detected</p>
          <p style="font-size: 1.2em; font-weight: bold;">${data.summary.total_anomalies}</p>
          <p style="font-size: 0.875em; color: #666;">${data.summary.anomaly_rate.toFixed(2)}% of games</p>
        </div>
        <div>
          <p style="color: #666; margin-bottom: 5px;">Dominant Pattern</p>
          <p style="font-size: 1.2em; font-weight: bold;">${data.summary.dominant_pattern}</p>
          <p style="font-size: 0.875em; color: #666;">${data.patterns.trend.direction} trend</p>
        </div>
        <div>
          <p style="color: #666; margin-bottom: 5px;">Entropy</p>
          <p style="font-size: 1.2em; font-weight: bold;">${data.randomness_metrics.entropy.toFixed(2)}</p>
          <p style="font-size: 0.875em; color: #666;">Ratio: ${(data.randomness_metrics.entropy_ratio * 100).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  `;

  // Clustering section
  customHtml += `
    <h2 style="margin-top: 30px; margin-bottom: 15px;">Crash Point Distribution</h2>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Category</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Count</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Percentage</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Range</th>
          </tr>
        </thead>
        <tbody>
          ${clusterData.map(cluster => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px;">${cluster.name}</td>
              <td style="padding: 10px; text-align: right;">${cluster.count}</td>
              <td style="padding: 10px; text-align: right;">${cluster.value.toFixed(2)}%</td>
              <td style="padding: 10px;">${cluster.range}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Anomalies section
  if (data.anomalies.anomalous_games.length > 0) {
    customHtml += `
      <h2 style="margin-top: 30px; margin-bottom: 15px;">Anomalous Games</h2>
      <p style="margin-bottom: 10px;">IQR Bounds: ${data.anomalies.iqr_bounds.lower.toFixed(2)}x - ${data.anomalies.iqr_bounds.upper.toFixed(2)}x | IQR Anomalies: ${data.anomalies.iqr_anomaly_count} games</p>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Game ID</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Crash Point</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Z-Score</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Time</th>
            </tr>
          </thead>
          <tbody>
            ${data.anomalies.anomalous_games.slice(0, 50).map(game => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-family: monospace;">${game.game_id}</td>
                <td style="padding: 10px; text-align: right; color: ${game.crash_point > 10 ? '#16a34a' : '#dc2626'};">
                  ${game.crash_point.toFixed(2)}x
                </td>
                <td style="padding: 10px; text-align: right; color: ${
                  Math.abs(game.z_score) > 4 ? '#dc2626' :
                  Math.abs(game.z_score) > 3 ? '#f97316' : '#f59e0b'
                };">
                  ${game.z_score > 0 ? '+' : ''}${game.z_score.toFixed(2)}
                </td>
                <td style="padding: 10px;">${new Date(game.time).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${data.anomalies.anomalous_games.length > 50 ? 
          `<p style="margin-top: 10px; text-align: center; color: #666;">Showing first 50 of ${data.anomalies.anomalous_games.length} anomalous games</p>` : 
          ''}
      </div>
    `;
  }

  // Autocorrelation section
  customHtml += `
    <h2 style="margin-top: 30px; margin-bottom: 15px;">Autocorrelation Analysis</h2>
    <p style="margin-bottom: 10px; padding: 15px; background: #f5f5f5; border-radius: 4px;">
      ${data.autocorrelation.interpretation}
      ${data.autocorrelation.significant_lags.length > 0 ? 
        `<br><small style="color: #666;">Significant at lags: ${data.autocorrelation.significant_lags.join(', ')}</small>` : 
        ''}
    </p>
  `;

  // Patterns section
  customHtml += `
    <h2 style="margin-top: 30px; margin-bottom: 15px;">Pattern Detection</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
      <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h4 style="margin-bottom: 10px;">Trend Analysis</h4>
        <p style="font-weight: bold; text-transform: capitalize;">${data.patterns.trend.direction}</p>
        <p style="color: #666; font-size: 0.875em;">Slope: ${data.patterns.trend.slope.toFixed(2)}</p>
      </div>
      <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h4 style="margin-bottom: 10px;">Peak Detection</h4>
        <p style="font-weight: bold;">${data.patterns.peaks.count} peaks</p>
        <p style="color: #666; font-size: 0.875em;">Avg height: ${data.patterns.peaks.average_height.toFixed(2)}x</p>
      </div>
      <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h4 style="margin-bottom: 10px;">Periodicity</h4>
        <p style="font-weight: bold;">${data.patterns.periodicity.has_cycle ? 'Cyclical' : 'No cycle'}</p>
        ${data.patterns.periodicity.has_cycle ? 
          `<p style="color: #666; font-size: 0.875em;">Period: ~${Math.round(data.patterns.periodicity.dominant_period)} games</p>` : 
          ''}
      </div>
    </div>
  `;

  // Statistical summary
  customHtml += `
    <h2 style="margin-top: 30px; margin-bottom: 15px;">Statistical Summary</h2>
    <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
      <p><strong>Analysis Overview:</strong></p>
      <ul style="margin-top: 10px; list-style-type: none; padding-left: 0;">
        <li>• Total games analyzed: ${data.summary.total_anomalies > 0 ? data.anomalies.anomalous_games.length + ' anomalous out of unknown total' : 'Unknown'}</li>
        <li>• Randomness interpretation: ${data.randomness_metrics.interpretation}</li>
        <li>• Autocorrelation assessment: ${data.autocorrelation.interpretation}</li>
        <li>• Dominant pattern type: ${data.summary.dominant_pattern}</li>
      </ul>
    </div>
  `;

  return {
    title: 'Pattern Analysis & Anomaly Detection Report',
    subtitle: `Comprehensive pattern recognition and anomaly analysis`,
    customHtml,
    charts: [
      {
        id: 'clustering-chart',
        type: 'pie',
        title: 'Crash Point Distribution',
        labels: clusterData.map(cluster => cluster.name),
        datasets: [{
          label: 'Percentage',
          data: clusterData.map(cluster => cluster.value),
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
    ],
  };
}