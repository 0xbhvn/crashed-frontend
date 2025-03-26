'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponseSchema, createEmptyResponse } from '@/models/game';
import type { ApiResponse, Game } from '@/models/game';
import type { SortingState } from '@tanstack/react-table';
import { useWebSocketGames } from './useWebsocketGames';

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
	initialPerPage = 25,
	enableRealtime = true,
}: UseGamesDataProps = {}): UseGamesDataReturn {
	const [page, setPage] = useState(initialPage);
	const [perPage, setPerPage] = useState(initialPerPage);
	const [apiData, setApiData] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [dataValidationIssues, setDataValidationIssues] = useState(false);

	// Add state for WebSocket-received games
	const [wsGames, setWsGames] = useState<Game[]>([]);

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'gameId',
			desc: true,
		},
	]);

	// Use the WebSocket hook to get real-time game updates
	const { newGames, connectionStatus, clearNewGames } = useWebSocketGames();

	// Flag to track if we need to refresh the current page after incorporating new games
	const [needsPageRefresh, setNeedsPageRefresh] = useState(false);

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
					const result = ApiResponseSchema.safeParse(rawData);

					if (result.success) {
						validatedData = result.data;
					} else {
						// If validation fails, set flag and create empty response
						setDataValidationIssues(true);
						validatedData = createEmptyResponse(page, perPage);
					}
				} catch {
					setDataValidationIssues(true);
					// Create a minimal valid structure to prevent UI errors
					validatedData = createEmptyResponse(page, perPage);
				}

				setApiData(validatedData);
				setError(null);
			} catch {
				// Log API fetch errors and update UI state
				setError('Failed to load data. Please try again later.');
				setApiData(createEmptyResponse(page, perPage));
			} finally {
				setLoading(false);
			}
		}

		fetchGames();
	}, [page, perPage]);

	// Track WebSocket received games separately
	useEffect(() => {
		if (newGames.length > 0) {
			setWsGames((prevWsGames) => {
				// Add only games we don't already have
				const existingIds = new Set(
					prevWsGames.map((game) => game.gameId)
				);
				const uniqueNewGames = newGames.filter(
					(game) => !existingIds.has(game.gameId)
				);

				// Return unchanged array if no new unique games
				if (uniqueNewGames.length === 0) return prevWsGames;

				// Add new games to our WebSocket games list
				return [...uniqueNewGames, ...prevWsGames];
			});

			// Clear the newGames list in the WebSocket hook
			clearNewGames();
		}
	}, [newGames, clearNewGames]);

	// Modified incorporate function to properly merge WS games with API data
	const incorporateNewGames = useCallback(() => {
		if (wsGames.length === 0 || !apiData) return;

		// Properly merge WebSocket games with API data
		setApiData((prevData) => {
			if (!prevData) return prevData;

			// Get existing game IDs to avoid duplicates
			const existingIds = new Set(
				prevData.data.map((game) => game.gameId)
			);

			// Filter out any duplicate games from wsGames
			const uniqueNewGames = wsGames.filter(
				(game) => !existingIds.has(game.gameId)
			);

			if (uniqueNewGames.length === 0) return prevData;

			// Calculate new pagination info
			const newTotalItems =
				prevData.pagination.total_items + uniqueNewGames.length;
			const newTotalPages = Math.ceil(newTotalItems / perPage);

			// The correct handling depends on which page we're currently viewing
			if (page === 1) {
				// If we're on page 1, prepend the new games to the current page data
				const updatedData = [...uniqueNewGames, ...prevData.data].slice(
					0,
					perPage
				);

				return {
					status: prevData.status,
					count: prevData.count + uniqueNewGames.length,
					data: updatedData,
					pagination: {
						...prevData.pagination,
						total_items: newTotalItems,
						total_pages: newTotalPages,
						has_next: newTotalPages > 1,
					},
				};
			}

			// If we're NOT on page 1, set the flag to trigger a refetch
			if (page > 1) {
				setNeedsPageRefresh(true);
			}

			// Return updated data but keep the same page content for now
			return {
				...prevData,
				count: prevData.count + uniqueNewGames.length,
				pagination: {
					...prevData.pagination,
					total_items: newTotalItems,
					total_pages: newTotalPages,
					has_next: page < newTotalPages,
				},
			};
		});

		// Clear the WebSocket games list after incorporating
		setWsGames([]);
	}, [wsGames, apiData, perPage, page]);

	// Handle page refresh when needed (separate from the incorporateNewGames callback)
	useEffect(() => {
		if (needsPageRefresh) {
			// Reset the flag
			setNeedsPageRefresh(false);

			// Get current page info
			const currentPage = page;
			const currentPerPage = perPage;

			// Instead of just fetching the last item of the previous page,
			// we fetch the entire current page data but without showing loading state
			(async () => {
				try {
					// Fetch the fresh data for the current page
					const res = await fetch(
						`/api/games?per_page=${currentPerPage}&page=${currentPage}`
					);

					if (!res.ok) {
						throw new Error(`API error: ${res.status}`);
					}

					const rawData = await res.json();
					const result = ApiResponseSchema.safeParse(rawData);

					if (!result.success) {
						console.error('Validation errors during smart refresh');
						return;
					}

					const freshData = result.data;

					// Only update if we have both current and fresh data
					if (apiData && freshData) {
						// Compare the current and fresh data to see what's changed
						const currentIds = apiData.data.map(
							(game) => game.gameId
						);
						const freshIds = freshData.data.map(
							(game) => game.gameId
						);

						// Check if any changes are needed
						const needsUpdate = !arraysEqual(currentIds, freshIds);

						if (needsUpdate) {
							// Update only the data portion without showing loading state
							setApiData({
								...apiData,
								data: freshData.data,
								count: freshData.count,
								pagination: freshData.pagination,
							});
						}
					}
				} catch {
					// Fallback to full page refresh on error
					await fetchFullPage(currentPage, currentPerPage);
				}
			})();
		}
	}, [needsPageRefresh, page, perPage, apiData]);

	// Helper function to compare arrays
	const arraysEqual = <T>(a: T[], b: T[]): boolean => {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	};

	// Helper function to fetch a full page of data (used as fallback)
	const fetchFullPage = async (pageNumber: number, itemsPerPage: number) => {
		try {
			setLoading(true);

			const res = await fetch(
				`/api/games?per_page=${itemsPerPage}&page=${pageNumber}`
			);

			if (!res.ok) {
				throw new Error(`API error: ${res.status}`);
			}

			const rawData = await res.json();
			const result = ApiResponseSchema.safeParse(rawData);

			if (result.success) {
				setApiData(result.data);
			} else {
				// Handle validation failure silently
				setDataValidationIssues(true);
			}
		} catch {
			// Error already handled by setting error state
			setError('Failed to refresh data. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return {
		// Only combine WebSocket games with API data if they haven't been incorporated yet
		// AND enableRealtime is true (auto-refresh is ON)
		apiData: apiData
			? {
					...apiData,
					// Only merge websocket games for display when enableRealtime is true
					data: enableRealtime
						? [...wsGames, ...(apiData?.data || [])].slice(
								0,
								perPage
						  )
						: apiData.data,
			  }
			: null,
		loading,
		error,
		dataValidationIssues,
		page,
		perPage,
		sorting,
		// Always track the count regardless of enableRealtime setting
		newGamesCount: wsGames.length,
		connectionStatus,
		setPage,
		setPerPage,
		setSorting,
		incorporateNewGames,
	};
}
