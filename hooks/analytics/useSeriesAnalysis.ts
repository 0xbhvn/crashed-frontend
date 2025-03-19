'use client';

import { useCallback, useEffect, useState } from 'react';
import { getApiHeaders } from '@/lib/api-config';

export interface SeriesData {
	start_game_id: string;
	end_game_id: string;
	start_time: string;
	end_time: string;
	length: number;
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

			setData(responseData.data || []);
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
