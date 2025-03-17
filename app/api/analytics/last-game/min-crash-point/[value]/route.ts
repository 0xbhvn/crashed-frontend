import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

export async function GET(
	request: NextRequest,
	{ params }: { params: { value: string } }
) {
	try {
		const value = params.value;

		// Construct the API URL
		const backendUrl = getApiUrl(
			`analytics/last-game/min-crash-point/${value}`
		);

		const backendResponse = await fetch(backendUrl, {
			headers: getApiHeaders(),
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
