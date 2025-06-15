/**
 * API configuration utilities
 */

export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
export const TIMEZONE = process.env.NEXT_PUBLIC_TIMEZONE || 'Asia/Kolkata';

/**
 * Construct a full API URL
 */
export function getApiUrl(path: string): string {
	// Remove leading slash if present to avoid double slashes
	const cleanPath = path.startsWith('/') ? path.substring(1) : path;
	return `${API_BASE_URL}/${cleanPath}`;
}

/**
 * Get common headers for API requests
 */
export function getApiHeaders(): HeadersInit {
	return {
		'Content-Type': 'application/json',
		'X-Timezone': TIMEZONE,
	};
}

/**
 * Get API headers without timezone - for endpoints that don't need timezone
 */
export function getApiHeadersWithoutTimezone(): HeadersInit {
	return {
		'Content-Type': 'application/json',
	};
}
