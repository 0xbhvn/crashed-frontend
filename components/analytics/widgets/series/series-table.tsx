'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { GameObject } from './types';

export interface SeriesData {
	length: number;
	start_game_id: string;
	end_game_id: string;
	start_time: string;
	end_time: string;
	follow_streak?: {
		count: number;
		games?: (GameObject | string)[];
	};
}

interface SeriesTableProps {
	topSeries: SeriesData[];
	value: number;
	sortBy: 'time' | 'length';
}

export function SeriesTable({ topSeries, value, sortBy }: SeriesTableProps) {
	return (
		<div className="mt-6">
			<h4 className="text-sm font-medium mb-2">
				{sortBy === 'length'
					? `Longest series until ${value}x crash:`
					: `Most recent series until ${value}x crash:`}
			</h4>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b">
							<th className="text-left font-medium pb-2">
								Length
							</th>
							<th className="text-left font-medium pb-2">
								Start Game
							</th>
							<th className="text-left font-medium pb-2">
								End Game
							</th>
							<th className="text-left font-medium pb-2">
								Start Time
							</th>
							<th className="text-left font-medium pb-2">
								End Time
							</th>
							<th className="text-left font-medium pb-2">
								Following Crash
							</th>
						</tr>
					</thead>
					<tbody>
						{topSeries.map((series) => {
							const isSingleGame = series.length === 1;

							return (
								<tr
									key={`series-${series.start_game_id}-${series.end_game_id}`}
									className="border-b border-border/30 hover:bg-muted/30"
								>
									<td className="py-2">
										{isSingleGame
											? '1 game'
											: `${series.length} games`}
									</td>
									<td className="py-2">
										#{series.start_game_id}
									</td>
									<td className="py-2">
										#{series.end_game_id}
									</td>
									<td className="py-2">
										{format(
											new Date(series.start_time),
											'MMM d, yyyy h:mm a'
										)}
									</td>
									<td className="py-2">
										{format(
											new Date(series.end_time),
											'MMM d, yyyy h:mm a'
										)}
									</td>
									<td className="py-2 font-medium">
										{series.follow_streak?.games &&
										series.follow_streak.games.length > 0
											? typeof series.follow_streak
													.games[0] === 'object'
												? `${(
														series.follow_streak
															.games[0] as GameObject
												  ).crash_point?.toFixed(2)}x`
												: (
														series.follow_streak
															.games[0] as string
												  ).split('@')[1]
											: '-'}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
