import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

// Helper function for fetch with retry and timeout
async function fetchWithRetryAndTimeout(
	url: string,
	options: RequestInit,
	maxRetries = 3,
	timeoutMs = 8000
) {
	let retries = 0;

	while (retries < maxRetries) {
		try {
			// Create an AbortController to handle timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

			// Add the signal to the options
			const fetchOptions = {
				...options,
				signal: controller.signal,
			};

			try {
				const response = await fetch(url, fetchOptions);
				clearTimeout(timeoutId);
				return response;
			} catch (error) {
				clearTimeout(timeoutId);

				// Check if it was a timeout
				if (error instanceof Error && error.name === 'AbortError') {
					console.log(`Request timed out after ${timeoutMs}ms`);
					// Treat timeout as a retriable error
					throw new Error('Request timed out');
				}

				throw error;
			}
		} catch (error) {
			retries++;
			if (retries >= maxRetries) {
				throw error;
			}

			// Exponential backoff: 1s, 2s, 4s...
			const delay = 2 ** (retries - 1) * 1000;
			console.log(`Retrying in ${delay}ms... (${retries}/${maxRetries})`);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	throw new Error('Max retries reached');
}

export async function POST(request: NextRequest) {
	try {
		// Get the request body
		const requestBody = await request.json();

		// Construct the API URL
		const backendUrl = getApiUrl('analytics/last-games/min-crash-points');

		// Call with retry and timeout
		const backendResponse = await fetchWithRetryAndTimeout(
			backendUrl,
			{
				method: 'POST',
				headers: getApiHeaders(),
				body: JSON.stringify(requestBody),
				cache: 'no-store',
			},
			3, // Max retries
			8000 // Timeout in ms
		);

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
