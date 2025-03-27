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

	// Track the most recent interval end time to detect when we need a new interval
	const latestIntervalEndRef = useRef<string | null>(null);

	// Track time of last full refresh to limit frequency
	const lastFullRefreshRef = useRef<number>(Date.now());

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
					const intervals = responseData.data.intervals;
					setData(intervals);

					// Record the latest interval end time for detecting when we need to fetch new intervals
					if (intervals.length > 0) {
						// Find the most recent interval (should be at the beginning of the array)
						const mostRecentInterval = intervals.reduce(
							(
								latest: IntervalData | null,
								current: IntervalData
							) => {
								const latestEnd = latest
									? new Date(latest.interval_end).getTime()
									: 0;
								const currentEnd = new Date(
									current.interval_end
								).getTime();
								return currentEnd > latestEnd
									? current
									: latest;
							},
							null
						);

						if (mostRecentInterval) {
							latestIntervalEndRef.current =
								mostRecentInterval.interval_end;
						}
					}

					// Update last full refresh time
					lastFullRefreshRef.current = Date.now();
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

	// Function to update a specific interval's data using the game's end time
	const updateInterval = useCallback(
		(gameEndTime: string, crashPoint: number) => {
			setData((prevData) => {
				if (!prevData || prevData.length === 0) return prevData;

				// Convert the game end time to a Date object
				const gameDate = new Date(gameEndTime);

				// Find the interval that contains this game time (using game's end time)
				const intervalIndex = prevData.findIndex((interval) => {
					const intervalStart = new Date(interval.interval_start);
					const intervalEnd = new Date(interval.interval_end);

					// Use endTime and compare with interval boundaries
					return gameDate >= intervalStart && gameDate < intervalEnd;
				});

				// If we can't find a matching interval, check if we need a data refresh
				if (intervalIndex === -1) {
					// Check if the game time is more recent than our latest interval
					const latestIntervalEnd = latestIntervalEndRef.current
						? new Date(latestIntervalEndRef.current)
						: null;

					// If the game is newer than our most recent interval, we need new data
					// But limit refreshes to avoid hammering the API
					const timeSinceLastRefresh =
						Date.now() - lastFullRefreshRef.current;
					if (
						latestIntervalEnd &&
						gameDate > latestIntervalEnd &&
						timeSinceLastRefresh > 30000
					) {
						// Schedule a refresh for the next tick to avoid state updates during render
						setTimeout(() => {
							if (isMountedRef.current) {
								fetchData();
							}
						}, 0);
					}

					return prevData;
				}

				// Create a new array with the updated interval
				const newData = [...prevData];
				const interval = { ...newData[intervalIndex] };

				// Update the interval's statistics based on crash point
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
		[value, fetchData]
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

		// Update the specific interval that contains this game using the game's end time
		updateInterval(latestGame.endTime, latestGame.crashPoint);
	}, [latestGame, updateInterval]);

	// Periodically check if we need to refresh data to get new intervals
	useEffect(() => {
		const checkInterval = setInterval(() => {
			const now = new Date();
			const latestIntervalEnd = latestIntervalEndRef.current
				? new Date(latestIntervalEndRef.current)
				: null;

			// If current time is past the latest interval end + buffer, refresh
			if (
				latestIntervalEnd &&
				now > new Date(latestIntervalEnd.getTime() + 60000)
			) {
				fetchData();
			}
		}, 60000); // Check every minute

		return () => clearInterval(checkInterval);
	}, [fetchData]);

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
