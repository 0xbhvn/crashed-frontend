import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

/**
 * GET handler for the probability distribution statistical model API endpoint
 * Acts as a proxy to the external API to avoid CORS issues
 */
export async function GET(request: NextRequest) {
	try {
		// Extract query parameters
		const searchParams = request.nextUrl.searchParams;
		const limit = searchParams.get('limit') || '10000';
		const ranges = searchParams.get('ranges');

		// Validate parameters
		const numericLimit = Number.parseInt(limit, 10);
		if (Number.isNaN(numericLimit) || numericLimit <= 0 || numericLimit > 50000) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: limit must be between 1 and 50000',
				},
				{ status: 400 }
			);
		}

		// Validate ranges format if provided
		if (ranges) {
			try {
				ranges.split(',').forEach(range => {
					const [min, max] = range.split('-');
					const minVal = Number.parseFloat(min.trim());
					const maxVal = max.trim() === 'inf' ? Number.POSITIVE_INFINITY : Number.parseFloat(max.trim());
					
					if (Number.isNaN(minVal) || (max.trim() !== 'inf' && Number.isNaN(maxVal))) {
						throw new Error('Invalid range format');
					}
				});
			} catch {
				return NextResponse.json(
					{
						status: 'error',
						message: 'Invalid request: ranges must be in format "min1-max1,min2-max2" (use "inf" for infinity)',
					},
					{ status: 400 }
				);
			}
		}

		// Construct the API URL
		const backendUrl = getApiUrl('analytics/statistical-models/probability-distribution');
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('limit', limit);
		if (ranges) {
			backendUrlWithParams.searchParams.append('ranges', ranges);
		}

		// Call the backend API
		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers: getApiHeaders(),
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('Probability distribution API request failed:', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying probability distribution API request:', error);

		// Return an appropriate error response
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to fetch probability distribution data from the API',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}