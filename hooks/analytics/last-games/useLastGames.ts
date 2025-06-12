'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type { BatchLastGamesData } from '@/utils/analytics-types';

const CLIENT_FETCH_TIMEOUT_REASON =
	'Client-side fetch timed out after 10 seconds';

// Helper function for retry mechanism with exponential backoff
async function fetchWithRetry(
	url: string,
	options: RequestInit,
	maxRetries = 3
) {
	let retries = 0;
	let lastError: Error | null = null;

	while (retries < maxRetries) {
		try {
			// Always add a timeout to prevent hanging requests
			const controller = new AbortController();
			const timeoutId = setTimeout(
				() => controller.abort(CLIENT_FETCH_TIMEOUT_REASON),
				10000
			);

			const fetchOptions = {
				...options,
				signal: controller.signal,
			};

			try {
				const response = await fetch(url, fetchOptions);
				clearTimeout(timeoutId);
				return response;
			} catch (fetchError) {
				clearTimeout(timeoutId);
				// Add more context to the error
				if (fetchError instanceof Error) {
					if (fetchError.name === 'AbortError') {
						fetchError.message = `Request timed out after 10 seconds: ${url}`;
					}
				}
				throw fetchError; // Re-throw to be caught by the outer try/catch
			}
		} catch (error) {
			// Create a more descriptive error
			if (error instanceof Error) {
				// Check for specific error types
				if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
					lastError = new Error(`Network request failed: ${url} - Check if the server is running`);
				} else if (error.name === 'AbortError') {
					lastError = new Error(`Request timed out after 10 seconds: ${url}`);
				} else {
					lastError = error;
				}
			} else {
				lastError = new Error(`Unknown error occurred while fetching: ${url} - Error type: ${typeof error}`);
			}

			let causeMessage = '';
			if (lastError.cause) {
				causeMessage = ` Cause: ${
					lastError.cause instanceof Error
						? lastError.cause.message
						: String(lastError.cause)
				}`;
			}

			console.error(
				`Network error (attempt ${retries + 1}/${maxRetries}): Name: ${
					lastError.name
				}, Message: ${lastError.message}.${causeMessage} URL: ${url}`,
				{
					error: lastError,
					stack: lastError.stack,
					cause: lastError.cause
				}
			);

			retries++;
			if (retries >= maxRetries) {
				const enhancedError = new Error(
					`Failed to fetch after ${maxRetries} attempts: ${lastError.message} (${url})`
				) as Error & { cause?: unknown };
				if (lastError.stack) {
					enhancedError.stack = lastError.stack;
				}
				if (lastError.cause) {
					enhancedError.cause = lastError.cause;
				}
				throw enhancedError;
			}

			const delay = 2 ** (retries - 1) * 1000;
			console.log(
				`Network error. Retrying in ${delay}ms... (${retries}/${maxRetries})`
			);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	throw lastError || new Error('Max retries reached with unknown error');
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
	
	// Use a ref to track loading state for preventing concurrent fetches
	const isLoadingRef = useRef(false);

	const fetchData = useCallback(async () => {
		// Prevent multiple concurrent fetches
		if (isLoadingRef.current) {
			return;
		}
		isLoadingRef.current = true;

		setIsLoading(true);
		setError(null);
		try {
			// Try to fetch from both APIs concurrently
			const [minPointsResult, exactFloorsResult] =
				await Promise.allSettled([
					fetchWithRetry(
						'/api/analytics/last-games/min-crash-points',
						{
							method: 'POST',
							headers: getApiHeaders(),
							body: JSON.stringify({ values }),
						}
					),
					fetchWithRetry('/api/analytics/last-games/exact-floors', {
						method: 'POST',
						headers: getApiHeaders(),
						body: JSON.stringify({ values }),
					}),
				]);

			// Process responses
			let minPointsResponse = null;
			if (minPointsResult.status === 'fulfilled') {
				minPointsResponse = minPointsResult.value;
			} else {
				console.error(
					'Min crash points API fetch failed:',
					minPointsResult.reason
				);
			}

			let exactFloorsResponse = null;
			if (exactFloorsResult.status === 'fulfilled') {
				exactFloorsResponse = exactFloorsResult.value;
			} else {
				console.error(
					'Exact floors API fetch failed:',
					exactFloorsResult.reason
				);
			}

			// If both APIs failed, throw an error
			if (!minPointsResponse && !exactFloorsResponse) {
				throw new Error(
					'Both API requests failed. Please check your network connection and try again.'
				);
			}

			// Process available responses
			let minPointsData = null;
			let exactFloorsData = null;

			// Check and process min points response
			if (minPointsResponse?.ok) {
				try {
					minPointsData = await minPointsResponse.json();
					if (minPointsData?.status === 'error') {
						console.error(
							'Min points API returned error status:',
							minPointsData.message
						);
					}
				} catch {
					console.error('Error parsing min points JSON');
				}
			} else if (minPointsResponse) {
				try {
					const errorText = await minPointsResponse.text();
					console.error(
						`Min points API responded with status: ${minPointsResponse.status}`,
						errorText
					);
				} catch {
					console.error(
						`Min points API responded with status: ${minPointsResponse.status}`
					);
				}
			}

			// Check and process exact floors response
			if (exactFloorsResponse?.ok) {
				try {
					exactFloorsData = await exactFloorsResponse.json();
					if (exactFloorsData?.status === 'error') {
						console.error(
							'Exact floors API returned error status:',
							exactFloorsData.message
						);
					}
				} catch {
					console.error('Error parsing exact floors JSON');
				}
			} else if (exactFloorsResponse) {
				try {
					const errorText = await exactFloorsResponse.text();
					console.error(
						`Exact floors API responded with status: ${exactFloorsResponse.status}`,
						errorText
					);
				} catch {
					console.error(
						`Exact floors API responded with status: ${exactFloorsResponse.status}`
					);
				}
			}

			// If we don't have any valid data at this point, throw an error
			if (
				(!minPointsData || minPointsData?.status === 'error') &&
				(!exactFloorsData || exactFloorsData?.status === 'error')
			) {
				// Check if the errors were due to client-side timeouts specifically
				let timeoutError = false;
				if (
					minPointsResult.status === 'rejected' &&
					minPointsResult.reason instanceof Error &&
					minPointsResult.reason.message.includes(
						CLIENT_FETCH_TIMEOUT_REASON
					)
				) {
					timeoutError = true;
				}
				if (
					exactFloorsResult.status === 'rejected' &&
					exactFloorsResult.reason instanceof Error &&
					exactFloorsResult.reason.message.includes(
						CLIENT_FETCH_TIMEOUT_REASON
					)
				) {
					timeoutError = true;
				}

				if (timeoutError) {
					throw new Error(
						'API request timed out. Please check your network or simplify your request.'
					);
				}
				throw new Error('Failed to fetch valid data from either API.');
			}

			// Process the API responses into the expected format - optimized for performance
			const processedData: BatchLastGamesData = {};

			// Pre-process the data maps for faster lookups
			const minPointsMap = new Map();
			const exactFloorsMap = new Map();

			// Create efficient lookup maps once instead of repeated lookups
			if (minPointsData?.data) {
				for (const [key, value] of Object.entries(minPointsData.data)) {
					const cleanKey = Number.parseFloat(key);
					minPointsMap.set(cleanKey, value);
					minPointsMap.set(key, value);
				}
			}

			if (exactFloorsData?.data) {
				for (const [key, value] of Object.entries(
					exactFloorsData.data
				)) {
					const cleanKey = Number.parseFloat(key);
					exactFloorsMap.set(cleanKey, value);
					exactFloorsMap.set(key, value);
				}
			}

			// Now process values with the efficient maps
			for (const value of values) {
				// Try exact match first, then numeric match
				const minPointEntry =
					minPointsMap.get(value) ||
					minPointsMap.get(value.toString());
				const exactFloorEntry =
					exactFloorsMap.get(value) ||
					exactFloorsMap.get(value.toString());

				// Store both game data sets separately, with fallbacks for missing data
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
			isLoadingRef.current = false;
		}
	}, [values]);

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
