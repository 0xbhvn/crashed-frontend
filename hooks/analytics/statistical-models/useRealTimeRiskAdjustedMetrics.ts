'use client';

import { useEffect, useRef, useState } from 'react';
import { useRiskAdjustedMetrics } from './useRiskAdjustedMetrics';
import { useAnalytics } from '@/context/analytics-context';

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

interface UseRealTimeRiskAdjustedMetricsOptions {
  targets?: number[];
  limit?: number;
  enabled?: boolean;
}

export function useRealTimeRiskAdjustedMetrics({
  targets = [2, 3, 5, 10],
  limit = 1000,
  enabled = true,
}: UseRealTimeRiskAdjustedMetricsOptions = {}) {
  // Keep local copy of data to prevent loading states
  const [localData, setLocalData] = useState<RiskAdjustedMetricsData | null>(null);

  // Track the last game we processed
  const lastProcessedGameRef = useRef<string | null>(null);

  // Keep track of when the data was last reloaded
  const lastRefreshTimeRef = useRef<number>(Date.now());

  // Get real-time game updates from the context
  const { latestGame } = useAnalytics();

  // Get data from the API - NOTE: No refreshInterval parameter!
  const {
    data: apiData,
    isLoading: apiLoading,
    error: apiError,
    refreshData: fetchData,
  } = useRiskAdjustedMetrics({
    targets,
    limit,
    enabled,
    // DO NOT pass refreshInterval - we handle updates via WebSocket
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

        // Compare strategy keys
        const apiKeys = Object.keys(apiData.strategies);
        const localKeys = Object.keys(localData.strategies);
        
        if (apiKeys.length !== localKeys.length) {
          return true;
        }

        // Compare key metrics that would affect the visualization
        for (const key of apiKeys) {
          const apiStrategy = apiData.strategies[key];
          const localStrategy = localData.strategies[key];

          if (!localStrategy) return true;

          // Compare essential metrics
          if (
            apiStrategy.performance.roi !== localStrategy.performance.roi ||
            apiStrategy.performance.win_rate !== localStrategy.performance.win_rate ||
            apiStrategy.risk_metrics.sharpe_ratio !== localStrategy.risk_metrics.sharpe_ratio ||
            apiStrategy.drawdown_analysis.max_drawdown_percent !== localStrategy.drawdown_analysis.max_drawdown_percent
          ) {
            return true;
          }
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

    // Prevent excessive API calls (at most once every 5 seconds for risk metrics)
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTimeRef.current;

    if (timeSinceLastRefresh < 5000) {
      // Throttle API calls by setting a timeout
      const timeoutMs = 5000 - timeSinceLastRefresh;
      const timeoutId = setTimeout(() => {
        console.log('[RealTimeRiskMetrics] Fetching after throttle delay', { gameId: latestGame.gameId });
        fetchData();
        lastRefreshTimeRef.current = Date.now();
        lastProcessedGameRef.current = latestGame.gameId;
      }, timeoutMs);
      
      // Clean up timeout on unmount or if dependencies change
      return () => clearTimeout(timeoutId);
    } else {
      // Reload immediately if throttle period has passed
      console.log('[RealTimeRiskMetrics] Fetching immediately', { gameId: latestGame.gameId });
      fetchData();
      lastRefreshTimeRef.current = Date.now();
      lastProcessedGameRef.current = latestGame.gameId;
    }
  }, [latestGame, fetchData, enabled]);

  return {
    data: localData,
    isLoading: apiLoading && !localData, // Only show loading on initial load
    error: apiError,
    refreshData: fetchData,
  };
}