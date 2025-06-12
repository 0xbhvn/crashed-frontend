'use client';

import { useEffect, useRef, useState } from 'react';
import { usePatternAnalysis } from './usePatternAnalysis';
import { useAnalytics } from '@/context/analytics-context';

interface PatternAnalysisData {
  total_games: number;
  analysis_period: {
    start: string;
    end: string;
  };
  randomness_metrics: {
    entropy: number;
    entropy_ratio: number;
    interpretation: string;
  };
  autocorrelation: {
    correlations: Record<string, number>;
    significant_lags: number[];
    interpretation: string;
  };
  anomalies: {
    anomalous_games: Array<{
      index: number;
      game_id: string;
      crash_point: number;
      z_score: number;
      time: string;
    }>;
    z_score_threshold: number;
    iqr_bounds: {
      lower: number;
      upper: number;
    };
    iqr_anomaly_count: number;
    anomaly_rate: number;
  };
  patterns: {
    peaks: {
      count: number;
      positions: number[];
      average_height: number;
    };
    trend: {
      slope: number;
      direction: string;
    };
    periodicity: {
      dominant_period: number;
      has_cycle: boolean;
    };
    dominant_pattern: string;
  };
  clustering: Record<string, {
    count: number;
    percentage: number;
    range: string;
  }>;
  summary: {
    total_anomalies: number;
    anomaly_rate: number;
    dominant_pattern: string;
    randomness_score: number;
  };
}

interface UseRealTimePatternAnalysisOptions {
  limit?: number;
  anomalyThreshold?: number;
  enabled?: boolean;
}

export function useRealTimePatternAnalysis({
  limit = 1000,
  anomalyThreshold = 3.0,
  enabled = true,
}: UseRealTimePatternAnalysisOptions = {}) {
  // Keep local copy of data to prevent loading states
  const [localData, setLocalData] = useState<PatternAnalysisData | null>(null);

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
  } = usePatternAnalysis({
    limit,
    anomalyThreshold,
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
          apiData.randomness_metrics.entropy !== localData.randomness_metrics.entropy ||
          apiData.summary.total_anomalies !== localData.summary.total_anomalies ||
          apiData.patterns.dominant_pattern !== localData.patterns.dominant_pattern ||
          apiData.anomalies.anomaly_rate !== localData.anomalies.anomaly_rate
        ) {
          return true;
        }

        // Check if anomalous games have changed
        if (apiData.anomalies.anomalous_games.length !== localData.anomalies.anomalous_games.length) {
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