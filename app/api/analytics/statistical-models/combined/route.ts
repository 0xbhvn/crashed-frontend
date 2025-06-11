import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

/**
 * GET handler for the combined statistical analysis API endpoint
 * Acts as a proxy to the external API to avoid CORS issues
 */
export async function GET(request: NextRequest) {
	try {
		// Extract query parameters
		const searchParams = request.nextUrl.searchParams;
		const ma_windows = searchParams.get('ma_windows') || '5,10,20';
		const vol_windows = searchParams.get('vol_windows') || '10,20,50';
		const threshold_high = searchParams.get('threshold_high') || '5.0';
		const threshold_low = searchParams.get('threshold_low') || '2.0';
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

		const numericThresholdHigh = Number.parseFloat(threshold_high);
		const numericThresholdLow = Number.parseFloat(threshold_low);

		if (Number.isNaN(numericThresholdHigh) || Number.isNaN(numericThresholdLow)) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: thresholds must be valid numbers',
				},
				{ status: 400 }
			);
		}

		if (numericThresholdHigh <= numericThresholdLow) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: high threshold must be greater than low threshold',
				},
				{ status: 400 }
			);
		}

		// Validate window sizes format
		try {
			const maWindowSizes = ma_windows.split(',').map(w => {
				const num = Number.parseInt(w.trim(), 10);
				if (Number.isNaN(num) || num <= 0 || num > 1000) {
					throw new Error('Invalid MA window size');
				}
				return num;
			});

			const volWindowSizes = vol_windows.split(',').map(w => {
				const num = Number.parseInt(w.trim(), 10);
				if (Number.isNaN(num) || num <= 0 || num > 1000) {
					throw new Error('Invalid volatility window size');
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
		const backendUrl = getApiUrl('analytics/statistical-models/combined');
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('ma_windows', ma_windows);
		backendUrlWithParams.searchParams.append('vol_windows', vol_windows);
		backendUrlWithParams.searchParams.append('threshold_high', threshold_high);
		backendUrlWithParams.searchParams.append('threshold_low', threshold_low);
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
			console.error('Combined analysis API request failed:', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying combined analysis API request:', error);

		// Return an appropriate error response
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to fetch combined analysis data from the API',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}