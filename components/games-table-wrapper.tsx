'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GamesTable } from '@/components/games-table';
import { useGamesData } from '@/hooks/use-games-data';
import { toast } from 'sonner';

export default function GamesTableWrapper() {
	// Remove the tableKey state as we don't need to force re-renders anymore

	// Initialize with default page size
	const [currentPerPage, setCurrentPerPage] = useState(25);

	// Initialize with default crash point threshold (10)
	const [crashPointThreshold, setCrashPointThreshold] = useState(10);

	// Load the saved threshold from localStorage on the client side only
	useEffect(() => {
		// Check if we're in the browser
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('crashPointThreshold');
			if (saved) {
				setCrashPointThreshold(Number(saved));
			}
		}
	}, []);

	// Save crash point threshold to localStorage when it changes (client-side only)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'crashPointThreshold',
				crashPointThreshold.toString()
			);
		}
	}, [crashPointThreshold]);

	// Track if auto-refresh is enabled (default: true)
	const [autoRefresh, setAutoRefresh] = useState(true);

	// Create a single instance of the games data hook to share with the table
	const gamesDataHook = useGamesData({
		initialPage: 1,
		initialPerPage: currentPerPage,
		enableRealtime: autoRefresh,
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

	// Update the hook's enableRealtime setting when autoRefresh changes
	useEffect(() => {
		// This ensures the hook's enableRealtime setting stays in sync with autoRefresh
		console.log(`Auto-refresh ${autoRefresh ? 'enabled' : 'disabled'}`);
	}, [autoRefresh]);

	// Handle refresh button click - just update games without forcing re-render
	const handleRefresh = useCallback(() => {
		if (newGamesCount > 0) {
			console.log(`Incorporating ${newGamesCount} new games into table`);
			incorporateNewGames();

			// Simplified toast message
			toast.success(
				`${newGamesCount} new game${
					newGamesCount === 1 ? '' : 's'
				} added!`
			);
		} else {
			incorporateNewGames();
			// Only show success toast for manual refresh
			if (!autoRefresh) {
				toast.success('Games updated!');
			}
		}
	}, [incorporateNewGames, autoRefresh, newGamesCount]);

	// Show a toast notification when new games are available
	// and auto-incorporate them if autoRefresh is enabled
	useEffect(() => {
		if (newGamesCount > 0) {
			// Only show the "available" toast when auto-refresh is OFF
			if (!autoRefresh) {
				// Simplified toast message
				toast.info(
					`${newGamesCount} new game${
						newGamesCount === 1 ? '' : 's'
					} available`,
					{
						duration: 4000,
						position: 'top-right',
					}
				);
			}

			// Auto-incorporate new games if enabled
			if (autoRefresh) {
				handleRefresh();
			}
		}
	}, [newGamesCount, autoRefresh, handleRefresh]);

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
				gamesDataHook={gamesDataHook}
				autoRefreshEnabled={autoRefresh}
				onAutoRefreshToggle={handleAutoRefreshToggle}
				newGamesCount={newGamesCount}
				onRefreshClick={handleRefresh}
				crashPointThreshold={crashPointThreshold}
				onCrashPointThresholdChange={setCrashPointThreshold}
			/>
		</div>
	);
}
