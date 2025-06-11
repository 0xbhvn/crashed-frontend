import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

/**
 * GET handler for the market psychology indicators API endpoint
 * Acts as a proxy to the external API to avoid CORS issues
 */
export async function GET(request: NextRequest) {
	try {
		// Extract query parameters
		const searchParams = request.nextUrl.searchParams;
		const limit = searchParams.get('limit') || '1000';
		const shortWindow = searchParams.get('short_window') || '50';
		const longWindow = searchParams.get('long_window') || '200';

		// Validate parameters
		const numericLimit = Number.parseInt(limit, 10);
		if (Number.isNaN(numericLimit) || numericLimit <= 0 || numericLimit > 10000) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: limit must be between 1 and 10000',
				},
				{ status: 400 }
			);
		}

		const numericShortWindow = Number.parseInt(shortWindow, 10);
		const numericLongWindow = Number.parseInt(longWindow, 10);
		
		if (Number.isNaN(numericShortWindow) || numericShortWindow <= 0) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: short window must be positive',
				},
				{ status: 400 }
			);
		}

		if (Number.isNaN(numericLongWindow) || numericLongWindow <= 0) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: long window must be positive',
				},
				{ status: 400 }
			);
		}

		if (numericShortWindow >= numericLongWindow) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: short window must be less than long window',
				},
				{ status: 400 }
			);
		}

		// Construct the API URL
		const backendUrl = getApiUrl('analytics/statistical-models/market-psychology');
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('limit', limit);
		backendUrlWithParams.searchParams.append('short_window', shortWindow);
		backendUrlWithParams.searchParams.append('long_window', longWindow);

		// Call the backend API
		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers: getApiHeaders(),
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('Market psychology API request failed:', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying market psychology API request:', error);

		// Return an appropriate error response
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to fetch market psychology data from the API',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}