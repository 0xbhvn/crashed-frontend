import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { MarketPsychologyData } from './types';

export function getExcelConfig({
  data,
  limit,
  shortWindow,
  longWindow,
}: {
  data: MarketPsychologyData;
  limit: number;
  shortWindow: number;
  longWindow: number;
}): ExcelExportConfig {
  const fileName = `market-psychology_${limit}games_${shortWindow}-${longWindow}window_${
    new Date().toISOString().split('T')[0]
  }`;

  return {
    fileName,
    sheets: [
      // Summary Sheet
      {
        name: 'Summary',
        data: [
          {
            Metric: 'Fear & Greed Index',
            Value: data.fear_greed_index.index.toFixed(2),
            Status: data.fear_greed_index.sentiment,
            Category: 'Market Sentiment',
          },
          {
            Metric: 'Market Risk Level',
            Value: data.market_state.risk_level,
            Status: `${data.market_state.opportunity_score}/100 opportunity`,
            Category: 'Risk Assessment',
          },
          {
            Metric: 'Volatility Regime',
            Value: data.volatility_regime.error || data.volatility_regime.regime,
            Status: data.volatility_regime.error
              ? 'Error'
              : `${data.volatility_regime.current_volatility.toFixed(2)} current`,
            Category: 'Volatility',
          },
          {
            Metric: 'Momentum Trend',
            Value: data.momentum_indicators.error || data.momentum_indicators.trend,
            Status: data.momentum_indicators.error
              ? 'Error'
              : `RSI: ${data.momentum_indicators.rsi.toFixed(0)}`,
            Category: 'Momentum',
          },
          {
            Metric: 'Bust Frequency Index',
            Value: data.bust_frequency_index.index.toFixed(2),
            Status: data.bust_frequency_index.interpretation.split(' - ')[0],
            Category: 'Risk Metrics',
          },
        ],
        columns: [
          { header: 'Metric', key: 'Metric', width: 25 },
          { header: 'Value', key: 'Value', width: 20 },
          { header: 'Status', key: 'Status', width: 30 },
          { header: 'Category', key: 'Category', width: 20 },
        ],
        autoFilter: true,
        freezeHeader: true,
      },

      // Fear & Greed Components
      {
        name: 'Fear Greed Components',
        data: [
          {
            Component: 'Performance',
            Value: data.fear_greed_index.components.performance,
            Weight: '25%',
            Description: 'Recent winning performance',
          },
          {
            Component: 'Volatility (inverted)',
            Value: data.fear_greed_index.components.volatility,
            Weight: '25%',
            Description: 'Lower volatility indicates greed',
          },
          {
            Component: 'High Multipliers',
            Value: data.fear_greed_index.components.high_multipliers,
            Weight: '25%',
            Description: 'Frequency of high multiplier outcomes',
          },
          {
            Component: 'Bust Frequency (inverted)',
            Value: data.fear_greed_index.components.bust_frequency,
            Weight: '25%',
            Description: 'Lower bust rate indicates greed',
          },
        ],
        columns: [
          { header: 'Component', key: 'Component', width: 25 },
          { header: 'Value', key: 'Value', width: 15 },
          { header: 'Weight', key: 'Weight', width: 15 },
          { header: 'Description', key: 'Description', width: 40 },
        ],
        autoFilter: true,
        freezeHeader: true,
      },

      // Market States
      {
        name: 'Market States',
        data: data.market_state.states.map((state) => ({
          State: state,
          Active: 'Yes',
          RiskLevel: data.market_state.risk_level,
          OpportunityScore: data.market_state.opportunity_score,
        })),
        columns: [
          { header: 'State', key: 'State', width: 30 },
          { header: 'Active', key: 'Active', width: 10 },
          { header: 'Risk Level', key: 'RiskLevel', width: 20 },
          { header: 'Opportunity Score', key: 'OpportunityScore', width: 20 },
        ],
        autoFilter: true,
        freezeHeader: true,
      },

      // Detailed Indicators
      {
        name: 'Detailed Indicators',
        data: [
          {
            Indicator: 'Bust Frequency Index',
            Value: data.bust_frequency_index.index,
            RecentRate: data.bust_frequency_index.recent_bust_rate,
            LongTermRate: data.bust_frequency_index.long_term_bust_rate,
            Interpretation: data.bust_frequency_index.interpretation,
          },
          {
            Indicator: 'Current Volatility',
            Value: data.volatility_regime.current_volatility || 0,
            RecentRate: data.volatility_regime.volatility_ratio || 0,
            LongTermRate: data.volatility_regime.average_volatility || 0,
            Interpretation: data.volatility_regime.error || data.volatility_regime.regime,
          },
          {
            Indicator: 'RSI',
            Value: data.momentum_indicators.rsi || 0,
            RecentRate: data.momentum_indicators.momentum_score || 0,
            LongTermRate: data.momentum_indicators.recent_average || 0,
            Interpretation: data.momentum_indicators.error || data.momentum_indicators.interpretation,
          },
        ],
        columns: [
          { header: 'Indicator', key: 'Indicator', width: 25 },
          { header: 'Value', key: 'Value', width: 15 },
          { header: 'Recent Rate', key: 'RecentRate', width: 15 },
          { header: 'Long Term Rate', key: 'LongTermRate', width: 15 },
          { header: 'Interpretation', key: 'Interpretation', width: 50 },
        ],
        autoFilter: true,
        freezeHeader: true,
      },

      // Trading Recommendations
      {
        name: 'Recommendations',
        data: data.trading_recommendations.map((rec, idx) => ({
          Order: idx + 1,
          Recommendation: rec,
          BasedOn: 'Market Psychology Analysis',
        })),
        columns: [
          { header: 'Order', key: 'Order', width: 10 },
          { header: 'Recommendation', key: 'Recommendation', width: 60 },
          { header: 'Based On', key: 'BasedOn', width: 25 },
        ],
        autoFilter: true,
        freezeHeader: true,
      },

      // Analysis Info
      {
        name: 'Analysis Info',
        data: [
          { Parameter: 'Games Analyzed', Value: limit },
          { Parameter: 'Short Window', Value: shortWindow },
          { Parameter: 'Long Window', Value: longWindow },
          { Parameter: 'Export Date', Value: new Date().toLocaleString() },
        ],
        columns: [
          { header: 'Parameter', key: 'Parameter', width: 25 },
          { header: 'Value', key: 'Value', width: 30 },
        ],
      },
    ],
  };
}