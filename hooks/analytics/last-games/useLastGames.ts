'use client';

import { useCallback, useEffect, useState } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type {
	BatchLastGamesData,
	ApiGameResponse,
} from '@/utils/analytics-types';

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
		setIsLoading(true);
		setError(null);
		try {
			// Call both APIs and process the responses
			const minPointsResponse = await fetch(
				'/api/analytics/last-games/min-crash-points',
				{
					method: 'POST',
					headers: getApiHeaders(),
					body: JSON.stringify({ values }),
				}
			);

			const exactFloorsResponse = await fetch(
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
				const minKey = value.toString();
				const exactKey = value.toString();

				// Try possible key formats
				const minKeysToTry = [minKey, `${value}.0`];
				const exactKeysToTry = [exactKey, `${value}.0`];

				let minPointEntry: ApiGameResponse | undefined;
				let exactFloorEntry: ApiGameResponse | undefined;

				// Find the correct key in min points data
				for (const key of minKeysToTry) {
					if (minPointsData.data[key]) {
						minPointEntry = minPointsData.data[key];
						break;
					}
				}

				// Find the correct key in exact floors data
				for (const key of exactKeysToTry) {
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
				};
			}

			setData(processedData);
		} catch (err) {
			console.error('Error fetching batch data:', err);
			setError(
				err instanceof Error
					? err
					: new Error('Failed to fetch batch data')
			);
		} finally {
			setIsLoading(false);
		}
	}, [values]);

	useEffect(() => {
		if (!skipInitialFetch) {
			fetchData();
		}
	}, [fetchData, skipInitialFetch]);

	return { data, isLoading, error, fetchData };
}
