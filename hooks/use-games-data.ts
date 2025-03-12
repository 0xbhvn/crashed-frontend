'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponseSchema, createEmptyResponse } from '@/models/game';
import type { ApiResponse } from '@/models/game';
import type { SortingState } from '@tanstack/react-table';
import { useWebSocketGames } from './use-websocket-games';

interface UseGamesDataProps {
	initialPage?: number;
	initialPerPage?: number;
	enableRealtime?: boolean;
}

interface UseGamesDataReturn {
	apiData: ApiResponse | null;
	loading: boolean;
	error: string | null;
	dataValidationIssues: boolean;
	page: number;
	perPage: number;
	sorting: SortingState;
	newGamesCount: number;
	connectionStatus: string;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
	setSorting: (sorting: SortingState) => void;
	incorporateNewGames: () => void;
}

export function useGamesData({
	initialPage = 1,
	initialPerPage = 10,
	enableRealtime = true,
}: UseGamesDataProps = {}): UseGamesDataReturn {
	const [page, setPage] = useState(initialPage);
	const [perPage, setPerPage] = useState(initialPerPage);
	const [apiData, setApiData] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [dataValidationIssues, setDataValidationIssues] = useState(false);

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'gameId',
			desc: true,
		},
	]);

	// Use the WebSocket hook to get real-time game updates
	const { newGames, connectionStatus, clearNewGames } = useWebSocketGames();

	// Fetch data from API
	useEffect(() => {
		async function fetchGames() {
			setLoading(true);
			setDataValidationIssues(false);

			try {
				// Use our local API proxy instead of calling the external API directly
				const res = await fetch(
					`/api/games?per_page=${perPage}&page=${page}`
				);
				if (!res.ok) {
					throw new Error(`API error: ${res.status}`);
				}

				let rawData: unknown;
				try {
					rawData = await res.json();
				} catch (parseError) {
					throw new Error('Failed to parse API response', {
						cause: parseError,
					});
				}

				// Validate using Zod schema
				let validatedData: ApiResponse;
				try {
					// Parse the data with Zod schema
					console.log(
						'API raw data:',
						JSON.stringify(rawData, null, 2)
					); // Debug response
					const result = ApiResponseSchema.safeParse(rawData);

					if (result.success) {
						validatedData = result.data;
						console.log('Validation successful:', validatedData);
					} else {
						// If validation fails, set flag and create empty response
						console.error(
							'Validation errors:',
							JSON.stringify(result.error.format(), null, 2)
						);
						setDataValidationIssues(true);
						validatedData = createEmptyResponse(page, perPage);
					}
				} catch (validationError) {
					setDataValidationIssues(true);
					// Create a minimal valid structure to prevent UI errors
					validatedData = createEmptyResponse(page, perPage);
					console.error('Failed to validate data:', validationError);
				}

				setApiData(validatedData);
				setError(null);
			} catch (err) {
				console.error('Failed to fetch games:', err);
				setError('Failed to load data. Please try again later.');
				setApiData(createEmptyResponse(page, perPage));
			} finally {
				setLoading(false);
			}
		}

		fetchGames();
	}, [page, perPage]);

	// Function to incorporate new games into the API data
	const incorporateNewGames = useCallback(() => {
		if (newGames.length === 0 || !apiData) return;

		setApiData((prevData) => {
			if (!prevData) return prevData;

			// Create a new data array with the new games and existing games
			const updatedData = [...newGames, ...prevData.data];

			// Update the pagination and count info
			return {
				...prevData,
				count: prevData.count + newGames.length,
				data: updatedData.slice(0, perPage), // Keep only 'perPage' number of games
				pagination: {
					...prevData.pagination,
					total_items:
						prevData.pagination.total_items + newGames.length,
					total_pages: Math.ceil(
						(prevData.pagination.total_items + newGames.length) /
							perPage
					),
				},
			};
		});

		// Clear the new games list after incorporating
		clearNewGames();
	}, [newGames, apiData, perPage, clearNewGames]);

	return {
		apiData,
		loading,
		error,
		dataValidationIssues,
		page,
		perPage,
		sorting,
		newGamesCount: enableRealtime ? newGames.length : 0,
		connectionStatus,
		setPage,
		setPerPage,
		setSorting,
		incorporateNewGames,
	};
}
