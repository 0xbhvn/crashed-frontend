import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface TargetAnalysis {
  target: number;
  empirical_probability: number;
  theoretical_probability: number;
  probability_deviation: number;
  expected_value: number;
  theoretical_ev: number;
  ev_per_100_bets: number;
  kelly_criterion: number;
  breakeven_probability: number;
  edge: number;
  recommendation: string;
}

interface SurvivalProbability {
  from: number;
  to: number;
  conditional_probability: number;
  interpretation: string;
}

interface OptimalTarget {
  target: string;
  expected_value?: number;
  probability?: number;
  kelly_criterion?: number;
  risk_adjusted_score?: number;
}

interface OptimalTargets {
  max_expected_value: OptimalTarget;
  max_kelly_criterion: OptimalTarget;
  best_risk_adjusted: OptimalTarget;
}

interface ExpectedValuesData {
  total_games: number;
  analysis_period: {
    start: string;
    end: string;
  };
  target_analysis: Record<string, TargetAnalysis>;
  survival_probabilities: Record<string, SurvivalProbability>;
  optimal_targets: OptimalTargets;
}

interface UseExpectedValuesOptions {
  targets?: number[];
  limit?: number;
  enabled?: boolean;
  refreshInterval?: number;
}

interface UseExpectedValuesReturn {
  data: ExpectedValuesData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export function useExpectedValues({
  targets = [1.5, 2, 3, 5, 10, 20, 50, 100],
  limit = 10000,
  enabled = true,
  refreshInterval,
}: UseExpectedValuesOptions = {}): UseExpectedValuesReturn {
  const [data, setData] = useState<ExpectedValuesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        targets: targets.join(','),
        limit: limit.toString(),
      });

      const response = await fetch(`/api/analytics/statistical-models/expected-values?${params}`);
      
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch expected values';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [targets, limit, enabled]);

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