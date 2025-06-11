import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface BustFrequencyIndex {
  index: number;
  recent_bust_rate: number;
  long_term_bust_rate: number;
  interpretation: string;
}

interface VolatilityRegime {
  current_volatility: number;
  average_volatility: number;
  volatility_ratio: number;
  percentile_rank: number;
  regime: string;
  error?: string;
}

interface MomentumIndicators {
  rsi: number;
  momentum_score: number;
  recent_average: number;
  trend: string;
  interpretation: string;
  error?: string;
}

interface FearGreedComponents {
  performance: number;
  volatility: number;
  high_multipliers: number;
  bust_frequency: number;
}

interface FearGreedIndex {
  index: number;
  components: FearGreedComponents;
  sentiment: string;
}

interface MarketState {
  states: string[];
  risk_level: string;
  opportunity_score: number;
}

interface MarketPsychologyData {
  total_games: number;
  latest_update: string;
  bust_frequency_index: BustFrequencyIndex;
  volatility_regime: VolatilityRegime;
  momentum_indicators: MomentumIndicators;
  fear_greed_index: FearGreedIndex;
  market_state: MarketState;
  trading_recommendations: string[];
}

interface UseMarketPsychologyOptions {
  limit?: number;
  shortWindow?: number;
  longWindow?: number;
  enabled?: boolean;
  refreshInterval?: number;
}

interface UseMarketPsychologyReturn {
  data: MarketPsychologyData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export function useMarketPsychology({
  limit = 1000,
  shortWindow = 50,
  longWindow = 200,
  enabled = true,
  refreshInterval,
}: UseMarketPsychologyOptions = {}): UseMarketPsychologyReturn {
  const [data, setData] = useState<MarketPsychologyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        short_window: shortWindow.toString(),
        long_window: longWindow.toString(),
      });

      const response = await fetch(`/api/analytics/statistical-models/market-psychology?${params}`);
      
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market psychology indicators';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [limit, shortWindow, longWindow, enabled]);

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