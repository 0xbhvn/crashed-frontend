'use client';

import { useEffect, useRef, useState } from 'react';
import { useStatisticalModels, type CombinedStatisticalAnalysisResponse } from './useStatisticalModels';
import { useAnalytics } from '@/context/analytics-context';

interface UseRealTimeStatisticalModelsOptions {
  maWindows?: number[];
  volWindows?: number[];
  thresholdHigh?: number;
  thresholdLow?: number;
  limit?: number;
  enabled?: boolean;
}

export function useRealTimeStatisticalModels({
  maWindows = [5, 10, 20],
  volWindows = [10, 20, 50],
  thresholdHigh = 5.0,
  thresholdLow = 2.0,
  limit = 1000,
  enabled = true,
}: UseRealTimeStatisticalModelsOptions = {}) {
  // Keep local copy of data to prevent loading states
  const [localData, setLocalData] = useState<CombinedStatisticalAnalysisResponse | null>(null);

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
  } = useStatisticalModels({
    maWindows,
    volWindows,
    thresholdHigh,
    thresholdLow,
    limit,
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
        // Compare games analyzed - if different, data has changed
        if (apiData.parameters.games_analyzed !== localData.parameters.games_analyzed) {
          return true;
        }

        // Compare key metrics that would affect the visualization
        // Check moving averages
        if (apiData.moving_averages?.values?.length !== localData.moving_averages?.values?.length) {
          return true;
        }

        // Check volatility indicators
        if (apiData.volatility_indicators?.current_volatility !== localData.volatility_indicators?.current_volatility) {
          return true;
        }

        // Check streak analysis
        if (apiData.streak_analysis?.current_streak !== localData.streak_analysis?.current_streak) {
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