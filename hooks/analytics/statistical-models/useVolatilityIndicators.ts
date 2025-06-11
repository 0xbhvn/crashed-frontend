'use client';

import * as React from 'react';

export interface VolatilityData {
	game_index: number;
	game_id: string;
	crash_point: number;
	window_mean: number;
	window_std_dev: number;
	window_variance: number;
	coefficient_of_variation: number;
	time: string;
}

export interface VolatilityWindow {
	window_size: number;
	data_points: number;
	current_std_dev: number | null;
	current_variance: number | null;
	current_cv: number | null;
	avg_std_dev: number | null;
	avg_variance: number | null;
	avg_cv: number | null;
	volatility_trend: 'high' | 'low';
	recent_data: VolatilityData[];
}

export interface OverallStatistics {
	mean: number;
	std_dev: number | null;
	variance: number | null;
	min: number;
	max: number;
	median: number;
}

export interface VolatilityIndicatorsResponse {
	total_games: number;
	latest_game_time: string;
	overall_statistics: OverallStatistics;
	rolling_volatility: Record<string, VolatilityWindow>;
}

export interface UseVolatilityIndicatorsParams {
	windows?: number[];
	limit?: number;
	enabled?: boolean;
}

export interface UseVolatilityIndicatorsResult {
	data: VolatilityIndicatorsResponse | null;
	isLoading: boolean;
	error: string | null;
	refreshData: () => void;
}

export function useVolatilityIndicators({
	windows = [10, 20, 50],
	limit = 1000,
	enabled = true,
}: UseVolatilityIndicatorsParams = {}): UseVolatilityIndicatorsResult {
	const [data, setData] = React.useState<VolatilityIndicatorsResponse | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const fetchData = React.useCallback(async () => {
		if (!enabled) return;

		setIsLoading(true);
		setError(null);

		try {
			const windowsParam = windows.join(',');
			const url = `/api/analytics/statistical-models/volatility?windows=${windowsParam}&limit=${limit}`;

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
			console.error('Error fetching volatility indicators:', errorMessage);
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