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

	// Flag to indicate initial data load has happened
	const initialLoadCompletedRef = useRef<boolean>(false);

	// Flag to prevent concurrent refresh requests
	const isRefreshingRef = useRef<boolean>(false);

	// Track values that are currently being loaded
	const loadingValuesRef = useRef<Set<number>>(new Set());

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
			loadingValuesRef.current.clear(); // Clear loading values once initial data is loaded
		}
	}, [apiData, localData]);

	// Update local data with API data, preserving UI state
	useEffect(() => {
		if (apiData && localData) {
			// Only update data that has actually changed
			const updatedData = { ...localData };
			let hasChanges = false;

			// Check each value and update if it's changed or new
			for (const value of values) {
				// Handle completely new values
				if (apiData[value] && !localData[value]) {
					// For new values, use the complete API data including probability
					updatedData[value] = {
						...apiData[value],
						currentProbability: apiData[value].currentProbability,
						uniqueProbability: apiData[value].uniqueProbability,
					};
					hasChanges = true;
					// Remove from loading values
					loadingValuesRef.current.delete(value);
					continue;
				}

				// Skip if data not available for this value
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
						// Include probability values in the update
						currentProbability: apiData[value].currentProbability,
						uniqueProbability: apiData[value].uniqueProbability,
					};
					hasChanges = true;
					// Remove from loading values
					loadingValuesRef.current.delete(value);
				}
			}

			// Update local data only if there are changes
			if (hasChanges) {
				setLocalData(updatedData);
			}
		}
	}, [apiData, localData, values]);

	// Track values in a ref to prevent unnecessary refreshes
	const prevValuesRef = useRef<number[]>([]);

	// Combination of handling values changes and new games
	useEffect(() => {
		// Only refresh if we received a new game event
		if (!latestGame) return;

		// Skip if we're already refreshing
		if (isRefreshingRef.current) return;

		// If we have initial data, we should refresh
		if (initialLoadCompletedRef.current) {
			isRefreshingRef.current = true;
			fetchData()
				.catch(() => {
					// Error is already handled by the fetchData function
				})
				.finally(() => {
					// Reset the refreshing flag after operation completes
					isRefreshingRef.current = false;
				});
		}
	}, [fetchData, latestGame]);

	// Handle values changes separately
	useEffect(() => {
		// Skip if arrays are identical (same length and values)
		const valuesChanged =
			prevValuesRef.current.length !== values.length ||
			values.some((val, i) => prevValuesRef.current[i] !== val);

		if (!valuesChanged) return;

		// Find new values that were added
		const newValues = values.filter(
			(val) => !prevValuesRef.current.includes(val)
		);

		// Mark new values as loading
		if (newValues.length > 0) {
			// Use for...of instead of forEach (per linter recommendation)
			for (const val of newValues) {
				loadingValuesRef.current.add(val);
			}
		}

		// Update the previous values reference
		prevValuesRef.current = [...values];

		// Skip if we're already refreshing
		if (isRefreshingRef.current) return;

		// If we have initial data, we should refresh
		if (initialLoadCompletedRef.current) {
			isRefreshingRef.current = true;
			fetchData()
				.catch(() => {
					// Error is already handled by the fetchData function
				})
				.finally(() => {
					// Reset the refreshing flag after operation completes
					isRefreshingRef.current = false;
				});
		}
	}, [fetchData, values]);

	// Function to check if a specific value is loading
	const isValueLoading = (value: number): boolean => {
		return loadingValuesRef.current.has(value);
	};

	return {
		data: localData,
		isLoading: apiLoading && !localData, // Only show loading on initial load
		isValueLoading, // Add function to check if a specific value is loading
		error: apiError,
	};
}
