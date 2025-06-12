import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

// Export maxDuration for Vercel Serverless Functions
export const maxDuration = 30; // In seconds

export async function POST(request: NextRequest) {
	try {
		// Get the request body
		const requestBody = await request.json();

		// Construct the API URL
		const backendUrl = getApiUrl('analytics/last-games/min-crash-points');

		// Process request to backend

		// Simple fetch without custom timeout handling
		const backendResponse = await fetch(backendUrl, {
			method: 'POST',
			headers: getApiHeaders(),
			body: JSON.stringify(requestBody),
			cache: 'no-store',
		});

		// Check response status

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			// Backend error occurred
			throw new Error(
				`Backend API responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();
		// Process successful response

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
