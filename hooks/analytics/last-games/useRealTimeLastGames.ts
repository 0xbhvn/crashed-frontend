'use client';

import { useEffect, useRef, useState } from 'react';
import { useBatchLastGames } from './useLastGames';
import { useAnalytics } from '@/context/analytics-context';
import type { BatchLastGamesData } from '@/utils/analytics-types';

interface UseRealTimeBatchGamesProps {
	values: number[];
}

export function useRealTimeBatchGames({ values }: UseRealTimeBatchGamesProps) {
	// Keep local copy of data to prevent loading states
	const [localData, setLocalData] = useState<BatchLastGamesData | null>(null);

	// Track the last game we processed
	const lastProcessedGameRef = useRef<string | null>(null);

	// Flag to indicate initial data load has happened
	const initialLoadCompletedRef = useRef<boolean>(false);

	// Flag to prevent concurrent refresh requests
	const isRefreshingRef = useRef<boolean>(false);

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
		skipInitialFetch: initialLoadCompletedRef.current, // Skip initial fetch if we've already loaded once
	});

	// Initialize local data with API data
	useEffect(() => {
		if (apiData && !localData) {
			setLocalData(apiData);
			initialLoadCompletedRef.current = true;
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

		// Skip if we're already refreshing (prevents multiple API calls in quick succession)
		if (isRefreshingRef.current) {
			return;
		}

		// Mark that we're refreshing data
		isRefreshingRef.current = true;

		// Fetch updated data
		fetchData();

		// Track that we've processed this game
		lastProcessedGameRef.current = latestGame.gameId;

		// Reset the refreshing flag after a delay to allow the network request to complete
		setTimeout(() => {
			isRefreshingRef.current = false;
		}, 3000);
	}, [latestGame, fetchData]);

	return {
		data: localData,
		isLoading: apiLoading && !localData, // Only show loading on initial load
		error: apiError,
	};
}
