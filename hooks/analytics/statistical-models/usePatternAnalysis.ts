import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface RandomnessMetrics {
  entropy: number;
  entropy_ratio: number;
  interpretation: string;
}

interface AutocorrelationResult {
  correlations: Record<string, number>;
  significant_lags: number[];
  interpretation: string;
}

interface AnomalyGame {
  index: number;
  game_id: string;
  crash_point: number;
  z_score: number;
  time: string;
}

interface Anomalies {
  anomalous_games: AnomalyGame[];
  z_score_threshold: number;
  iqr_bounds: {
    lower: number;
    upper: number;
  };
  iqr_anomaly_count: number;
  anomaly_rate: number;
}

interface Peaks {
  count: number;
  positions: number[];
  average_height: number;
}

interface Trend {
  slope: number;
  direction: string;
}

interface Periodicity {
  dominant_period: number;
  has_cycle: boolean;
}

interface Patterns {
  peaks: Peaks;
  trend: Trend;
  periodicity: Periodicity;
  dominant_pattern: string;
}

interface ClusterInfo {
  count: number;
  percentage: number;
  range: string;
}

interface PatternAnalysisData {
  total_games: number;
  analysis_period: {
    start: string;
    end: string;
  };
  randomness_metrics: RandomnessMetrics;
  autocorrelation: AutocorrelationResult;
  anomalies: Anomalies;
  patterns: Patterns;
  clustering: Record<string, ClusterInfo>;
  summary: {
    total_anomalies: number;
    anomaly_rate: number;
    dominant_pattern: string;
    randomness_score: number;
  };
}

interface UsePatternAnalysisOptions {
  limit?: number;
  anomalyThreshold?: number;
  enabled?: boolean;
  refreshInterval?: number;
}

interface UsePatternAnalysisReturn {
  data: PatternAnalysisData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export function usePatternAnalysis({
  limit = 1000,
  anomalyThreshold = 3.0,
  enabled = true,
  refreshInterval,
}: UsePatternAnalysisOptions = {}): UsePatternAnalysisReturn {
  const [data, setData] = useState<PatternAnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        anomaly_threshold: anomalyThreshold.toString(),
      });

      const response = await fetch(`/api/analytics/statistical-models/pattern-analysis?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      } else if (result.data?.error) {
        throw new Error(result.data.error);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pattern analysis';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [limit, anomalyThreshold, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!refreshInterval || !enabled) return;

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled]);

  return {
    data,
    isLoading,
    error,
    refreshData: fetchData,
  };
}