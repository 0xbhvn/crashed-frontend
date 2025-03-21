// Get streak badge color based on value and crash point
export function getStreakBadgeColor(
	streakValue: number,
	crashPoint: number
): string {
	if (streakValue <= crashPoint / 2) {
		return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Red - bad
	}

	if (streakValue <= crashPoint) {
		return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'; // Yellow - warning
	}

	return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Green - good
}

// Format crash point display
export function formatCrashPoint(
	point: number,
	type: 'current' | 'unique'
): string {
	const hasDecimal = point !== Math.floor(point);
	const formattedPoint = hasDecimal ? point.toString() : `${point}.0`;

	return type === 'current' ? `≥ ${formattedPoint}` : `= ${formattedPoint}`;
}
