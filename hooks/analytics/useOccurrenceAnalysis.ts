'use client';

import { useCallback, useEffect, useState } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type {
	OccurrencesData,
	OccurrenceData,
	OccurrenceComparisonData,
} from '../../utils/analytics-types';

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
			// Determine base endpoints
			const minPointsBase = '/api/analytics/occurrences/min-crash-points';
			const exactFloorsBase = '/api/analytics/occurrences/exact-floors';

			// Add time suffix if analyzing by time
			const minPointsEndpoint =
				analyzeBy === 'games' ? minPointsBase : `${minPointsBase}/time`;
			const exactFloorsEndpoint =
				analyzeBy === 'games'
					? exactFloorsBase
					: `${exactFloorsBase}/time`;

			// Set parameters based on analysis type
			const params =
				analyzeBy === 'games'
					? { values, limit, comparison }
					: { values, hours, comparison };

			// Prepare headers - only include timezone for time-based queries
			const headers = { ...getApiHeaders() } as Record<string, string>;
			if (analyzeBy === 'time') {
				headers['X-Timezone'] = 'Asia/Kolkata'; // Use the user's timezone or a default
			}

			// Call both APIs simultaneously
			const [minPointsResponse, exactFloorsResponse] = await Promise.all([
				fetch(minPointsEndpoint, {
					method: 'POST',
					headers,
					body: JSON.stringify(params),
				}),
				fetch(exactFloorsEndpoint, {
					method: 'POST',
					headers,
					body: JSON.stringify(params),
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

			// Normalize all keys to be consistent
			const normalizeKeys = (
				data: Record<string, OccurrenceData | OccurrenceComparisonData>
			): Record<string, OccurrenceData | OccurrenceComparisonData> => {
				const result: Record<
					string,
					OccurrenceData | OccurrenceComparisonData
				> = {};
				// Convert keys from the API response to match our format
				for (const key of Object.keys(data || {})) {
					// Strip any .0 suffix for consistency
					const numericKey = Number.parseFloat(key).toString();
					// Store with both original format and with decimal point for UI access
					const normalizedKey = Number.isInteger(
						Number.parseFloat(key)
					)
						? `${numericKey}.0`
						: numericKey;
					result[normalizedKey] = data[key];
				}
				return result;
			};

			// Normalize both data sets
			const normalizedMinPoints = normalizeKeys(minPointsData.data || {});
			const normalizedExactFloors = normalizeKeys(
				exactFloorsData.data || {}
			);

			// Create a set of all keys from both normalized responses
			const allKeys = new Set([
				...Object.keys(normalizedMinPoints),
				...Object.keys(normalizedExactFloors),
			]);

			// Process each key
			for (const key of allKeys) {
				processedData[key] = {
					current: normalizedMinPoints[key],
					unique: normalizedExactFloors[key],
				};
			}

			setData(processedData);
		} catch (err) {
			console.error('Error fetching occurrence data:', err);
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
