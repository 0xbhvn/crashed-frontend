'use client';

import React from 'react';
import { GamesTable } from '@/components/games-table';
import { useGamesData } from '@/hooks/use-games-data';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function GamesTableWrapper() {
	const { newGamesCount, connectionStatus, incorporateNewGames } =
		useGamesData({
			initialPage: 1,
			initialPerPage: 25,
			enableRealtime: true,
		});

	// Show a toast notification when new games are available
	React.useEffect(() => {
		if (newGamesCount > 0) {
			// Only show the toast for the first time when new games arrive
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
	}, [newGamesCount]);

	return (
		<div className="flex flex-col gap-4 w-full">
			{connectionStatus === 'Connected' && newGamesCount > 0 && (
				<div className="flex justify-center w-full">
					<Button
						className="bg-blue-500 hover:bg-blue-600 text-white"
						onClick={() => {
							incorporateNewGames();
							toast.success('Games updated!');
						}}
					>
						{newGamesCount} new game{newGamesCount === 1 ? '' : 's'}{' '}
						available - Click to refresh
					</Button>
				</div>
			)}
			<GamesTable
				initialPage={1}
				initialPerPage={25}
			/>
		</div>
	);
}
