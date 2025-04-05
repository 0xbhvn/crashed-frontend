import { useCallback, useEffect } from 'react';
import { useGameSetIntervalsAnalysis } from './useGameSetIntervalsAnalysis';

interface UseRealTimeGameSetIntervalsAnalysisProps {
	value: number;
	gamesPerSet: 10 | 20 | 25 | 50;
	totalGames?: number;
	refreshInterval?: number; // Interval in milliseconds for polling
}

export function useRealTimeGameSetIntervalsAnalysis({
	value,
	gamesPerSet,
	totalGames,
	refreshInterval = 5000, // Refresh every 5 seconds instead of 60
}: UseRealTimeGameSetIntervalsAnalysisProps) {
	const {
		data: apiData,
		isLoading: apiIsLoading,
		error: apiError,
		fetchData,
	} = useGameSetIntervalsAnalysis({
		value,
		gamesPerSet,
		totalGames,
	});

	// Initial data load with a small delay to prevent flickering
	useEffect(() => {
		const timer = setTimeout(() => {
			fetchData();
		}, 100);
		return () => clearTimeout(timer);
	}, [fetchData]);

	// Set up polling for refreshing data
	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchData();
		}, refreshInterval);

		// Cleanup interval on unmount or when dependencies change
		return () => clearInterval(intervalId);
	}, [fetchData, refreshInterval]);

	// Memoize refresh function
	const refreshData = useCallback(() => {
		return fetchData();
	}, [fetchData]);

	return {
		data: apiData,
		isLoading: apiIsLoading,
		error: apiError,
		refreshData,
	};
}
