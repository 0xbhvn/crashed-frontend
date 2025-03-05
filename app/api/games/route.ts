import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * GET handler for the games API endpoint
 * Acts as a proxy to the external API to avoid CORS issues
 */
export async function GET(request: NextRequest) {
	// Get the search parameters from the request
	const searchParams = request.nextUrl.searchParams;
	const page = searchParams.get('page') || '1';
	const per_page = searchParams.get('per_page') || '10';

	// Construct the URL for the external API
	const apiUrl = `https://crashed-backend-production.up.railway.app/api/games?per_page=${per_page}&page=${page}`;

	try {
		// Fetch data from the external API
		const response = await fetch(apiUrl, {
			headers: {
				'Content-Type': 'application/json',
			},
			// Use the Node.js fetch implementation which isn't subject to browser CORS
			cache: 'no-store', // Don't cache the response
		});

		// If the external API request was not successful
		if (!response.ok) {
			throw new Error(`API responded with status: ${response.status}`);
		}

		// Parse the response as JSON
		const data = await response.json();

		// Return the data from our API route
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying API request:', error);

		// Return an appropriate error response
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to fetch data from the API',
			},
			{ status: 500 }
		);
	}
}
