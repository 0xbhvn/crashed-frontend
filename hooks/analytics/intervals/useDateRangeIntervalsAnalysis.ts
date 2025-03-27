import { useCallback, useState, useRef } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type { IntervalData } from '@/utils/analytics-types';

interface UseDateRangeIntervalsAnalysisProps {
	value: number;
	intervalMinutes: 10 | 15 | 30 | 60;
	startDate: string; // Format: YYYY-MM-DD
	endDate: string; // Format: YYYY-MM-DD
}

interface UseDateRangeIntervalsAnalysisResult {
	data: IntervalData[];
	isLoading: boolean;
	error: Error | null;
	fetchData: () => Promise<IntervalData[]>;
}

export function useDateRangeIntervalsAnalysis({
	value,
	intervalMinutes = 10,
	startDate,
	endDate,
}: UseDateRangeIntervalsAnalysisProps): UseDateRangeIntervalsAnalysisResult {
	const [data, setData] = useState<IntervalData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// Track if we're currently fetching data to prevent duplicate requests
	const isFetchingRef = useRef(false);

	const fetchData = useCallback(async (): Promise<IntervalData[]> => {
		// Prevent multiple concurrent fetches
		if (isFetchingRef.current) {
			return data;
		}

		// Validate input parameters
		if (!startDate || !endDate) {
			setError(new Error('Start date and end date are required'));
			return data;
		}

		// Set loading state and start fetching
		setIsLoading(true);
		setError(null);
		isFetchingRef.current = true;

		try {
			// Construct query parameters
			const queryParams = new URLSearchParams({
				interval_minutes: intervalMinutes.toString(),
				start_date: startDate,
				end_date: endDate,
			});

			// Prepare headers with timezone
			const headers = { ...getApiHeaders() } as Record<string, string>;
			headers['X-Timezone'] = 'Asia/Kolkata'; // Use the user's timezone or a default

			// Call the API
			const response = await fetch(
				`/api/analytics/intervals/min-crash-point/${value}/date-range?${queryParams.toString()}`,
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
					`Intervals API responded with status: ${response.status} - ${errorText}`
				);
			}

			// Parse response
			const responseData = await response.json();

			// Check for error status in the response
			if (responseData.status === 'error') {
				throw new Error(
					responseData.message || 'Error in intervals analysis data'
				);
			}

			// Handle API response structure - data is now an object with an 'intervals' array
			let intervalsData: IntervalData[] = [];

			if (
				responseData.data?.intervals &&
				Array.isArray(responseData.data.intervals)
			) {
				intervalsData = responseData.data.intervals;
			} else if (Array.isArray(responseData.data)) {
				// Fallback for old API structure
				intervalsData = responseData.data;
			} else {
				console.warn('API returned non-array data');
			}

			setData(intervalsData);
			return intervalsData;
		} catch (err) {
			console.error('API request failed:', err);
			const errorObject =
				err instanceof Error
					? err
					: new Error('Failed to fetch intervals analysis data');

			setError(errorObject);
			// Reset data on error to prevent stale data display
			setData([]);
			throw errorObject;
		} finally {
			setIsLoading(false);
			isFetchingRef.current = false;
		}
	}, [value, intervalMinutes, startDate, endDate, data]);

	return { data, isLoading, error, fetchData };
}
