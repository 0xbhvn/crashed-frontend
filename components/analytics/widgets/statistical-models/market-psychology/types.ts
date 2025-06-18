export interface MarketPsychologyData {
  fear_greed_index: FearGreedIndex;
  market_state: MarketState;
  bust_frequency_index: BustFrequencyIndex;
  volatility_regime: VolatilityRegime;
  momentum_indicators: MomentumIndicators;
  trading_recommendations: string[];
}

export interface FearGreedIndex {
  index: number;
  sentiment: string;
  components: {
    performance: number;
    volatility: number;
    high_multipliers: number;
    bust_frequency: number;
  };
}

export interface MarketState {
  states: string[];
  risk_level: string;
  opportunity_score: number;
}

export interface BustFrequencyIndex {
  index: number;
  recent_bust_rate: number;
  long_term_bust_rate: number;
  interpretation: string;
}

export interface VolatilityRegime {
  current_volatility: number;
  average_volatility: number;
  volatility_ratio: number;
  regime: string;
  percentile_rank: number;
  error?: string;
}

export interface MomentumIndicators {
  rsi: number;
  trend: string;
  momentum_score: number;
  recent_average: number;
  interpretation: string;
  error?: string;
}

export interface MarketPsychologyControlsProps {
  limit: number;
  limitInput: string;
  shortWindow: number;
  shortWindowInput: string;
  longWindow: number;
  longWindowInput: string;
  onLimitChange: (value: string) => void;
  onLimitApply: () => void;
  onShortWindowChange: (value: string) => void;
  onLongWindowChange: (value: string) => void;
  onWindowApply: () => void;
  getExcelConfig: () => Promise<import('@/utils/export-utils/excel').ExcelExportConfig>;
  getChartConfig: () => Promise<import('@/utils/export-utils/chart-html').HtmlChartConfig>;
}