'use client';

import * as React from 'react';

export interface StreakGame {
	game_id: string;
	crash_point: number;
	time: string;
}

export interface Streak {
	start_index: number;
	start_game_id: string;
	start_time: string;
	end_game_id: string;
	end_time: string;
	length: number;
	average_crash_point: number;
	is_ongoing?: boolean;
	games: StreakGame[];
}

export interface StreakStatistics {
	average_length: number;
	longest_streak: number;
	shortest_streak: number;
	total_games_in_hot_streaks?: number;
	total_games_in_cold_streaks?: number;
}

export interface StreakCategory {
	count: number;
	streaks: Streak[];
	statistics: StreakStatistics;
}

export interface CurrentState {
	is_hot_streak: boolean;
	is_cold_streak: boolean;
	last_game_crash_point: number | null;
}

export interface AnalysisParameters {
	threshold_high: number;
	threshold_low: number;
	min_streak_length: number;
	total_games_analyzed: number;
}

export interface StreakAnalysisResponse {
	analysis_parameters: AnalysisParameters;
	hot_streaks: StreakCategory;
	cold_streaks: StreakCategory;
	current_state: CurrentState;
}

export interface UseStreakAnalysisParams {
	thresholdHigh?: number;
	thresholdLow?: number;
	minLength?: number;
	limit?: number;
	enabled?: boolean;
}

export interface UseStreakAnalysisResult {
	data: StreakAnalysisResponse | null;
	isLoading: boolean;
	error: string | null;
	refreshData: () => void;
}

export function useStreakAnalysis({
	thresholdHigh = 5.0,
	thresholdLow = 2.0,
	minLength = 3,
	limit = 1000,
	enabled = true,
}: UseStreakAnalysisParams = {}): UseStreakAnalysisResult {
	const [data, setData] = React.useState<StreakAnalysisResponse | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const fetchData = React.useCallback(async () => {
		if (!enabled) return;

		setIsLoading(true);
		setError(null);

		try {
			const url = `/api/analytics/statistical-models/streaks?threshold_high=${thresholdHigh}&threshold_low=${thresholdLow}&min_length=${minLength}&limit=${limit}`;

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
			console.error('Error fetching streak analysis:', errorMessage);
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [thresholdHigh, thresholdLow, minLength, limit, enabled]);

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