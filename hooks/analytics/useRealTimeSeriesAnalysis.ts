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
		if (apiData && apiData.length > 0 && localData.length === 0) {
			setLocalData(apiData);
		}
	}, [apiData, localData]);

	// Update local data with API data, preserving UI state
	useEffect(() => {
		if (apiData && localData) {
			// Only update if data has actually changed
			if (JSON.stringify(apiData) !== JSON.stringify(localData)) {
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
		data: localData,
		isLoading: apiLoading && localData.length === 0, // Only show loading on initial load
		error: apiError,
		refreshData: fetchData,
	};
}
