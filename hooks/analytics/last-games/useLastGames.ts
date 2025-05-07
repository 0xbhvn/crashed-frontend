'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type {
	BatchLastGamesData,
	ApiGameResponse,
} from '@/utils/analytics-types';

// Helper function for retry mechanism with exponential backoff
async function fetchWithRetry(
	url: string,
	options: RequestInit,
	maxRetries = 3
) {
	let retries = 0;

	while (retries < maxRetries) {
		try {
			const response = await fetch(url, options);

			// If successful, return the response
			if (response.ok) {
				return response;
			}

			// If we get a 504 Gateway Timeout, retry
			if (response.status === 504) {
				retries++;
				if (retries >= maxRetries) {
					return response; // Return the failing response if max retries reached
				}

				// Exponential backoff: 1s, 2s, 4s...
				const delay = 2 ** (retries - 1) * 1000;
				console.log(
					`Gateway timeout (504). Retrying in ${delay}ms... (${retries}/${maxRetries})`
				);
				await new Promise((resolve) => setTimeout(resolve, delay));
				continue;
			}

			// For other error statuses, don't retry
			return response;
		} catch (error) {
			// Network errors get retried
			retries++;
			if (retries >= maxRetries) {
				throw error;
			}

			const delay = 2 ** (retries - 1) * 1000;
			console.log(
				`Network error. Retrying in ${delay}ms... (${retries}/${maxRetries})`
			);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	throw new Error('Max retries reached');
}

interface UseBatchLastGamesProps {
	values: number[];
	type?: 'current' | 'unique';
	skipInitialFetch?: boolean;
}

export function useBatchLastGames({
	values,
	skipInitialFetch = false,
}: Omit<UseBatchLastGamesProps, 'type'>) {
	const [data, setData] = useState<BatchLastGamesData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = useCallback(async () => {
		// Prevent multiple concurrent fetches
		if (isLoading) {
			return;
		}

		setIsLoading(true);
		setError(null);
		try {
			// Call both APIs with retry mechanism
			const minPointsResponse = await fetchWithRetry(
				'/api/analytics/last-games/min-crash-points',
				{
					method: 'POST',
					headers: getApiHeaders(),
					body: JSON.stringify({ values }),
				}
			);

			const exactFloorsResponse = await fetchWithRetry(
				'/api/analytics/last-games/exact-floors',
				{
					method: 'POST',
					headers: getApiHeaders(),
					body: JSON.stringify({ values }),
				}
			);

			// Check for non-OK responses
			if (!minPointsResponse.ok) {
				const errorText = await minPointsResponse.text();
				if (errorText.includes('datetime is not JSON serializable')) {
					throw new Error(
						'Server error: Date formatting issue. Please try again later.'
					);
				}
				throw new Error(
					`Min points API responded with status: ${minPointsResponse.status}`
				);
			}

			if (!exactFloorsResponse.ok) {
				const errorText = await exactFloorsResponse.text();
				if (errorText.includes('datetime is not JSON serializable')) {
					throw new Error(
						'Server error: Date formatting issue. Please try again later.'
					);
				}
				throw new Error(
					`Exact floors API responded with status: ${exactFloorsResponse.status}`
				);
			}

			const minPointsData = await minPointsResponse.json();
			const exactFloorsData = await exactFloorsResponse.json();

			// Check for error status in the responses
			if (minPointsData.status === 'error') {
				throw new Error(
					minPointsData.message || 'Error in min points data'
				);
			}

			if (exactFloorsData.status === 'error') {
				throw new Error(
					exactFloorsData.message || 'Error in exact floors data'
				);
			}

			// Process the API responses into the expected format
			const processedData: BatchLastGamesData = {};

			for (const value of values) {
				// API might use different format for keys (with .0 suffix for integers)
				const valueStr = value.toString();
				const valueWithDecimal = value.toString().includes('.')
					? valueStr
					: `${value}.0`;
				const valueWithoutDecimal = valueStr.replace('.0', '');

				// Try all possible key formats
				const keysToTry = [
					valueStr,
					valueWithDecimal,
					valueWithoutDecimal,
				];

				let minPointEntry: ApiGameResponse | undefined;
				let exactFloorEntry: ApiGameResponse | undefined;

				// Find the correct key in min points data
				for (const key of keysToTry) {
					if (minPointsData.data[key]) {
						minPointEntry = minPointsData.data[key];
						break;
					}
				}

				// Find the correct key in exact floors data
				for (const key of keysToTry) {
					if (exactFloorsData.data[key]) {
						exactFloorEntry = exactFloorsData.data[key];
						break;
					}
				}

				// Store both game data sets separately
				processedData[value] = {
					current: minPointEntry?.games_since ?? 0,
					unique: exactFloorEntry?.games_since ?? 0,
					currentGame: minPointEntry?.game || null,
					uniqueGame: exactFloorEntry?.game || null,
					currentProbability: minPointEntry?.probability || null,
					uniqueProbability: exactFloorEntry?.probability || null,
				};
			}

			setData(processedData);
		} catch (err) {
			console.error('API request failed:', err);
			setError(
				err instanceof Error
					? err
					: new Error('Failed to fetch batch data')
			);
		} finally {
			setIsLoading(false);
		}
	}, [values, isLoading]);

	// Compare previous values to prevent unnecessary fetches
	const prevValuesRef = useRef<number[]>([]);

	useEffect(() => {
		// Skip if initial fetch is disabled
		if (skipInitialFetch) return;

		// Check if values array has actually changed
		const valuesChanged =
			prevValuesRef.current.length !== values.length ||
			values.some((val, i) => prevValuesRef.current[i] !== val);

		// Only fetch on first render or when values change
		if (prevValuesRef.current.length === 0 || valuesChanged) {
			prevValuesRef.current = [...values];
			fetchData();
		}
	}, [fetchData, skipInitialFetch, values]);

	return { data, isLoading, error, fetchData };
}
