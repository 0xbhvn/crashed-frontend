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

		// Log the API request for debugging
		console.log('Intervals API request:', {
			url: backendUrlWithParams.toString(),
			value,
			intervalMinutes,
			hours,
			timezone: headers['X-Timezone'],
		});

		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers,
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('API request failed:', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		// Log the raw data for debugging
		console.log('Intervals API response:', JSON.stringify(data, null, 2));

		// Check if data is structured as expected - the new format has data.data as an object with intervals array
		if (!data.data) {
			console.warn('Unexpected API structure: missing data property');
			// Return an empty data array rather than passing through potentially problematic data
			return NextResponse.json({
				status: 'success',
				data: {
					min_value: numericValue,
					interval_minutes: numericInterval,
					hours: Number(hours),
					count: 0,
					intervals: [],
				},
				message: 'No data found',
			});
		}

		// The new response format has data.data as an object with intervals property
		if (data.data.intervals && Array.isArray(data.data.intervals)) {
			// New format - return as is
			return NextResponse.json(data);
		}

		// Check if we have the old array format
		if (Array.isArray(data.data)) {
			// Old format - convert to new format for consistency
			const convertedData = {
				status: 'success',
				data: {
					min_value: numericValue,
					interval_minutes: numericInterval,
					hours: Number(hours),
					count: data.data.length,
					intervals: data.data,
				},
			};
			return NextResponse.json(convertedData);
		}

		// Unexpected format - return empty data
		console.warn('API returned unexpected data format');
		return NextResponse.json({
			status: 'success',
			data: {
				min_value: numericValue,
				interval_minutes: numericInterval,
				hours: Number(hours),
				count: 0,
				intervals: [],
			},
			message: 'No data available in expected format',
		});
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
