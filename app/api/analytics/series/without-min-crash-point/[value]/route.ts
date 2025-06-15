import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeadersWithoutTimezone } from '@/lib/api-config';

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ value: string }> }
) {
	console.log('[API Route] Series analysis request received');
	console.log('[API Route] Request URL:', request.url);
	console.log('[API Route] Request method:', request.method);

	try {
		// Extract path parameter
		const params = await context.params;
		const { value } = params;
		console.log('[API Route] Path parameter value:', value);

		// Extract query parameters
		const searchParams = request.nextUrl.searchParams;
		const limit = searchParams.get('limit') || '1000';
		const sortBy = searchParams.get('sort_by') || 'time';
		console.log(
			'[API Route] Query parameters - limit:',
			limit,
			'sortBy:',
			sortBy
		);

		// Validate input
		const numericValue = Number.parseFloat(value);
		if (Number.isNaN(numericValue) || numericValue <= 0) {
			console.error('[API Route] Invalid value parameter:', value);
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
		console.log('[API Route] Backend URL constructed:', backendUrl);

		// For game count-based queries, don't include timezone header
		const headers = getApiHeadersWithoutTimezone();
		console.log('[API Route] Headers for backend request:', headers);

		// Call the backend API with query parameters
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('limit', limit);
		backendUrlWithParams.searchParams.append('sort_by', sortBy);

		console.log(
			'[API Route] Final backend URL with params:',
			backendUrlWithParams.toString()
		);

		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers,
			cache: 'no-store',
		});

		console.log(
			'[API Route] Backend response status:',
			backendResponse.status
		);
		console.log('[API Route] Backend response ok:', backendResponse.ok);

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('[API Route] Backend response not OK:', errorText);
			console.error(
				'[API Route] Backend response status:',
				backendResponse.status
			);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();
		console.log(
			'[API Route] Backend response data keys:',
			Object.keys(data)
		);
		console.log(
			'[API Route] Backend response data.data type:',
			typeof data.data
		);

		// Check if data is structured as expected
		if (!data.data) {
			console.warn(
				'[API Route] Unexpected API structure: missing data property'
			);
			// Return the data as-is even if unexpected
			return NextResponse.json(data);
		}

		// If the data is not an array but another structure, transform it
		if (!Array.isArray(data.data)) {
			console.log(
				'[API Route] Data.data is not an array, attempting to transform'
			);
			// Handle new API structure silently - automatically adapt the response
			if (typeof data.data === 'object' && data.data !== null) {
				// Check if data.data has a 'series' property (new API structure)
				if ('series' in data.data && Array.isArray(data.data.series)) {
					console.log(
						'[API Route] Found series array with length:',
						data.data.series.length
					);
					// Replace data.data with the series array
					data.data = data.data.series;
				} else {
					// Look for potential array fields within the data object
					const potentialArrays = Object.values(data.data).filter((val) =>
						Array.isArray(val)
					);
					console.log(
						'[API Route] Found potential arrays:',
						potentialArrays.length
					);
					if (potentialArrays.length > 0) {
						// Replace data.data with the first array we found
						data.data = potentialArrays[0];
						console.log(
							'[API Route] Replaced data.data with array of length:',
							data.data.length
						);
					}
				}
			}
		} else {
			console.log(
				'[API Route] Data.data is array with length:',
				data.data.length
			);
		}

		console.log('[API Route] Returning successful response');
		// Return the data to the client
		return NextResponse.json(data);
	} catch (error) {
		console.error('[API Route] Error proxying API request:', error);
		console.error(
			'[API Route] Error stack:',
			error instanceof Error ? error.stack : 'No stack trace'
		);

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
