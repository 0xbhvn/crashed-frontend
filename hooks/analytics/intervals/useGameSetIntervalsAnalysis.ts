import { useCallback, useState, useRef, useEffect } from 'react';
import { getApiHeaders } from '@/lib/api-config';
import type { GameSetIntervalData } from '@/utils/analytics-types'; // We'll need to define this type

interface UseGameSetIntervalsAnalysisProps {
	value: number;
	gamesPerSet: 10 | 20 | 25 | 50;
	totalGames?: number;
}

interface UseGameSetIntervalsAnalysisResult {
	data: GameSetIntervalData[];
	isLoading: boolean;
	error: Error | null;
	fetchData: () => Promise<GameSetIntervalData[]>;
}

export function useGameSetIntervalsAnalysis({
	value,
	gamesPerSet = 25, // Default
	totalGames = 2000, // Default
}: UseGameSetIntervalsAnalysisProps): UseGameSetIntervalsAnalysisResult {
	const [data, setData] = useState<GameSetIntervalData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// Track if we're currently fetching data to prevent duplicate requests
	const isFetchingRef = useRef(false);
	// Track latest data state to avoid dependency issues
	const dataRef = useRef<GameSetIntervalData[]>([]);

	// Update ref when data changes
	useEffect(() => {
		dataRef.current = data;
	}, [data]);

	const fetchData = useCallback(async (): Promise<GameSetIntervalData[]> => {
		// Prevent multiple concurrent fetches
		if (isFetchingRef.current) {
			return dataRef.current;
		}

		// Set loading state and start fetching
		setIsLoading(true);
		setError(null);
		isFetchingRef.current = true;

		try {
			// Construct query parameters
			const queryParams = new URLSearchParams({
				games_per_set: gamesPerSet.toString(),
				total_games: totalGames.toString(),
			});

			// Prepare headers
			const headers = { ...getApiHeaders() } as Record<string, string>;
			headers['X-Timezone'] = 'Asia/Kolkata'; // Default timezone if needed

			// Call the new API route
			const response = await fetch(
				`/api/analytics/intervals/min-crash-point/${value}/game-sets?${queryParams.toString()}`,
				{
					method: 'GET',
					headers,
					cache: 'no-store', // Ensure fresh data
				}
			);

			// Check for non-OK responses
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Game Sets Intervals API responded with status: ${response.status} - ${errorText}`
				);
			}

			// Parse response
			const responseData = await response.json();

			// Check for error status in the response
			if (responseData.status !== 'success') {
				throw new Error(
					responseData.message ||
						'Error in game sets intervals analysis data'
				);
			}

			// Extract intervals data
			let intervalsData: GameSetIntervalData[] = [];
			if (
				responseData.data?.intervals &&
				Array.isArray(responseData.data.intervals)
			) {
				intervalsData = responseData.data.intervals;
			} else {
				console.warn(
					'API (game-sets) returned non-array data for intervals'
				);
			}

			setData(intervalsData);
			return intervalsData;
		} catch (err) {
			console.error('Game Sets API request failed:', err);
			const errorObject =
				err instanceof Error
					? err
					: new Error(
							'Failed to fetch game set intervals analysis data'
					  );

			setError(errorObject);
			// Reset data on error
			setData([]);
			throw errorObject; // Re-throw for potential handling upstream
		} finally {
			setIsLoading(false);
			isFetchingRef.current = false;
		}
	}, [value, gamesPerSet, totalGames]); // Remove data from deps to prevent loops

	return { data, isLoading, error, fetchData };
}
