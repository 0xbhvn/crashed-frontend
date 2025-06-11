'use client';

import * as React from 'react';
import type {
	MovingAveragesResponse,
	VolatilityIndicatorsResponse,
	ProbabilityDistributionResponse,
	StreakAnalysisResponse,
} from './';

export interface CombinedStatisticalAnalysisResponse {
	analysis_timestamp: string;
	parameters: {
		games_analyzed: number;
		ma_windows: number[];
		volatility_windows: number[];
		streak_thresholds: [number, number];
	};
	moving_averages: MovingAveragesResponse;
	volatility_indicators: VolatilityIndicatorsResponse;
	probability_distribution: ProbabilityDistributionResponse;
	streak_analysis: StreakAnalysisResponse;
}

export interface UseStatisticalModelsParams {
	maWindows?: number[];
	volWindows?: number[];
	thresholdHigh?: number;
	thresholdLow?: number;
	limit?: number;
	enabled?: boolean;
}

export interface UseStatisticalModelsResult {
	data: CombinedStatisticalAnalysisResponse | null;
	isLoading: boolean;
	error: string | null;
	refreshData: () => void;
}

export function useStatisticalModels({
	maWindows = [5, 10, 20],
	volWindows = [10, 20, 50],
	thresholdHigh = 5.0,
	thresholdLow = 2.0,
	limit = 1000,
	enabled = true,
}: UseStatisticalModelsParams = {}): UseStatisticalModelsResult {
	const [data, setData] = React.useState<CombinedStatisticalAnalysisResponse | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const fetchData = React.useCallback(async () => {
		if (!enabled) return;

		setIsLoading(true);
		setError(null);

		try {
			const maWindowsParam = maWindows.join(',');
			const volWindowsParam = volWindows.join(',');
			
			const url = `/api/analytics/statistical-models/combined?ma_windows=${maWindowsParam}&vol_windows=${volWindowsParam}&threshold_high=${thresholdHigh}&threshold_low=${thresholdLow}&limit=${limit}`;

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
			console.error('Error fetching statistical models:', errorMessage);
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [maWindows, volWindows, thresholdHigh, thresholdLow, limit, enabled]);

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