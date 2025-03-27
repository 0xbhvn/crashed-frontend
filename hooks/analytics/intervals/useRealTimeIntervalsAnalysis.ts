import { useCallback, useEffect, useState, useRef } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type { IntervalData } from '@/utils/analytics-types';
import { useAnalytics } from '@/context/analytics-context';

interface UseRealTimeIntervalsAnalysisProps {
	value: number;
	intervalMinutes: 10 | 15 | 30 | 60;
	hours?: number;
}

export function useRealTimeIntervalsAnalysis({
	value,
	intervalMinutes = 10,
	hours = 24,
}: UseRealTimeIntervalsAnalysisProps) {
	const [data, setData] = useState<IntervalData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// Track if we're currently fetching data to prevent duplicate requests
	const isFetchingRef = useRef(false);
	const isMountedRef = useRef(true);

	// Get real-time game updates from the context
	const { latestGame } = useAnalytics();

	// Keep track of the last processed game to avoid duplicates
	const lastProcessedGameRef = useRef<string | null>(null);

	const fetchData = useCallback(async () => {
		if (isFetchingRef.current || !isMountedRef.current) return;

		isFetchingRef.current = true;
		setIsLoading(data.length === 0); // Only show loading on initial fetch

		try {
			const queryParams = new URLSearchParams({
				interval_minutes: intervalMinutes.toString(),
				hours: hours.toString(),
			});

			const headers = { ...getApiHeaders() } as Record<string, string>;
			headers['X-Timezone'] = 'Asia/Kolkata';

			const response = await fetch(
				`/api/analytics/intervals/min-crash-point/${value}?${queryParams.toString()}`,
				{
					method: 'GET',
					headers,
					cache: 'no-store',
				}
			);

			if (!response.ok) {
				throw new Error(
					`API responded with status: ${response.status}`
				);
			}

			const responseData = await response.json();

			if (responseData.status === 'error') {
				throw new Error(
					responseData.message || 'Error in intervals analysis data'
				);
			}

			if (
				responseData.data?.intervals &&
				Array.isArray(responseData.data.intervals)
			) {
				if (isMountedRef.current) {
					setData(responseData.data.intervals);
				}
			}
		} catch (err) {
			console.error('API request failed:', err);
			if (isMountedRef.current) {
				setError(
					err instanceof Error
						? err
						: new Error('Failed to fetch data')
				);
			}
		} finally {
			if (isMountedRef.current) {
				setIsLoading(false);
				isFetchingRef.current = false;
			}
		}
	}, [value, intervalMinutes, hours, data.length]);

	// Function to update a specific interval's data
	const updateInterval = useCallback(
		(gameTime: string, crashPoint: number) => {
			setData((prevData) => {
				// Find the interval that contains this game time (using interval_start)
				const intervalIndex = prevData.findIndex((interval) => {
					const gameDate = new Date(gameTime);
					const intervalStart = new Date(interval.interval_start);
					const intervalEnd = new Date(interval.interval_end);
					return gameDate >= intervalStart && gameDate < intervalEnd;
				});

				if (intervalIndex === -1) return prevData;

				// Create a new array with the updated interval
				const newData = [...prevData];
				const interval = { ...newData[intervalIndex] };

				// Update the interval's statistics
				interval.total_games++;
				if (crashPoint >= value) {
					interval.count++;
				}
				interval.percentage =
					(interval.count / interval.total_games) * 100;

				newData[intervalIndex] = interval;
				return newData;
			});
		},
		[value]
	);

	// Initial data load
	useEffect(() => {
		isMountedRef.current = true;
		fetchData();

		return () => {
			isMountedRef.current = false;
		};
	}, [fetchData]);

	// Handle real-time updates
	useEffect(() => {
		if (!latestGame || !isMountedRef.current) return;

		// Skip if we've already processed this game
		if (lastProcessedGameRef.current === latestGame.gameId) return;

		// Update the last processed game
		lastProcessedGameRef.current = latestGame.gameId;

		// Update the specific interval that contains this game
		updateInterval(latestGame.beginTime, latestGame.crashPoint);
	}, [latestGame, updateInterval]);

	const refreshData = useCallback(() => {
		return fetchData();
	}, [fetchData]);

	return {
		data,
		isLoading,
		error,
		refreshData,
	};
}
