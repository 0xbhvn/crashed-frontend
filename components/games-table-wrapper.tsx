'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GamesTable } from '@/components/games-table';
import { useGamesData } from '@/hooks/use-games-data';
import { toast } from 'sonner';

export default function GamesTableWrapper() {
	// Remove the tableKey state as we don't need to force re-renders anymore

	// Initialize with default page size
	const [currentPerPage, setCurrentPerPage] = useState(25);

	// Track if auto-refresh is enabled (default: true)
	const [autoRefresh, setAutoRefresh] = useState(true);

	// Create a single instance of the games data hook to share with the table
	const gamesDataHook = useGamesData({
		initialPage: 1,
		initialPerPage: currentPerPage,
		enableRealtime: true,
	});

	const { newGamesCount, incorporateNewGames, perPage } = gamesDataHook;

	// Sync the perPage state whenever it changes in the hook
	useEffect(() => {
		if (perPage !== currentPerPage) {
			console.log(
				`Syncing perPage from hook: ${perPage} (current: ${currentPerPage})`
			);
			setCurrentPerPage(perPage);
		}
	}, [perPage, currentPerPage]);

	// Handle refresh button click - just update games without forcing re-render
	const handleRefresh = useCallback(() => {
		const currentPage = gamesDataHook.page;

		if (newGamesCount > 0) {
			console.log(`Incorporating ${newGamesCount} new games into table`);
			incorporateNewGames();

			// Different message based on which page we're on
			if (currentPage === 1) {
				toast.success(
					`${newGamesCount} new game${
						newGamesCount === 1 ? '' : 's'
					} added to table!`
				);
			} else {
				toast.success(
					`${newGamesCount} new game${
						newGamesCount === 1 ? '' : 's'
					} added to page 1 and your view has been updated.`
				);
			}
		} else {
			incorporateNewGames();
			// Only show success toast for manual refresh
			if (!autoRefresh) {
				toast.success('Games updated!');
			}
		}
	}, [incorporateNewGames, autoRefresh, newGamesCount, gamesDataHook.page]);

	// Show a toast notification when new games are available
	// and auto-incorporate them if autoRefresh is enabled
	useEffect(() => {
		if (newGamesCount > 0) {
			// Get the current page from the hook
			const currentPage = gamesDataHook.page;

			// Only show the toast for the first time when new games arrive
			// Add page information if not on page 1
			const pageInfo =
				currentPage > 1
					? ` (added to page 1${
							autoRefresh
								? ' and refreshing your current view'
								: ''
					  })`
					: '';

			toast.info(
				`${newGamesCount} new game${
					newGamesCount === 1 ? '' : 's'
				} available${pageInfo}${
					autoRefresh ? ' - Auto-refreshing...' : ''
				}`,
				{
					duration: 4000,
					position: 'top-right',
				}
			);

			// Auto-incorporate new games if enabled
			if (autoRefresh) {
				handleRefresh();
			}
		}
	}, [newGamesCount, autoRefresh, handleRefresh, gamesDataHook.page]);

	// Toggle auto-refresh setting
	const handleAutoRefreshToggle = () => {
		setAutoRefresh((prev) => !prev);
		toast.info(`Auto-refresh ${!autoRefresh ? 'enabled' : 'disabled'}`, {
			duration: 2000,
		});
	};

	return (
		<div className="flex flex-col gap-4 w-full">
			<GamesTable
				gamesDataHook={gamesDataHook} // Pass the entire hook instance
				// Pass auto-refresh props to be used in TableControlsHeader
				autoRefreshEnabled={autoRefresh}
				onAutoRefreshToggle={handleAutoRefreshToggle}
				newGamesCount={newGamesCount}
				onRefreshClick={handleRefresh}
			/>
		</div>
	);
}
