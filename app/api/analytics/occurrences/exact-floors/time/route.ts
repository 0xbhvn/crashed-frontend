import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

export async function POST(request: NextRequest) {
	try {
		// Extract request body
		const requestBody = await request.json();
		const { values, hours = 24 } = requestBody;

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
			'analytics/occurrences/exact-floors/batch'
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

		// Call the backend API with all parameters in the body
		const backendResponse = await fetch(backendUrl, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				values,
				hours,
				by_time: true,
				comparison: true,
			}),
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error(
				'Backend response not OK (exact floors time):',
				errorText
			);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		// Check if data is structured as expected
		if (!data.data || typeof data.data !== 'object') {
			console.warn(
				'Unexpected API structure: data.data is not an object'
			);
			// Return the data as-is even if unexpected
			return NextResponse.json(data);
		}

		// For backward compatibility, if data.data contains results but not occurrences,
		// add an occurrences field that points to the same object as results
		if (data.data.results && !data.data.occurrences) {
			data.data.occurrences = data.data.results;
		}

		// Return the data to the client
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying API request (exact floors time):', error);

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

// Add a GET handler to support build-time static analysis
export async function GET() {
	return NextResponse.json(
		{
			status: 'error',
			message:
				'This endpoint requires a POST request with values array and hours parameter',
		},
		{ status: 405 }
	);
}
