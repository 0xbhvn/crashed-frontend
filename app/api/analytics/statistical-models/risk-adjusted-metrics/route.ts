import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

/**
 * GET handler for the risk-adjusted metrics API endpoint
 * Acts as a proxy to the external API to avoid CORS issues
 */
export async function GET(request: NextRequest) {
	try {
		// Extract query parameters
		const searchParams = request.nextUrl.searchParams;
		const targets = searchParams.get('targets') || '2,3,5,10';
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

		// Validate target multipliers format
		try {
			const targetMultipliers = targets.split(',').map(t => {
				const num = Number.parseFloat(t.trim());
				if (Number.isNaN(num) || num <= 0 || num > 1000) {
					throw new Error('Invalid target multiplier');
				}
				return num;
			});
		} catch {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: target multipliers must be comma-separated numbers between 1 and 1000',
				},
				{ status: 400 }
			);
		}

		// Construct the API URL
		const backendUrl = getApiUrl('analytics/statistical-models/risk-adjusted-metrics');
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('targets', targets);
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
			console.error('Risk-adjusted metrics API request failed:', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying risk-adjusted metrics API request:', error);

		// Return an appropriate error response
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to fetch risk-adjusted metrics data from the API',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}