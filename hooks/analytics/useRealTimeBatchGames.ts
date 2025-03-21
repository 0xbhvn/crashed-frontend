'use client';

import { useEffect, useRef, useState } from 'react';
import { useBatchLastGames } from './useBatchLastGames';
import { useAnalytics } from '@/context/analytics-context';
import type { BatchLastGamesData } from '../../utils/analytics-types';

interface UseRealTimeBatchGamesProps {
	values: number[];
}

export function useRealTimeBatchGames({ values }: UseRealTimeBatchGamesProps) {
	// Keep local copy of data to prevent loading states
	const [localData, setLocalData] = useState<BatchLastGamesData | null>(null);

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
	} = useBatchLastGames({
		values,
	});

	// Initialize local data with API data
	useEffect(() => {
		if (apiData && !localData) {
			console.log('⭐ Initial data loaded from API');
			setLocalData(apiData);
		}
	}, [apiData, localData]);

	// Update local data with API data, preserving UI state
	useEffect(() => {
		if (apiData && localData) {
			// Only update data that has actually changed
			const updatedData = { ...localData };
			let hasChanges = false;

			// Check each value and update if it's changed
			for (const value of values) {
				if (!apiData[value] || !localData[value]) continue;

				const apiCurrent = apiData[value].current;
				const apiUnique = apiData[value].unique;
				const localCurrent = localData[value].current;
				const localUnique = localData[value].unique;

				// Only update if values have changed
				if (apiCurrent !== localCurrent || apiUnique !== localUnique) {
					updatedData[value] = {
						...localData[value], // Keep other properties
						current: apiCurrent,
						unique: apiUnique,
						currentGame:
							apiData[value].currentGame ||
							localData[value].currentGame,
						uniqueGame:
							apiData[value].uniqueGame ||
							localData[value].uniqueGame,
					};
					hasChanges = true;
				}
			}

			// Update local data only if there are changes
			if (hasChanges) {
				console.log('📊 Silently updating data with API changes');
				setLocalData(updatedData);
			}
		}
	}, [apiData, localData, values]);

	// Silently reload data when a new game arrives
	useEffect(() => {
		if (!latestGame) return;

		// Skip if we've already processed this game
		if (lastProcessedGameRef.current === latestGame.gameId) {
			return;
		}

		// Only log when developer tools are open
		if (typeof window !== 'undefined' && window.console && console.debug) {
			console.debug(`Silent data refresh for game ${latestGame.gameId}`);
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
	};
}
