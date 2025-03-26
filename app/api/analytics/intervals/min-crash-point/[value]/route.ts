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
		const intervalMinutes = searchParams.get('interval_minutes') || '10';
		const hours = searchParams.get('hours') || '24';

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

		// Validate interval minutes
		const numericInterval = Number.parseInt(intervalMinutes, 10);
		if (
			Number.isNaN(numericInterval) ||
			![10, 15, 30, 60].includes(numericInterval)
		) {
			return NextResponse.json(
				{
					status: 'error',
					message:
						'Invalid request: interval_minutes must be 10, 15, 30, or 60',
				},
				{ status: 400 }
			);
		}

		// Construct the API URL
		const backendUrl = getApiUrl(
			`analytics/intervals/min-crash-point/${value}`
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
		backendUrlWithParams.searchParams.append(
			'interval_minutes',
			intervalMinutes
		);
		backendUrlWithParams.searchParams.append('hours', hours);

		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers,
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('Backend response not OK (intervals):', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		// Check if data is structured as expected
		if (!data.data || !Array.isArray(data.data)) {
			console.warn('Unexpected API structure: data.data is not an array');
			// Return the data as-is even if unexpected
			return NextResponse.json(data);
		}

		// Return the data to the client
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying API request (intervals):', error);

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
