/**
 * API configuration utilities
 */

export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL ||
	'https://crashed-backend-production.up.railway.app/api';
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
