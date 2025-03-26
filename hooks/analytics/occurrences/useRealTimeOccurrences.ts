'use client';

import { useEffect, useRef, useState } from 'react';
import { useOccurrenceAnalysis } from './useOccurrenceAnalysis';
import { useAnalytics } from '@/context/analytics-context';
import type { OccurrencesData } from '@/utils/analytics-types';

interface UseRealTimeOccurrencesProps {
	values: number[];
	analyzeBy: 'games' | 'time';
	limit?: number;
	hours?: number;
}

export function useRealTimeOccurrences({
	values,
	analyzeBy,
	limit = 2000,
	hours = 24,
}: UseRealTimeOccurrencesProps) {
	// Keep local copy of data to prevent loading states
	const [localData, setLocalData] = useState<OccurrencesData | null>(null);

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
	} = useOccurrenceAnalysis({
		values,
		analyzeBy,
		limit,
		hours,
		comparison: true,
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
			// Only update data that has actually changed
			const updatedData = { ...localData };
			let hasChanges = false;

			// Create a set of all keys from both data sets
			const allKeys = new Set([
				...Object.keys(apiData),
				...Object.keys(localData),
			]);

			// Update each key if needed
			for (const key of allKeys) {
				// Skip if key doesn't exist in either dataset
				if (!apiData[key] && !localData[key]) continue;

				// Initialize if needed
				if (!updatedData[key]) {
					updatedData[key] = {};
				}

				// Update current data if it exists and has changed
				if (apiData[key]?.current) {
					const apiCurrent = apiData[key].current;
					const localCurrent = localData[key]?.current;

					// If structures are different or data has changed, update it
					if (
						!localCurrent ||
						JSON.stringify(apiCurrent) !==
							JSON.stringify(localCurrent)
					) {
						updatedData[key].current = apiCurrent;
						hasChanges = true;
					}
				}

				// Update unique data if it exists and has changed
				if (apiData[key]?.unique) {
					const apiUnique = apiData[key].unique;
					const localUnique = localData[key]?.unique;

					// If structures are different or data has changed, update it
					if (
						!localUnique ||
						JSON.stringify(apiUnique) !==
							JSON.stringify(localUnique)
					) {
						updatedData[key].unique = apiUnique;
						hasChanges = true;
					}
				}
			}

			// Update local data only if there are changes
			if (hasChanges) {
				setLocalData(updatedData);
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
		isLoading: apiLoading && !localData, // Only show loading on initial load
		error: apiError,
		refreshData: fetchData,
	};
}
