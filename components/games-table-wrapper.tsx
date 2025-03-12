'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GamesTable } from '@/components/games-table';
import { useGamesData } from '@/hooks/use-games-data';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function GamesTableWrapper() {
	// Add a key to force re-render when new games are added
	const [tableKey, setTableKey] = useState(0);

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

	const { newGamesCount, connectionStatus, incorporateNewGames, perPage } =
		gamesDataHook;

	// Sync the perPage state whenever it changes in the hook
	useEffect(() => {
		if (perPage !== currentPerPage) {
			console.log(
				`Syncing perPage from hook: ${perPage} (current: ${currentPerPage})`
			);
			setCurrentPerPage(perPage);
		}
	}, [perPage, currentPerPage]);

	// Handle refresh button click - update games and force table to re-render
	const handleRefresh = useCallback(() => {
		incorporateNewGames();
		// Force a re-render of the GamesTable component
		setTableKey((prev) => prev + 1);

		// Only show success toast for manual refresh
		if (!autoRefresh || newGamesCount === 0) {
			toast.success('Games updated!');
		}
	}, [incorporateNewGames, autoRefresh, newGamesCount]);

	// Show a toast notification when new games are available
	// and auto-incorporate them if autoRefresh is enabled
	useEffect(() => {
		if (newGamesCount > 0) {
			// Only show the toast for the first time when new games arrive
			toast.info(
				`${newGamesCount} new game${
					newGamesCount === 1 ? '' : 's'
				} available${autoRefresh ? ' - Auto-refreshing...' : ''}`,
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
	}, [newGamesCount, autoRefresh, handleRefresh]);

	// Toggle auto-refresh setting
	const toggleAutoRefresh = () => {
		setAutoRefresh(!autoRefresh);
		toast.info(`Auto-refresh ${!autoRefresh ? 'enabled' : 'disabled'}`, {
			duration: 2000,
		});
	};

	return (
		<div className="flex flex-col gap-4 w-full">
			{connectionStatus === 'Connected' && (
				<div className="flex justify-between w-full items-center">
					<Button
						variant="outline"
						size="sm"
						onClick={toggleAutoRefresh}
						className={autoRefresh ? 'bg-green-100' : ''}
					>
						Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
					</Button>

					{newGamesCount > 0 && !autoRefresh && (
						<Button
							className="bg-blue-500 hover:bg-blue-600 text-white"
							onClick={handleRefresh}
						>
							{newGamesCount} new game
							{newGamesCount === 1 ? '' : 's'} available - Click
							to refresh
						</Button>
					)}
				</div>
			)}
			<GamesTable
				key={tableKey} // Add key to force re-render when new games are added
				gamesDataHook={gamesDataHook} // Pass the entire hook instance
			/>
		</div>
	);
}
