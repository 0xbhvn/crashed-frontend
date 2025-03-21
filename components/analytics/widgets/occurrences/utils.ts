// Format crash point display
export function formatCrashPoint(
	point: number,
	type: 'current' | 'unique'
): string {
	const hasDecimal = point !== Math.floor(point);
	const formattedPoint = hasDecimal ? point.toString() : `${point}.0`;

	return type === 'current' ? `≥ ${formattedPoint}` : `= ${formattedPoint}`;
}

// Function to get badge color based on percentage
export function getPercentageBadgeColor(
	percentage: number,
	point: number,
	type: 'current' | 'unique'
): string {
	// For Exact Value tab, always use blue
	if (type === 'unique') {
		return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
	}

	// For Above Value tab
	const threshold = 100 / point;

	if (percentage < threshold) {
		return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Below threshold
	}

	if (Math.abs(percentage - threshold) < 0.05) {
		return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'; // At threshold
	}

	return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Above threshold
}

// Function to get comparison badge color based on change percentage
export function getComparisonBadgeColor(changePercent: number): string {
	if (changePercent > 0) {
		return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Positive change
	}
	if (changePercent < 0) {
		return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Negative change
	}
	return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'; // No change
}

// Get change indicator symbol
export function getChangeSymbol(change: number): string {
	if (change > 0) return '+';
	if (change < 0) return ''; // minus sign is already included in negative number
	return '±'; // for zero change
}
