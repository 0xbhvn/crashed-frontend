import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

export async function POST(request: NextRequest) {
	try {
		// Get the request body
		const requestBody = await request.json();

		// Construct the API URL
		const backendUrl = getApiUrl('analytics/last-games/min-crash-points');

		const backendResponse = await fetch(backendUrl, {
			method: 'POST',
			headers: getApiHeaders(),
			body: JSON.stringify(requestBody),
			cache: 'no-store',
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			throw new Error(
				`Backend API responded with status: ${backendResponse.status}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

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
