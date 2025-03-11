// Check if a date string can be converted to a valid date
export const isValidDate = (dateString: string | null | undefined): boolean => {
	if (!dateString) return false;

	try {
		const date = new Date(dateString);
		return !Number.isNaN(date.getTime());
	} catch {
		return false;
	}
};

// Format date strings to more readable format with validation
export const formatDate = (dateString: string | null | undefined): string => {
	if (!isValidDate(dateString)) return 'Invalid date';

	try {
		const date = new Date(dateString as string);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true,
		}).format(date);
	} catch {
		return 'Invalid date';
	}
};

// Calculate duration between two dates in seconds with validation
export const calculateDuration = (
	endTimeStr: string | null | undefined,
	beginTimeStr: string | null | undefined
): string => {
	if (!isValidDate(endTimeStr) || !isValidDate(beginTimeStr)) {
		return 'N/A';
	}

	try {
		const endTime = new Date(endTimeStr as string);
		const beginTime = new Date(beginTimeStr as string);
		const durationMs = endTime.getTime() - beginTime.getTime();

		// Check for negative duration (data error)
		if (durationMs < 0) {
			return 'Error';
		}

		const durationSec = durationMs / 1000;
		return durationSec.toFixed(2); // Return with 2 decimal places
	} catch {
		return 'Error';
	}
};
