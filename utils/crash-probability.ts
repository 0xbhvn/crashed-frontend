/**
 * Crash Probability Calculations
 * Based on BC.Game's distribution where probability p of a crash point X (or higher) is 99/X
 */

/**
 * Calculate the probability of a crash point X or higher occurring on the next game
 * Based on the formula from backend calculate_crash_probability function
 *
 * @param crash_point - The target crash point
 * @param games_since - Number of games since this crash point was last seen
 * @returns Probability as a percentage (0-100)
 */
export function calculateCrashProbability(
	crash_point: number,
	games_since: number
): number {
	// Base probability: p = min(99.0, 99.0 / crash_point) / 100
	const base_prob = Math.min(99.0, 99.0 / crash_point) / 100;

	// Number of trials: n = games_since + 1 (including the next game)
	const n = games_since + 1;

	// Cumulative probability using geometric distribution: 1 - (1 - p)^n
	const cumulative_prob = 1 - (1 - base_prob) ** n;

	// Convert to percentage and round to 2 decimal places
	return Math.round(cumulative_prob * 100 * 100) / 100;
}

/**
 * Calculate the probability of a crash point being less than or equal to max_value
 * Based on the formula from backend calculate_max_crash_probability function
 *
 * @param max_value - The maximum crash point
 * @param games_since - Number of games since condition was last met
 * @returns Probability as a percentage (0-100)
 */
export function calculateMaxCrashProbability(
	max_value: number,
	games_since: number
): number {
	// Base probability calculation
	let base_prob: number;
	if (max_value > 1) {
		base_prob = Math.min(99.0, 100.0 - 99.0 / max_value);
	} else {
		base_prob = 1.0;
	}

	// Adjustment based on games_since
	const adjustment = Math.min(10.0, games_since * 0.5);

	// Final probability
	const final_prob = Math.min(99.0, base_prob + adjustment);

	return Math.round(final_prob * 100) / 100;
}

/**
 * Calculate dynamic percentile thresholds for streak lengths based on crash point
 *
 * @param crash_point - The target crash point
 * @returns Object with percentile thresholds for streak lengths
 */
export function calculatePercentileThresholds(crash_point: number): {
	p25: number;
	p50: number;
	p75: number;
} {
	// Base probability that the target crash point occurs on any given game
	const base_prob = Math.min(99.0, 99.0 / crash_point) / 100;
	const prob_not_occur = 1 - base_prob;

	// For geometric distribution, find streak length k such that P(streak length ≤ k) = percentile
	// P(streak length ≤ k) = 1 - (1-p)^k = percentile
	// k = ln(1 - percentile) / ln(1-p)

	const p25 = Math.ceil(Math.log(1 - 0.25) / Math.log(prob_not_occur));
	const p50 = Math.ceil(Math.log(1 - 0.5) / Math.log(prob_not_occur));
	const p75 = Math.ceil(Math.log(1 - 0.75) / Math.log(prob_not_occur));

	return { p25, p50, p75 };
}

/**
 * Get dynamic streak length categories based on crash point
 *
 * @param crash_point - The target crash point
 * @returns Object with dynamic category ranges
 */
export function getDynamicCrashCategories(crash_point: number) {
	const thresholds = calculatePercentileThresholds(crash_point);

	return {
		p25: {
			min: 1,
			max: thresholds.p25,
			display: thresholds.p25 === 1 ? '1' : `1-${thresholds.p25}`,
		},
		'p25-p50': {
			min: thresholds.p25 + 1,
			max: thresholds.p50,
			display:
				thresholds.p25 + 1 === thresholds.p50
					? `${thresholds.p50}`
					: `${thresholds.p25 + 1}-${thresholds.p50}`,
		},
		'p50-p75': {
			min: thresholds.p50 + 1,
			max: thresholds.p75,
			display:
				thresholds.p50 + 1 === thresholds.p75
					? `${thresholds.p75}`
					: `${thresholds.p50 + 1}-${thresholds.p75}`,
		},
		'>p75': {
			min: thresholds.p75 + 1,
			max: Number.POSITIVE_INFINITY,
			display: `> ${thresholds.p75}`,
		},
	};
}

/**
 * Calculate streak length probabilities for each category
 * These represent the probability that a streak will fall into each length range
 *
 * @param selected_crash_point - The currently selected crash point in series analysis
 * @param games_since - Number of games since the selected crash point was last seen (unused for theoretical probabilities)
 * @returns Object with probabilities for each streak length category
 */
export function calculateCategoryProbabilities(
	selected_crash_point: number,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	games_since: number
): Record<string, number> {
	// Base probability that the target crash point occurs on any given game
	const base_prob = Math.min(99.0, 99.0 / selected_crash_point) / 100;
	const prob_not_occur = 1 - base_prob;

	// Get dynamic thresholds for this crash point
	const thresholds = calculatePercentileThresholds(selected_crash_point);

	// For geometric distribution, calculate probability of streak lengths using dynamic thresholds:
	// P(streak length 1 to p25) = 1 - (1-p)^p25
	// P(streak length p25+1 to p50) = (1-p)^p25 - (1-p)^p50
	// P(streak length p50+1 to p75) = (1-p)^p50 - (1-p)^p75
	// P(streak length > p75) = (1-p)^p75

	return {
		// p25: Probability of streaks 1 to p25 threshold
		p25:
			Math.round((1 - prob_not_occur ** thresholds.p25) * 100 * 100) /
			100,

		// p25-p50: Probability of streaks p25+1 to p50 threshold
		'p25-p50':
			Math.round(
				(prob_not_occur ** thresholds.p25 -
					prob_not_occur ** thresholds.p50) *
					100 *
					100
			) / 100,

		// p50-p75: Probability of streaks p50+1 to p75 threshold
		'p50-p75':
			Math.round(
				(prob_not_occur ** thresholds.p50 -
					prob_not_occur ** thresholds.p75) *
					100 *
					100
			) / 100,

		// >p75: Probability of streaks longer than p75 threshold
		'>p75': Math.round(prob_not_occur ** thresholds.p75 * 100 * 100) / 100,
	};
}
