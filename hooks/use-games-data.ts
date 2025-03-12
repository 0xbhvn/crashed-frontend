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

// Export the interface for use in other components
export interface UseGamesDataReturn {
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

		console.log('Incorporating new games:', newGames);

		setApiData((prevData) => {
			if (!prevData) return prevData;

			// Create a new data array with the new games at the beginning
			// followed by the existing games, but remove duplicates
			const existingIds = new Set(
				prevData.data.map((game) => game.gameId)
			);
			const uniqueNewGames = newGames.filter(
				(game) => !existingIds.has(game.gameId)
			);

			// Add the unique new games to the beginning followed by existing data
			// but limit to perPage total items to maintain correct page size
			const updatedData = [...uniqueNewGames, ...prevData.data].slice(
				0,
				perPage
			);

			// Calculate new pagination info
			const newTotalItems =
				prevData.pagination.total_items + uniqueNewGames.length;
			const newTotalPages = Math.ceil(newTotalItems / perPage);

			console.log('Updated data preview:', updatedData.slice(0, 3));
			console.log('New total items:', newTotalItems);
			console.log(
				'Table will display exactly',
				updatedData.length,
				'rows (perPage:',
				perPage,
				')'
			);

			// Create an entirely new object to ensure React detects the change
			const newApiData = {
				status: prevData.status,
				count: prevData.count + uniqueNewGames.length,
				// Create a new array with the updated data to ensure React detects the change
				data: updatedData,
				pagination: {
					...prevData.pagination,
					total_items: newTotalItems,
					total_pages: newTotalPages,
					has_next: page < newTotalPages,
				},
			};

			console.log(
				'New data created with length:',
				newApiData.data.length
			);
			return newApiData;
		});

		// Clear the new games list after incorporating
		clearNewGames();
	}, [newGames, apiData, perPage, clearNewGames, page]);

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
