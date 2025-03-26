import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeadersWithoutTimezone } from '@/lib/api-config';

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
		const limit = searchParams.get('limit') || '1000';
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
			`analytics/series/without-min-crash-point/${value}`
		);

		// For game count-based queries, don't include timezone header
		const headers = getApiHeadersWithoutTimezone();

		// Call the backend API with query parameters
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('limit', limit);
		backendUrlWithParams.searchParams.append('sort_by', sortBy);

		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers,
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('Backend response not OK (series):', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		// Check if data is structured as expected
		if (!data.data) {
			console.warn('Unexpected API structure: missing data property');
			// Return the data as-is even if unexpected
			return NextResponse.json(data);
		}

		// If the data is not an array but another structure, transform it
		if (!Array.isArray(data.data)) {
			// Handle new API structure silently - automatically adapt the response
			if (typeof data.data === 'object' && data.data !== null) {
				// Look for potential array fields within the data object
				const potentialArrays = Object.values(data.data).filter((val) =>
					Array.isArray(val)
				);
				if (potentialArrays.length > 0) {
					// Replace data.data with the first array we found
					data.data = potentialArrays[0];
				}
			}
		}

		// Return the data to the client
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying API request (series):', error);

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
