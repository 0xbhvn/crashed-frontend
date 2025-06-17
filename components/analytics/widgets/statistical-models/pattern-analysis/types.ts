export interface PatternAnalysisData {
  summary: {
    randomness_score: number;
    total_anomalies: number;
    anomaly_rate: number;
    dominant_pattern: string;
  };
  randomness_metrics: {
    entropy: number;
    entropy_ratio: number;
    interpretation: string;
  };
  clustering: {
    [key: string]: {
      count: number;
      percentage: number;
      range: string;
    };
  };
  anomalies: {
    iqr_bounds: {
      lower: number;
      upper: number;
    };
    iqr_anomaly_count: number;
    anomalous_games: Array<{
      game_id: string;
      crash_point: number;
      z_score: number;
      time: string;
    }>;
  };
  autocorrelation: {
    correlations: {
      [key: string]: number;
    };
    significant_lags: number[];
    interpretation: string;
  };
  patterns: {
    trend: {
      direction: string;
      slope: number;
    };
    peaks: {
      count: number;
      average_height: number;
      positions: number[];
    };
    periodicity: {
      has_cycle: boolean;
      dominant_period: number;
    };
  };
}

export interface ClusterData {
  name: string;
  value: number;
  count: number;
  range: string;
}

export interface AutocorrelationData {
  lag: number;
  correlation: number;
  significant: boolean;
}

export interface PatternAnalysisParams {
  limit: number;
  anomalyThreshold: number;
  enabled: boolean;
}