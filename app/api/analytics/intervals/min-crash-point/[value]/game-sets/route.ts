import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ value: string }> }
) {
	try {
		// Extract path parameter
		const params = await context.params;
		const { value } = params;

		// Extract query parameters
		const searchParams = request.nextUrl.searchParams;
		const gamesPerSet = searchParams.get('games_per_set') || '25'; // Default 25
		const totalGames = searchParams.get('total_games') || '2000'; // Default 2000

		// Validate input value
		const numericValue = Number.parseFloat(value);
		if (Number.isNaN(numericValue) || numericValue <= 0) {
			return NextResponse.json(
				{
					status: 'error',
					message: 'Invalid request: value must be a positive number',
				},
				{ status: 400 }
			);
		}

		// Validate games per set
		const numericGamesPerSet = Number.parseInt(gamesPerSet, 10);
		if (
			Number.isNaN(numericGamesPerSet) ||
			![10, 20, 25, 50].includes(numericGamesPerSet) // Allowed values
		) {
			return NextResponse.json(
				{
					status: 'error',
					message:
						'Invalid request: games_per_set must be 10, 20, 25, or 50',
				},
				{ status: 400 }
			);
		}

		// Validate total games (basic check)
		const numericTotalGames = Number.parseInt(totalGames, 10);
		if (Number.isNaN(numericTotalGames) || numericTotalGames <= 0) {
			return NextResponse.json(
				{
					status: 'error',
					message:
						'Invalid request: total_games must be a positive number',
				},
				{ status: 400 }
			);
		}

		// Construct the backend API URL
		const backendUrl = getApiUrl(
			`analytics/intervals/min-crash-point/${value}/game-sets`
		);

		// Forward timezone header (though less critical for game sets, might be used by backend)
		const headers = getApiHeaders() as Record<string, string>;
		const timezone = request.headers.get('X-Timezone');
		if (timezone) {
			headers['X-Timezone'] = timezone;
		} else {
			headers['X-Timezone'] = 'Asia/Kolkata'; // Default if needed
		}

		// Call the backend API with query parameters
		const backendUrlWithParams = new URL(backendUrl);
		backendUrlWithParams.searchParams.append('games_per_set', gamesPerSet);
		backendUrlWithParams.searchParams.append('total_games', totalGames);

		const backendResponse = await fetch(backendUrlWithParams.toString(), {
			method: 'GET',
			headers,
			cache: 'no-store', // Ensure fresh data
		});

		// Check if the response was successful
		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error('API request failed (game-sets):', errorText);
			throw new Error(
				`Backend API (game-sets) responded with status: ${backendResponse.status} - ${errorText}`
			);
		}

		// Get the response data
		const data = await backendResponse.json();

		// API response structure should be consistent (status, data: { intervals: [...] })
		if (data.status !== 'success' || !data.data?.intervals) {
			console.warn(
				'Unexpected API structure or error from game-sets endpoint:',
				data
			);
			// Return success but with empty data
			return NextResponse.json({
				status: 'success',
				data: {
					min_value: numericValue,
					games_per_set: numericGamesPerSet,
					total_games: numericTotalGames,
					count: 0,
					intervals: [], // Ensure intervals is always an array
				},
				message: data.message || 'No data found or unexpected format',
			});
		}

		// Return the successful data as received
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error proxying game-sets API request:', error);

		// Return an appropriate error response
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to fetch game-set interval data from the API',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
