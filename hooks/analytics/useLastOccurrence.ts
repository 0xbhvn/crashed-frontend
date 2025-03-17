'use client';

import { useState, useEffect, useCallback } from 'react';
import { getApiHeaders } from '@/lib/api-config';

export interface LastOccurrenceGame {
	gameId: string;
	hashValue: string;
	crashPoint: number;
	calculatedPoint: number;
	crashedFloor: number;
	endTime: string;
	prepareTime: string;
	beginTime: string;
}

export interface LastOccurrenceData {
	game: LastOccurrenceGame | null;
	games_since: number;
}

export interface UseLastOccurrenceProps {
	crashPoint?: number;
	enabled?: boolean;
}

export function useLastOccurrence({
	crashPoint = 10.0,
	enabled = true,
}: UseLastOccurrenceProps = {}): {
	data: LastOccurrenceData | null;
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
} {
	const [data, setData] = useState<LastOccurrenceData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = useCallback(async () => {
		if (!enabled) return;
		setIsLoading(true);
		setError(null);

		try {
			// Call the API endpoint (our local API will proxy to the backend)
			const response = await fetch(
				`/api/analytics/last-game/min-crash-point/${crashPoint}`,
				{
					headers: getApiHeaders(),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				if (errorText.includes('datetime is not JSON serializable')) {
					throw new Error(
						'Server error: Date formatting issue. Please try again later.'
					);
				}
				throw new Error(
					`API responded with status: ${response.status}`
				);
			}

			const result = await response.json();

			if (result.status === 'error') {
				throw new Error(result.message || 'Unknown error occurred');
			}

			setData(result.data);
		} catch (err) {
			console.error('Error fetching last occurrence:', err);
			setError(
				err instanceof Error
					? err
					: new Error('An unknown error occurred')
			);
		} finally {
			setIsLoading(false);
		}
	}, [enabled, crashPoint]);

	useEffect(() => {
		if (enabled) {
			fetchData();
		}
	}, [enabled, fetchData]);

	return { data, isLoading, error, refetch: fetchData };
}
