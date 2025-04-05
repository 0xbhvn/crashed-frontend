import { format, parseISO } from 'date-fns';

// Format hour label for display
export function formatHourLabel(hourKey: string): string {
	try {
		// Check if this is a game range label with the new 'xx' format
		if (hourKey.endsWith('xx')) {
			// Return the key as is (already in correct format)
			return hourKey;
		}

		// Check if this is the old game range format (for backward compatibility)
		if (hourKey.startsWith('Games ')) {
			// Extract just the number part without the "Games " prefix
			return hourKey.substring(6);
		}

		// For time-based intervals, format the date
		const date = parseISO(`${hourKey}:00:00`);
		return format(date, 'MMM dd, h a');
	} catch {
		// Return the raw key if parsing fails
		return hourKey;
	}
}

// Get percentage badge color based on value and crash point
export function getPercentageBadgeColor(
	percentage: number,
	crashValue: number
): string {
	// Calculate the borderline percentage (yellow) based on crash value
	const borderlinePercentage = 100 / crashValue;

	// If we're very close to the borderline (within 1%), use yellow
	if (Math.abs(percentage - borderlinePercentage) < 1) {
		return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
	}

	// If below the borderline, use red (worse than expected)
	if (percentage < borderlinePercentage) {
		return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
	}

	// If above the borderline, use green (better than expected)
	return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
}

// Get the interval columns array based on selected interval
export function getIntervalColumns(selectedInterval: number): number[] {
	const columns: number[] = [];
	for (let i = 0; i < 60; i += selectedInterval) {
		columns.push(i);
	}
	return columns;
}
