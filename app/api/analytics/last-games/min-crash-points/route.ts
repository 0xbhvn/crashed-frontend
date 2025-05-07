import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

export async function POST(request: NextRequest) {
	try {
		// Get the request body
		const requestBody = await request.json();

		// Construct the API URL
		const backendUrl = getApiUrl('analytics/last-games/min-crash-points');
		console.log('Attempting to call backend API at:', backendUrl);

		const backendResponse = await fetch(backendUrl, {
			method: 'POST',
			headers: getApiHeaders(),
			body: JSON.stringify(requestBody),
			cache: 'no-store',
		});

		console.log(`Backend response status: ${backendResponse.status}`);

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('Backend API error response text:', errorText);
			throw new Error(
				`Backend API responded with status: ${backendResponse.status}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();
		console.log('Data received from backend:', data);

		// Return the data to the client
		return NextResponse.json(data);
	} catch (error) {
		console.error('API request failed:', error);

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
