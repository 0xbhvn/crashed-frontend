import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface RiskMetrics {
  sharpe_ratio: number;
  sortino_ratio: number;
  standard_deviation: number;
  downside_deviation: number;
  value_at_risk_95: number;
  conditional_var_95: number;
  profit_factor: number;
  max_consecutive_losses: number;
}

interface DrawdownAnalysis {
  max_drawdown_percent: number;
  drawdown_periods: number;
  avg_drawdown_duration: number;
  longest_drawdown: number;
}

interface StrategyPerformance {
  total_bets: number;
  wins: number;
  win_rate: number;
  average_return: number;
  total_return: number;
  final_balance: number;
  roi: number;
}

interface Strategy {
  target_multiplier: number;
  performance: StrategyPerformance;
  risk_metrics: RiskMetrics;
  drawdown_analysis: DrawdownAnalysis;
}

interface OptimalStrategy {
  best_sharpe_ratio: string;
  best_roi: string;
  best_win_rate: string;
  recommendation: string;
}

interface RiskAdjustedMetricsData {
  total_games: number;
  analysis_period: {
    start: string;
    end: string;
  };
  strategies: Record<string, Strategy>;
  optimal_strategy: OptimalStrategy;
}

interface UseRiskAdjustedMetricsOptions {
  targets?: number[];
  limit?: number;
  enabled?: boolean;
  refreshInterval?: number;
}

interface UseRiskAdjustedMetricsReturn {
  data: RiskAdjustedMetricsData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export function useRiskAdjustedMetrics({
  targets = [2, 3, 5, 10],
  limit = 1000,
  enabled = true,
  refreshInterval,
}: UseRiskAdjustedMetricsOptions = {}): UseRiskAdjustedMetricsReturn {
  const [data, setData] = useState<RiskAdjustedMetricsData | null>(null);
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

      const response = await fetch(`/api/analytics/statistical-models/risk-adjusted-metrics?${params}`);
      
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch risk-adjusted metrics';
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