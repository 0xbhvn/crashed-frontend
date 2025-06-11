import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

/**
 * GET handler for the volatility indicators statistical model API endpoint
 * Acts as a proxy to the external API to avoid CORS issues
 */
export async function GET(request: NextRequest) {
	try {
		// Extract query parameters
		const searchParams = request.nextUrl.searchParams;
		const windows = searchParams.get('windows') || '10,20,50';
		const limit = searchParams.get('limit') || '1000';

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

		// Validate window sizes format
		try {
			const windowSizes = windows.split(',').map(w => {
				const num = Number.parseInt(w.trim(), 10);
				if (Number.isNaN(num) || num <= 0 || num > 1000) {
					throw new Error('Invalid window size');
				}
				return num;
			});
		} catch {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: window sizes must be comma-separated integers between 1 and 1000',
				},
				{ status: 400 }
			);
		}

		// Construct the API URL
		const backendUrl = getApiUrl('analytics/statistical-models/volatility');
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('windows', windows);
		backendUrlWithParams.searchParams.append('limit', limit);

		// Call the backend API
		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers: getApiHeaders(),
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('Volatility API request failed:', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying volatility API request:', error);

		// Return an appropriate error response
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to fetch volatility data from the API',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}