import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ value: string }> }
) {
	try {
		// Extract path parameter
		const params = await context.params;
		const { value } = params;

		// Extract query parameters
		const searchParams = request.nextUrl.searchParams;
		const hours = searchParams.get('hours') || '24';
		const sortBy = searchParams.get('sort_by') || 'time';

		// Validate input
		const numericValue = Number.parseFloat(value);
		if (Number.isNaN(numericValue) || numericValue <= 0) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: value must be a positive number',
				},
				{ status: 400 }
			);
		}

		// Construct the API URL
		const backendUrl = getApiUrl(
			`analytics/series/without-min-crash-point/${value}/time`
		);

		// Forward timezone header from client if present (important for time-based queries)
		const headers = getApiHeaders() as Record<string, string>;
		const timezone = request.headers.get('X-Timezone');
		if (timezone) {
			headers['X-Timezone'] = timezone;
		} else {
			// For time-based queries, timezone is important - use a default if not provided
			headers['X-Timezone'] = 'Asia/Kolkata';
		}

		// Call the backend API with query parameters
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('hours', hours);
		backendUrlWithParams.searchParams.append('sort_by', sortBy);

		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers,
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error(
				'⚠️ Backend response not OK (series time):',
				errorText
			);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		// Check if data is structured as expected
		if (!data.data) {
			console.warn(
				'⚠️ Unexpected data structure from backend (series time):',
				data
			);
			// Return the data as-is even if unexpected
			return NextResponse.json(data);
		}

		// If the data is not an array but another structure, transform it
		if (!Array.isArray(data.data)) {
			console.warn(
				'⚠️ API structure changed: data.data is now',
				typeof data.data,
				'- Attempting to adapt...'
			);

			// Try to handle potentially changed API response structure
			if (typeof data.data === 'object' && data.data !== null) {
				// Look for potential array fields within the data object
				const potentialArrays = Object.values(data.data).filter((val) =>
					Array.isArray(val)
				);
				if (potentialArrays.length > 0) {
					console.info(
						'Found alternative array in response, using that instead'
					);
					// Replace data.data with the first array we found
					data.data = potentialArrays[0];
				}
			}
		}

		// Return the data to the client
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying API request (series time):', error);

		// Return an appropriate error response
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to fetch data from the API',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
