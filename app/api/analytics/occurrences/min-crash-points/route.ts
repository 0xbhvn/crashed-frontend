import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeadersWithoutTimezone } from '@/lib/api-config';

export async function POST(request: NextRequest) {
	try {
		// Extract request body
		const requestBody = await request.json();
		const { values, limit = 2000 } = requestBody;

		// Validate input
		if (!Array.isArray(values) || values.length === 0) {
			return NextResponse.json(
				{
					status: 'error',
					message:
						'Invalid request: values must be a non-empty array',
				},
				{ status: 400 }
			);
		}

		// Construct the API URL without query parameters
		const backendUrl = getApiUrl(
			'analytics/occurrences/min-crash-points/batch'
		);

		// For game count-based queries, don't include timezone header
		const headers = getApiHeadersWithoutTimezone();

		// Call the backend API with all parameters in the body
		const backendResponse = await fetch(backendUrl, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				values,
				games: limit,
				by_time: false,
				comparison: true,
			}),
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('⚠️ Backend response not OK:', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		// Check if data is structured as expected
		if (!data.data || typeof data.data !== 'object') {
			console.warn('⚠️ Unexpected data structure from backend:', data);
			// Return the data as-is even if unexpected
			return NextResponse.json(data);
		}

		// Return the data to the client
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying API request:', error);

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
