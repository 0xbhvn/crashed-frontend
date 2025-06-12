'use client';

import { useEffect, useRef, useState } from 'react';
import { useMarketPsychology } from './useMarketPsychology';
import { useAnalytics } from '@/context/analytics-context';

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

interface UseRealTimeMarketPsychologyOptions {
  limit?: number;
  shortWindow?: number;
  longWindow?: number;
  enabled?: boolean;
}

export function useRealTimeMarketPsychology({
  limit = 1000,
  shortWindow = 50,
  longWindow = 200,
  enabled = true,
}: UseRealTimeMarketPsychologyOptions = {}) {
  // Keep local copy of data to prevent loading states
  const [localData, setLocalData] = useState<MarketPsychologyData | null>(null);

  // Track the last game we processed
  const lastProcessedGameRef = useRef<string | null>(null);

  // Keep track of when the data was last reloaded
  const lastRefreshTimeRef = useRef<number>(Date.now());

  // Get real-time game updates from the context
  const { latestGame } = useAnalytics();

  // Get data from the API
  const {
    data: apiData,
    isLoading: apiLoading,
    error: apiError,
    refreshData,
  } = useMarketPsychology({
    limit,
    shortWindow,
    longWindow,
    enabled,
  });

  // Initialize local data with API data
  useEffect(() => {
    if (apiData && !localData) {
      setLocalData(apiData);
    }
  }, [apiData, localData]);

  // Update local data with API data, preserving UI state
  useEffect(() => {
    if (apiData && localData) {
      // Use a more careful comparison approach that doesn't trigger unnecessary updates
      const hasDataChanged = (() => {
        // Compare total games - if different, data has changed
        if (apiData.total_games !== localData.total_games) {
          return true;
        }

        // Compare key metrics that would affect the visualization
        if (
          apiData.fear_greed_index.index !== localData.fear_greed_index.index ||
          apiData.fear_greed_index.sentiment !== localData.fear_greed_index.sentiment ||
          apiData.volatility_regime.regime !== localData.volatility_regime.regime ||
          apiData.momentum_indicators.trend !== localData.momentum_indicators.trend ||
          apiData.market_state.risk_level !== localData.market_state.risk_level
        ) {
          return true;
        }

        // Check if recommendations have changed
        if (apiData.trading_recommendations.length !== localData.trading_recommendations.length) {
          return true;
        }

        return false;
      })();

      // Only update if meaningful data has changed
      if (hasDataChanged) {
        setLocalData(apiData);
      }
    }
  }, [apiData, localData]);

  // Silently reload data when a new game arrives
  useEffect(() => {
    if (!latestGame || !enabled) return;

    // Skip if we've already processed this game
    if (lastProcessedGameRef.current === latestGame.gameId) {
      return;
    }

    // Prevent excessive API calls (at most once every 5 seconds)
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTimeRef.current;

    if (timeSinceLastRefresh < 5000) {
      // Throttle API calls by setting a timeout
      const timeoutMs = 5000 - timeSinceLastRefresh;
      setTimeout(() => {
        refreshData();
        lastRefreshTimeRef.current = Date.now();
        lastProcessedGameRef.current = latestGame.gameId;
      }, timeoutMs);
    } else {
      // Reload immediately if throttle period has passed
      refreshData();
      lastRefreshTimeRef.current = Date.now();
      lastProcessedGameRef.current = latestGame.gameId;
    }
  }, [latestGame, refreshData, enabled]);

  return {
    data: localData,
    isLoading: apiLoading && !localData, // Only show loading on initial load
    error: apiError,
    refreshData,
  };
}