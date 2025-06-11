'use client';

import * as React from 'react';

export interface MovingAverageData {
	game_index: number;
	game_id: string;
	crash_point: number;
	moving_average: number;
	time: string;
}

export interface MovingAverageWindow {
	window_size: number;
	data_points: number;
	current_ma: number | null;
	average_ma: number | null;
	min_ma: number | null;
	max_ma: number | null;
	std_dev_ma: number | null;
	recent_data: MovingAverageData[];
}

export interface MovingAveragesResponse {
	total_games: number;
	latest_game_time: string;
	moving_averages: Record<string, MovingAverageWindow>;
}

export interface UseMovingAveragesParams {
	windows?: number[];
	limit?: number;
	enabled?: boolean;
}

export interface UseMovingAveragesResult {
	data: MovingAveragesResponse | null;
	isLoading: boolean;
	error: string | null;
	refreshData: () => void;
}

export function useMovingAverages({
	windows = [5, 10, 20],
	limit = 1000,
	enabled = true,
}: UseMovingAveragesParams = {}): UseMovingAveragesResult {
	const [data, setData] = React.useState<MovingAveragesResponse | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const fetchData = React.useCallback(async () => {
		if (!enabled) return;

		setIsLoading(true);
		setError(null);

		try {
			const windowsParam = windows.join(',');
			const url = `/api/analytics/statistical-models/moving-averages?windows=${windowsParam}&limit=${limit}`;

			const response = await fetch(url);
			
			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || `HTTP ${response.status}`);
			}

			const result = await response.json();
			
			if (!result.success) {
				throw new Error(result.error || 'Unknown error');
			}

			setData(result.data);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error';
			console.error('Error fetching moving averages:', errorMessage);
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [windows, limit, enabled]);

	React.useEffect(() => {
		if (enabled) {
			fetchData();
		}
	}, [fetchData, enabled]);

	return {
		data,
		isLoading,
		error,
		refreshData: fetchData,
	};
}