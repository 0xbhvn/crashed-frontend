import { z } from 'zod';

// Zod schemas for validation
export const GameSchema = z.object({
	// Game ID appears to be a string of digits
	gameId: z.string().regex(/^\d+$/, 'Game ID must be numeric'),

	// Hash value is a 64-character hex string
	hashValue: z
		.string()
		.regex(/^[0-9a-f]{64}$/, 'Hash must be 64-character hex string'),

	// Financial numbers with 2 decimal precision
	crashPoint: z.number().min(1, 'Crash point must be at least 1').finite(),
	calculatedPoint: z
		.number()
		.min(1, 'Calculated point must be at least 1')
		.finite(),
	crashedFloor: z.number().int().nonnegative(),

	// ISO timestamps with timezone info
	endTime: z.string().datetime({ offset: true }),
	prepareTime: z.string().datetime({ offset: true }).nullable(),
	beginTime: z.string().datetime({ offset: true }).nullable(),
});

export const PaginationSchema = z.object({
	page: z.number().int().positive(),
	per_page: z.number().int().positive(),
	total_items: z.number().int().nonnegative(),
	total_pages: z.number().int().positive(),
	has_next: z.boolean(),
	has_prev: z.boolean(),
});

export const ApiResponseSchema = z.object({
	status: z.string(),
	count: z.number().int().nonnegative(),
	pagination: PaginationSchema,
	data: z.array(GameSchema),
});

// Type definitions derived from Zod schemas
export type Game = z.infer<typeof GameSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;

/**
 * Creates an empty API response with pagination information
 */
export function createEmptyResponse(
	page: number,
	itemsPerPage: number
): ApiResponse {
	return {
		status: 'ok',
		count: 0,
		pagination: {
			page,
			per_page: itemsPerPage,
			total_items: 0,
			total_pages: 1,
			has_next: false,
			has_prev: page > 1,
		},
		data: [],
	};
}

/**
 * Checks if a date string is valid
 */
export function isValidDate(dateString: string | null | undefined): boolean {
	if (!dateString) return false;
	const date = new Date(dateString);
	return !Number.isNaN(date.getTime());
}

/**
 * Formats a date string safely
 */
export function formatDate(
	dateString: string | null | undefined,
	fallback = 'N/A'
): string {
	if (!isValidDate(dateString)) return fallback;

	try {
		// We can safely create a Date here because isValidDate ensures it's a valid string
		const date = new Date(dateString as string);
		return date.toLocaleString();
	} catch {
		// Return fallback on date formatting error
		return fallback;
	}
}

/**
 * Calculates the duration between two dates
 */
export function calculateDuration(
	startDate: string | null | undefined,
	endDate: string | null | undefined,
	fallback = 'N/A'
): string {
	if (!isValidDate(startDate) || !isValidDate(endDate)) return fallback;

	try {
		// We can safely create Dates here because isValidDate ensures they're valid strings
		const start = new Date(startDate as string).getTime();
		const end = new Date(endDate as string).getTime();

		if (Number.isNaN(start) || Number.isNaN(end) || end < start)
			return fallback;

		const durationMs = end - start;
		return `${(durationMs / 1000).toFixed(2)}s`;
	} catch {
		// Return fallback on calculation error
		return fallback;
	}
}
