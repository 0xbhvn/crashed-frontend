import type { MarketPsychologyData } from './types';
import { getFearGreedColor } from './utils';

export function getHtmlExportConfig({
  data,
  limit,
  shortWindow,
  longWindow,
}: {
  data: MarketPsychologyData;
  limit: number;
  shortWindow: number;
  longWindow: number;
}) {
  const fileName = `market-psychology_${limit}games_${shortWindow}-${longWindow}window_${
    new Date().toISOString().split('T')[0]
  }`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Market Psychology Analysis - ${new Date().toLocaleDateString()}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        h1 { 
            color: #2d3748; 
            margin: 0;
            font-size: 28px;
        }
        .subtitle {
            color: #718096;
            margin-top: 10px;
            font-size: 16px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card h2 {
            font-size: 18px;
            margin: 0 0 15px 0;
            color: #2d3748;
        }
        .metric {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        .label {
            font-size: 14px;
            color: #718096;
        }
        .chart-container {
            position: relative;
            height: 300px;
            margin-top: 20px;
        }
        .fear-greed-gauge {
            text-align: center;
            padding: 30px;
        }
        .fear-greed-value {
            font-size: 48px;
            font-weight: bold;
            margin: 20px 0;
        }
        .fear-greed-label {
            font-size: 24px;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        th {
            background-color: #f7fafc;
            font-weight: 600;
            color: #4a5568;
        }
        .risk-high { color: #e53e3e; }
        .risk-medium { color: #dd6b20; }
        .risk-low { color: #38a169; }
        .recommendation {
            background-color: #f7fafc;
            padding: 15px;
            border-left: 4px solid #4299e1;
            margin: 10px 0;
            border-radius: 5px;
        }
        .timestamp {
            text-align: right;
            color: #718096;
            font-size: 14px;
            margin-top: 30px;
        }
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .progress-fill {
            height: 100%;
            background-color: #48bb78;
            transition: width 0.3s ease;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin: 2px;
        }
        .badge-risk { background-color: #feb2b2; color: #c53030; }
        .badge-default { background-color: #e2e8f0; color: #4a5568; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧠 Market Psychology Analysis</h1>
        <p class="subtitle">Comprehensive sentiment and behavioral analysis | ${limit} games | Windows: ${shortWindow}/${longWindow}</p>
    </div>

    <!-- Fear & Greed Index -->
    <div class="card fear-greed-gauge">
        <h2>Fear & Greed Index</h2>
        <div class="fear-greed-value" style="color: ${getFearGreedColor(data.fear_greed_index.index)}">
            ${Math.round(data.fear_greed_index.index)}
        </div>
        <div class="fear-greed-label">${data.fear_greed_index.sentiment}</div>
        <canvas id="fearGreedChart"></canvas>
        
        <div style="margin-top: 30px;">
            <h3>Components</h3>
            <div style="text-align: left;">
                <div style="margin: 10px 0;">
                    <span class="label">Performance</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${data.fear_greed_index.components.performance}%"></div>
                    </div>
                    <span>${data.fear_greed_index.components.performance.toFixed(2)}%</span>
                </div>
                <div style="margin: 10px 0;">
                    <span class="label">Volatility (inverted)</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${data.fear_greed_index.components.volatility}%"></div>
                    </div>
                    <span>${data.fear_greed_index.components.volatility.toFixed(2)}%</span>
                </div>
                <div style="margin: 10px 0;">
                    <span class="label">High Multipliers</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${data.fear_greed_index.components.high_multipliers}%"></div>
                    </div>
                    <span>${data.fear_greed_index.components.high_multipliers.toFixed(2)}%</span>
                </div>
                <div style="margin: 10px 0;">
                    <span class="label">Bust Frequency (inverted)</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${data.fear_greed_index.components.bust_frequency}%"></div>
                    </div>
                    <span>${data.fear_greed_index.components.bust_frequency.toFixed(2)}%</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid">
        <div class="card">
            <h2>Market Risk Level</h2>
            <div class="metric risk-${data.market_state.risk_level.toLowerCase().replace(' ', '-')}">${data.market_state.risk_level}</div>
            <p class="label">Opportunity Score: ${data.market_state.opportunity_score}/100</p>
            <div style="margin-top: 15px;">
                ${data.market_state.states.map(state => 
                    `<span class="badge ${state.includes('Risk') ? 'badge-risk' : 'badge-default'}">${state}</span>`
                ).join('')}
            </div>
        </div>

        <div class="card">
            <h2>Volatility Regime</h2>
            ${data.volatility_regime.error ? 
                `<div class="metric">N/A</div><p class="label">${data.volatility_regime.error}</p>` :
                `<div class="metric">${data.volatility_regime.regime}</div>
                 <p class="label">Current: ${data.volatility_regime.current_volatility.toFixed(2)}</p>
                 <p class="label">Percentile: ${data.volatility_regime.percentile_rank.toFixed(2)}%</p>`
            }
        </div>

        <div class="card">
            <h2>Momentum Indicators</h2>
            ${data.momentum_indicators.error ? 
                `<div class="metric">N/A</div><p class="label">${data.momentum_indicators.error}</p>` :
                `<div class="metric">${data.momentum_indicators.trend.toUpperCase()}</div>
                 <p class="label">RSI: ${data.momentum_indicators.rsi.toFixed(0)}</p>
                 <p class="label">Score: ${data.momentum_indicators.momentum_score > 0 ? '+' : ''}${data.momentum_indicators.momentum_score.toFixed(2)}%</p>`
            }
        </div>

        <div class="card">
            <h2>Bust Frequency Index</h2>
            <div class="metric">${data.bust_frequency_index.index.toFixed(2)}</div>
            <p class="label">Recent: ${data.bust_frequency_index.recent_bust_rate.toFixed(2)}%</p>
            <p class="label">Long-term: ${data.bust_frequency_index.long_term_bust_rate.toFixed(2)}%</p>
        </div>
    </div>

    <!-- Detailed Indicators Chart -->
    <div class="card">
        <h2>Market Psychology Indicators</h2>
        <div class="chart-container">
            <canvas id="indicatorsChart"></canvas>
        </div>
    </div>

    <!-- Trading Recommendations -->
    <div class="card">
        <h2>Trading Recommendations</h2>
        ${data.trading_recommendations.map(rec => 
            `<div class="recommendation">💡 ${rec}</div>`
        ).join('')}
    </div>

    <div class="timestamp">
        <p>Generated: ${new Date().toLocaleString()}</p>
    </div>

    <script>
        // Fear & Greed Gauge Chart
        const fearGreedCtx = document.getElementById('fearGreedChart').getContext('2d');
        new Chart(fearGreedCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [${data.fear_greed_index.index}, ${100 - data.fear_greed_index.index}],
                    backgroundColor: ['${getFearGreedColor(data.fear_greed_index.index)}', '#e2e8f0'],
                    borderWidth: 0
                }]
            },
            options: {
                circumference: 180,
                rotation: 270,
                cutout: '75%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });

        // Market Indicators Radar Chart
        const indicatorsCtx = document.getElementById('indicatorsChart').getContext('2d');
        new Chart(indicatorsCtx, {
            type: 'radar',
            data: {
                labels: ['Fear/Greed', 'Volatility', 'Momentum', 'Bust Frequency', 'Opportunity'],
                datasets: [{
                    label: 'Current State',
                    data: [
                        ${data.fear_greed_index.index},
                        ${data.volatility_regime.error ? 50 : data.volatility_regime.percentile_rank},
                        ${data.momentum_indicators.error ? 50 : ((data.momentum_indicators.rsi / 100) * 100)},
                        ${Math.min(100, Math.max(0, 100 - (data.bust_frequency_index.index - 100) * 10))},
                        ${data.market_state.opportunity_score}
                    ],
                    backgroundColor: 'rgba(66, 153, 225, 0.2)',
                    borderColor: 'rgba(66, 153, 225, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(66, 153, 225, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(66, 153, 225, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20 }
                    }
                }
            }
        });
    </script>
</body>
</html>
  `;

  return {
    fileName,
    content: html,
  };
}