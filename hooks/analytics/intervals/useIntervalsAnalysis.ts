import { useCallback, useEffect, useState } from 'react';
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

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
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

			setData(responseData.data || []);
		} catch (err) {
			console.error('Error fetching intervals analysis data:', err);
			setError(
				err instanceof Error
					? err
					: new Error('Failed to fetch intervals analysis data')
			);
		} finally {
			setIsLoading(false);
		}
	}, [value, intervalMinutes, hours]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, isLoading, error, fetchData };
}
