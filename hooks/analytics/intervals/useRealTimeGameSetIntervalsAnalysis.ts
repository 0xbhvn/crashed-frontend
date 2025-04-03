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
	refreshInterval = 60000, // Default to refreshing every 60 seconds
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

	// Initial data load
	useEffect(() => {
		fetchData();
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
