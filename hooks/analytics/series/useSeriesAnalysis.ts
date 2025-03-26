'use client';

import { useCallback, useEffect, useState } from 'react';
import { getApiHeaders } from '@/lib/api-config';

export interface SeriesData {
	start_game_id: string;
	end_game_id: string;
	start_time: string;
	end_time: string;
	length: number;
	follow_streak?: {
		count: number;
		games: {
			game_id: string;
			crash_point: number;
			time: string;
		}[];
	};
}

export interface SeriesAnalysisResponse {
	status: 'success' | 'error';
	data: SeriesData[];
	message?: string;
}

interface UseSeriesAnalysisProps {
	value: number;
	analyzeBy: 'games' | 'time';
	limit?: number;
	hours?: number;
	sortBy?: 'time' | 'length';
}

export function useSeriesAnalysis({
	value,
	analyzeBy = 'games',
	limit = 1000,
	hours = 24,
	sortBy = 'time',
}: UseSeriesAnalysisProps) {
	const [data, setData] = useState<SeriesData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			// Determine endpoint based on analysis type
			const baseEndpoint = `/api/analytics/series/without-min-crash-point/${value}`;
			const endpoint =
				analyzeBy === 'games' ? baseEndpoint : `${baseEndpoint}/time`;

			// Set query parameters based on analysis type
			const queryParams = new URLSearchParams();
			if (analyzeBy === 'games') {
				queryParams.append('limit', limit.toString());
			} else {
				queryParams.append('hours', hours.toString());
			}
			queryParams.append('sort_by', sortBy);

			// Prepare headers - only include timezone for time-based queries
			const headers = { ...getApiHeaders() } as Record<string, string>;
			if (analyzeBy === 'time') {
				headers['X-Timezone'] = 'Asia/Kolkata'; // Use the user's timezone or a default
			}

			// Call the API
			const response = await fetch(
				`${endpoint}?${queryParams.toString()}`,
				{
					method: 'GET',
					headers,
					cache: 'no-store',
				}
			);

			// Check for non-OK responses
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Series API responded with status: ${response.status} - ${errorText}`
				);
			}

			// Parse response
			const responseData: SeriesAnalysisResponse = await response.json();

			// Check for error status in the response
			if (responseData.status === 'error') {
				throw new Error(
					responseData.message || 'Error in series analysis data'
				);
			}

			// Verify data structure and handle potential changes in API response
			if (responseData.data) {
				// Check if it's an array as expected
				if (Array.isArray(responseData.data)) {
					setData(responseData.data);
				} else {
					console.warn(
						'API response structure changed: responseData.data is now',
						typeof responseData.data,
						'- Attempting to adapt...'
					);
					// If the data structure has changed, try to adapt (if object with nested data)
					if (
						typeof responseData.data === 'object' &&
						responseData.data !== null
					) {
						// Look for potential array fields within the data object
						const potentialArrayFields = Object.values(
							responseData.data
						).filter((value) => Array.isArray(value));
						if (
							potentialArrayFields.length > 0 &&
							Array.isArray(potentialArrayFields[0])
						) {
							console.log(
								'Found alternative data array, using it instead'
							);
							setData(potentialArrayFields[0] as SeriesData[]);
						} else {
							// Set empty array if we can't find suitable data
							setData([]);
						}
					} else {
						// Set empty array as fallback
						setData([]);
					}
				}
			} else {
				// Set empty array if data is missing
				setData([]);
			}
		} catch (err) {
			console.error('Error fetching series analysis data:', err);
			setError(
				err instanceof Error
					? err
					: new Error('Failed to fetch series analysis data')
			);
		} finally {
			setIsLoading(false);
		}
	}, [value, analyzeBy, limit, hours, sortBy]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, isLoading, error, fetchData };
}
