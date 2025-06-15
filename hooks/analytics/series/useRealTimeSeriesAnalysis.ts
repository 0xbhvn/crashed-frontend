'use client';

import { useEffect, useRef, useState } from 'react';
import { useSeriesAnalysis, type SeriesData } from './useSeriesAnalysis';
import { useAnalytics } from '@/context/analytics-context';

interface UseRealTimeSeriesAnalysisProps {
	value: number;
	analyzeBy: 'games' | 'time';
	limit?: number;
	hours?: number;
	sortBy?: 'time' | 'length';
}

export function useRealTimeSeriesAnalysis({
	value,
	analyzeBy,
	limit = 1000,
	hours = 24,
	sortBy = 'time',
}: UseRealTimeSeriesAnalysisProps) {
	// Keep local copy of data to prevent loading states
	const [localData, setLocalData] = useState<SeriesData[]>([]);
	// Keep track of total occurrences (now from API count)
	const [totalOccurrences, setTotalOccurrences] = useState<number>(0);

	// Track the last game we processed
	const lastProcessedGameRef = useRef<string | null>(null);

	// Keep track of when the data was last reloaded
	const lastRefreshTimeRef = useRef<number>(Date.now());

	// Get real-time game updates from the context
	const { latestGame } = useAnalytics();

	// Get data from the API
	const {
		data: apiData,
		count: apiCount,
		isLoading: apiLoading,
		error: apiError,
		fetchData,
	} = useSeriesAnalysis({
		value,
		analyzeBy,
		limit,
		hours,
		sortBy,
	});

	// Initialize local data with API data
	useEffect(() => {
		if (
			apiData &&
			Array.isArray(apiData) &&
			apiData.length > 0 &&
			localData.length === 0
		) {
			setLocalData(apiData);
		}
	}, [apiData, localData]);

	// Update total occurrences from API count
	useEffect(() => {
		if (apiCount !== undefined && apiCount !== null) {
			setTotalOccurrences(apiCount);
		}
	}, [apiCount]);

	// Update local data with API data, preserving UI state
	useEffect(() => {
		if (apiData && localData) {
			// Use a more careful comparison approach that doesn't trigger unnecessary updates
			const hasDataChanged = (() => {
				// First ensure apiData is an array
				if (!Array.isArray(apiData)) {
					// Skip silently, the default return value of null/empty array will be used
					return false;
				}

				// Different lengths mean the data definitely changed
				if (apiData.length !== localData.length) {
					return true;
				}

				// Compare only essential properties that would affect rendering
				// This prevents circle flicker from irrelevant property changes
				for (let i = 0; i < apiData.length; i++) {
					const apiItem = apiData[i];
					const localItem = localData[i];

					// Compare only the properties that would visually affect the chart
					if (
						apiItem.start_game_id !== localItem.start_game_id ||
						apiItem.end_game_id !== localItem.end_game_id ||
						apiItem.length !== localItem.length ||
						apiItem.crash_point !== localItem.crash_point
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
		if (!latestGame) return;

		// Skip if we've already processed this game
		if (lastProcessedGameRef.current === latestGame.gameId) {
			return;
		}

		// Prevent excessive API calls (at most once every 2 seconds)
		const now = Date.now();
		const timeSinceLastRefresh = now - lastRefreshTimeRef.current;

		if (timeSinceLastRefresh < 2000) {
			// Throttle API calls by setting a timeout
			const timeoutMs = 2000 - timeSinceLastRefresh;
			setTimeout(() => {
				fetchData();
				lastRefreshTimeRef.current = Date.now();
				lastProcessedGameRef.current = latestGame.gameId;
			}, timeoutMs);
		} else {
			// Reload immediately if throttle period has passed
			fetchData();
			lastRefreshTimeRef.current = Date.now();
			lastProcessedGameRef.current = latestGame.gameId;
		}
	}, [latestGame, fetchData]);

	return {
		data: Array.isArray(localData) ? localData : [],
		totalOccurrences,
		isLoading:
			apiLoading && (localData.length === 0 || !Array.isArray(localData)), // Only show loading on initial load
		error: apiError,
		refreshData: fetchData,
	};
}
