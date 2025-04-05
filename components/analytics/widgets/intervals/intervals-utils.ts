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
