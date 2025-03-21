import { useEffect, useRef, useState } from 'react';
import { useIntervalsAnalysis } from './useIntervalsAnalysis';
import { useAnalytics } from '@/context/analytics-context';
import type { IntervalData } from '@/utils/analytics-types';

interface UseRealTimeIntervalsAnalysisProps {
	value: number;
	intervalMinutes: 10 | 15 | 30 | 60;
	hours?: number;
}

export function useRealTimeIntervalsAnalysis({
	value,
	intervalMinutes = 10,
	hours = 24,
}: UseRealTimeIntervalsAnalysisProps) {
	// Keep local copy of data to prevent loading states
	const [localData, setLocalData] = useState<IntervalData[]>([]);

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
	} = useIntervalsAnalysis({
		value,
		intervalMinutes,
		hours,
	});

	// Initialize local data with API data
	useEffect(() => {
		if (apiData && apiData.length > 0 && localData.length === 0) {
			setLocalData(apiData);
		}
	}, [apiData, localData]);

	// Update local data with API data, preserving UI state
	useEffect(() => {
		if (apiData && localData.length > 0) {
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
		isLoading: apiLoading && localData.length === 0,
		error: apiError,
		refreshData: fetchData,
	};
}
