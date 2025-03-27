import { useCallback, useEffect, useState, useRef } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type { IntervalData } from '@/utils/analytics-types';

interface UseIntervalsAnalysisProps {
	value: number;
	intervalMinutes: 10 | 15 | 30 | 60;
	hours?: number;
}

export function useIntervalsAnalysis({
	value,
	intervalMinutes = 10,
	hours = 24,
}: UseIntervalsAnalysisProps) {
	const [data, setData] = useState<IntervalData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// Track if we're currently fetching data to prevent duplicate requests
	const isFetchingRef = useRef(false);

	// Track last parameters used for fetch to prevent unnecessary rerenders
	const lastParamsRef = useRef({ value: 0, intervalMinutes: 0, hours: 0 });

	const fetchData = useCallback(async () => {
		// Prevent multiple concurrent fetches of the same data
		if (isFetchingRef.current) return;

		// Compare with last parameters to avoid unnecessary fetches
		const currentParams = { value, intervalMinutes, hours };
		const lastParams = lastParamsRef.current;

		// If parameters haven't changed and we already have data, don't fetch again
		if (
			data.length > 0 &&
			lastParams.value === currentParams.value &&
			lastParams.intervalMinutes === currentParams.intervalMinutes &&
			lastParams.hours === currentParams.hours
		) {
			return;
		}

		// Update last params reference
		lastParamsRef.current = currentParams;

		// Set loading state and start fetching
		setIsLoading(true);
		setError(null);
		isFetchingRef.current = true;

		try {
			// Construct the API URL with query parameters
			const queryParams = new URLSearchParams({
				interval_minutes: intervalMinutes.toString(),
				hours: hours.toString(),
			});

			// Prepare headers with timezone
			const headers = { ...getApiHeaders() } as Record<string, string>;
			headers['X-Timezone'] = 'Asia/Kolkata'; // Use the user's timezone or a default

			// Call the API
			const response = await fetch(
				`/api/analytics/intervals/min-crash-point/${value}?${queryParams.toString()}`,
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

			// Handle new API response structure - data is now an object with an 'intervals' array
			if (
				responseData.data?.intervals &&
				Array.isArray(responseData.data.intervals)
			) {
				setData(responseData.data.intervals);
			} else if (Array.isArray(responseData.data)) {
				// Fallback for old API structure
				setData(responseData.data);
			} else {
				console.warn('API returned non-array data');
				setData([]);
			}
		} catch (err) {
			console.error('API request failed:', err);
			setError(
				err instanceof Error
					? err
					: new Error('Failed to fetch intervals analysis data')
			);
			// Reset data on error to prevent stale data display
			setData([]);
		} finally {
			setIsLoading(false);
			isFetchingRef.current = false;
		}
	}, [value, intervalMinutes, hours, data.length]);

	// Fetch data on mount and when dependencies change
	useEffect(() => {
		// Clear any existing data before fetching to avoid stale data
		setData([]);
		setIsLoading(true);

		// Add a small timeout to ensure the component is ready
		const timer = setTimeout(() => {
			fetchData();
		}, 100);

		return () => {
			clearTimeout(timer);
		};
	}, [fetchData]);

	return { data, isLoading, error, fetchData };
}
