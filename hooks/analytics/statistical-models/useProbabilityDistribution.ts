'use client';

import * as React from 'react';

export interface RangeDistribution {
	min_value: number;
	max_value: number | string;
	count: number;
	probability_percent: number;
	theoretical_probability_percent: number;
	expected_count: number;
	deviation_from_expected: number;
	chi_square_component: number;
}

export interface OverallStatistics {
	mean: number;
	median: number;
	mode: number | null;
	std_dev: number | null;
	variance: number | null;
	skewness: number | null;
	kurtosis: number | null;
}

export interface Percentiles {
	p10: number;
	p25: number;
	p50: number;
	p75: number;
	p90: number;
	p95: number;
	p99: number;
}

export interface AnalysisPeriod {
	start_time: string;
	end_time: string;
}

export interface ProbabilityDistributionResponse {
	total_games: number;
	analysis_period: AnalysisPeriod;
	overall_statistics: OverallStatistics;
	range_distribution: Record<string, RangeDistribution>;
	percentiles: Percentiles;
}

export interface UseProbabilityDistributionParams {
	limit?: number;
	ranges?: Array<[number, number | string]>;
	enabled?: boolean;
}

export interface UseProbabilityDistributionResult {
	data: ProbabilityDistributionResponse | null;
	isLoading: boolean;
	error: string | null;
	refreshData: () => void;
}

export function useProbabilityDistribution({
	limit = 10000,
	ranges,
	enabled = true,
}: UseProbabilityDistributionParams = {}): UseProbabilityDistributionResult {
	const [data, setData] = React.useState<ProbabilityDistributionResponse | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const fetchData = React.useCallback(async () => {
		if (!enabled) return;

		setIsLoading(true);
		setError(null);

		try {
			let url = `/api/analytics/statistical-models/probability-distribution?limit=${limit}`;

			// Add custom ranges if provided
			if (ranges && ranges.length > 0) {
				const rangesParam = ranges
					.map(([min, max]) => `${min}-${max}`)
					.join(',');
				url += `&ranges=${rangesParam}`;
			}

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
			console.error('Error fetching probability distribution:', errorMessage);
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [limit, ranges, enabled]);

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