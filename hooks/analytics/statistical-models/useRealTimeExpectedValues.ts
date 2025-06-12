'use client';

import { useEffect, useRef, useState } from 'react';
import { useExpectedValues } from './useExpectedValues';
import { useAnalytics } from '@/context/analytics-context';

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

interface UseRealTimeExpectedValuesOptions {
  targets?: number[];
  limit?: number;
  enabled?: boolean;
}

export function useRealTimeExpectedValues({
  targets = [1.5, 2, 3, 5, 10, 20, 50, 100],
  limit = 10000,
  enabled = true,
}: UseRealTimeExpectedValuesOptions = {}) {
  // Keep local copy of data to prevent loading states
  const [localData, setLocalData] = useState<ExpectedValuesData | null>(null);

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
  } = useExpectedValues({
    targets,
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
        // Compare total games - if different, data has changed
        if (apiData.total_games !== localData.total_games) {
          return true;
        }

        // Compare optimal targets
        const apiOptimal = apiData.optimal_targets;
        const localOptimal = localData.optimal_targets;
        
        if (
          apiOptimal.max_expected_value.target !== localOptimal.max_expected_value.target ||
          apiOptimal.max_kelly_criterion.target !== localOptimal.max_kelly_criterion.target ||
          apiOptimal.best_risk_adjusted.target !== localOptimal.best_risk_adjusted.target
        ) {
          return true;
        }

        // Compare key target analysis values
        const targetKeys = Object.keys(apiData.target_analysis);
        for (const key of targetKeys) {
          const apiTarget = apiData.target_analysis[key];
          const localTarget = localData.target_analysis[key];

          if (!localTarget) return true;

          if (
            apiTarget.expected_value !== localTarget.expected_value ||
            apiTarget.empirical_probability !== localTarget.empirical_probability ||
            apiTarget.kelly_criterion !== localTarget.kelly_criterion
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