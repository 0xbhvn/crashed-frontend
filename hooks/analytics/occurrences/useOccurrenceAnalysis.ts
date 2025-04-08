'use client';

import { useCallback, useEffect, useState } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type { OccurrencesData } from '@/utils/analytics-types';

interface UseOccurrenceAnalysisProps {
	values: number[];
	analyzeBy: 'games' | 'time';
	limit?: number;
	hours?: number;
	comparison?: boolean;
}

export function useOccurrenceAnalysis({
	values,
	analyzeBy = 'games',
	limit = 2000,
	hours = 24,
	comparison = false,
}: UseOccurrenceAnalysisProps) {
	const [data, setData] = useState<OccurrencesData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			// Determine base endpoints for batch requests
			const minPointsEndpoint =
				'/api/analytics/occurrences/min-crash-points';
			const exactFloorsEndpoint =
				'/api/analytics/occurrences/exact-floors';

			// Add time suffix if analyzing by time
			const minPointsUrl =
				analyzeBy === 'time'
					? `${minPointsEndpoint}/time`
					: minPointsEndpoint;
			const exactFloorsUrl =
				analyzeBy === 'time'
					? `${exactFloorsEndpoint}/time`
					: exactFloorsEndpoint;

			// Set parameters based on analysis type - always request comparison data
			// This ensures we have data regardless of the comparison display setting
			const minPointsParams =
				analyzeBy === 'games'
					? { values, limit, comparison: true }
					: { values, hours, comparison: true };

			const exactFloorsParams =
				analyzeBy === 'games'
					? { values, limit, comparison: true }
					: { values, hours, comparison: true };

			// Prepare headers - only include timezone for time-based queries
			const headers = { ...getApiHeaders() } as Record<string, string>;
			if (analyzeBy === 'time') {
				headers['X-Timezone'] = 'Asia/Kolkata'; // Use the user's timezone or a default
			}

			// Call both APIs simultaneously
			const [minPointsResponse, exactFloorsResponse] = await Promise.all([
				fetch(minPointsUrl, {
					method: 'POST',
					headers,
					body: JSON.stringify(minPointsParams),
				}),
				fetch(exactFloorsUrl, {
					method: 'POST',
					headers,
					body: JSON.stringify(exactFloorsParams),
				}),
			]);

			// Check for non-OK responses
			if (!minPointsResponse.ok) {
				const errorText = await minPointsResponse.text();
				throw new Error(
					`Min points API responded with status: ${minPointsResponse.status} - ${errorText}`
				);
			}

			if (!exactFloorsResponse.ok) {
				const errorText = await exactFloorsResponse.text();
				throw new Error(
					`Exact floors API responded with status: ${exactFloorsResponse.status} - ${errorText}`
				);
			}

			// Parse responses
			const minPointsData = await minPointsResponse.json();
			const exactFloorsData = await exactFloorsResponse.json();

			// Check if data is structured as expected
			if (!minPointsData.data || typeof minPointsData.data !== 'object') {
				throw new Error(
					'Unexpected API structure: min points data is not an object'
				);
			}

			if (
				!exactFloorsData.data ||
				typeof exactFloorsData.data !== 'object'
			) {
				throw new Error(
					'Unexpected API structure: exact floors data is not an object'
				);
			}

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
			const processedData: OccurrencesData = {};

			// Extract the occurrences data from the response - now only using results
			const minPointsOccurrences = minPointsData.data?.results || {};
			const exactFloorsOccurrences = exactFloorsData.data?.results || {};

			// Create a set of all keys from both responses, ensuring we have all requested values
			const allPoints = new Set([
				...Object.keys(minPointsOccurrences),
				...Object.keys(exactFloorsOccurrences),
				...values.map((v) => v.toString()),
			]);

			// Process each crash point value
			for (const rawPoint of allPoints) {
				// Normalize point format (ensure consistent keys with .0 for integers)
				const point = Number.isInteger(Number(rawPoint))
					? `${rawPoint}.0`
					: rawPoint;

				// Create an entry for this point if it doesn't exist
				if (!processedData[point]) {
					processedData[point] = {};
				}

				// Get matching keys for both response formats
				const minPointKey = minPointsOccurrences[rawPoint]
					? rawPoint
					: point;
				const exactFloorKey = exactFloorsOccurrences[rawPoint]
					? rawPoint
					: point;

				// Add min crash point data if available
				if (minPointsOccurrences[minPointKey]) {
					if ('comparison' in minPointsOccurrences[minPointKey]) {
						if (comparison) {
							// Format for comparison display
							processedData[point].current = {
								current_period:
									minPointsOccurrences[minPointKey],
								previous_period:
									minPointsOccurrences[minPointKey]
										.comparison,
								comparison: {
									count_diff:
										minPointsOccurrences[minPointKey]
											.comparison.count_change || 0,
									percentage_diff:
										minPointsOccurrences[minPointKey]
											.comparison.percentage_change || 0,
									count_percent_change:
										minPointsOccurrences[minPointKey]
											.comparison.percentage_change || 0,
								},
							};
						} else {
							// For non-comparison display, just use the current data
							// We're purposely not using the comparison data here
							processedData[point].current = {
								count: minPointsOccurrences[minPointKey].count,
								percentage:
									minPointsOccurrences[minPointKey]
										.percentage,
								total_games:
									minPointsOccurrences[minPointKey]
										.total_games,
								first_game_time:
									minPointsOccurrences[minPointKey]
										.first_game_time,
								last_game_time:
									minPointsOccurrences[minPointKey]
										.last_game_time,
							};
						}
					} else {
						// Direct data with no comparison
						processedData[point].current =
							minPointsOccurrences[minPointKey];
					}
				}

				// Add exact floor data if available
				if (exactFloorsOccurrences[exactFloorKey]) {
					if ('comparison' in exactFloorsOccurrences[exactFloorKey]) {
						if (comparison) {
							// Format for comparison display
							processedData[point].unique = {
								current_period:
									exactFloorsOccurrences[exactFloorKey],
								previous_period:
									exactFloorsOccurrences[exactFloorKey]
										.comparison,
								comparison: {
									count_diff:
										exactFloorsOccurrences[exactFloorKey]
											.comparison.count_change || 0,
									percentage_diff:
										exactFloorsOccurrences[exactFloorKey]
											.comparison.percentage_change || 0,
									count_percent_change:
										exactFloorsOccurrences[exactFloorKey]
											.comparison.percentage_change || 0,
								},
							};
						} else {
							// For non-comparison display, just use the current data
							// We're purposely not using the comparison data here
							processedData[point].unique = {
								count: exactFloorsOccurrences[exactFloorKey]
									.count,
								percentage:
									exactFloorsOccurrences[exactFloorKey]
										.percentage,
								total_games:
									exactFloorsOccurrences[exactFloorKey]
										.total_games,
								first_game_time:
									exactFloorsOccurrences[exactFloorKey]
										.first_game_time,
								last_game_time:
									exactFloorsOccurrences[exactFloorKey]
										.last_game_time,
							};
						}
					} else {
						// Direct data with no comparison
						processedData[point].unique =
							exactFloorsOccurrences[exactFloorKey];
					}
				}
			}

			setData(processedData);
		} catch (err) {
			console.error('API request failed:', err);
			setError(
				err instanceof Error
					? err
					: new Error('Failed to fetch occurrence data')
			);
		} finally {
			setIsLoading(false);
		}
	}, [values, analyzeBy, limit, hours, comparison]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, isLoading, error, fetchData };
}
