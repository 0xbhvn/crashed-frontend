'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
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
	showCircles: boolean;
}

export function SeriesTable({
	topSeries,
	value,
	sortBy,
	showCircles,
}: SeriesTableProps) {
	return (
		<div className="mt-6">
			<h4 className="text-sm font-medium mb-2">
				{sortBy === 'length'
					? `Longest series without ${value}x or higher:`
					: `Most recent series without ${value}x or higher:`}
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
								Follow Streak
							</th>
						</tr>
					</thead>
					<tbody>
						{topSeries.map((series) => (
							<tr
								key={`series-${series.start_game_id}-${series.end_game_id}`}
								className="border-b border-border/30 hover:bg-muted/30"
							>
								<td className="py-2">{series.length} games</td>
								<td className="py-2">
									#{series.start_game_id}
								</td>
								<td className="py-2">#{series.end_game_id}</td>
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
								<td className="py-2">
									{series.follow_streak?.count ? (
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<div className="font-medium">
														{
															series.follow_streak
																.count
														}
													</div>
												</TooltipTrigger>
												<TooltipContent>
													<p className="text-xs">
														<span className="font-medium">
															{
																series
																	.follow_streak
																	.count
															}
														</span>{' '}
														{series.follow_streak
															.count === 1
															? 'game'
															: 'games'}{' '}
														followed
													</p>
													{/* Only show games list if circles are visible */}
													{showCircles &&
														series.follow_streak
															.games &&
														series.follow_streak
															.games.length >
															0 && (
															<div className="text-xs mt-2 border-t border-border/30 pt-1.5">
																<div className="font-medium mb-1">
																	Games that
																	followed{' '}
																	{value}x:
																</div>
																<div className="rounded overflow-hidden border border-border/30">
																	<table className="w-full">
																		<tbody>
																			{series.follow_streak.games.map(
																				(
																					game:
																						| string
																						| GameObject,
																					i: number
																				) => {
																					// Format the game information
																					let gameId: string;
																					let crashPoint: string;

																					if (
																						typeof game ===
																							'object' &&
																						game !==
																							null
																					) {
																						gameId = `#${
																							game.game_id ||
																							'unknown'
																						}`;
																						crashPoint = `${
																							game.crash_point?.toFixed(
																								2
																							) ||
																							'?.??'
																						}x`;
																					} else {
																						// Handle string format which should be "#GAMEID@CRASHPOINTx"
																						const parts =
																							String(
																								game
																							).split(
																								'@'
																							);
																						gameId =
																							parts[0];
																						crashPoint =
																							parts.length >
																							1
																								? parts[1]
																								: '';
																					}

																					return (
																						<tr
																							key={
																								typeof game ===
																									'object' &&
																								game?.game_id
																									? `table-game-${game.game_id}`
																									: `table-game-${series.end_game_id}-${i}`
																							}
																							className={
																								i %
																									2 ===
																								0
																									? 'bg-muted/30'
																									: ''
																							}
																						>
																							<td className="px-2 py-1">
																								{
																									gameId
																								}
																							</td>
																							<td className="px-2 py-1 text-right font-medium">
																								{
																									crashPoint
																								}
																							</td>
																						</tr>
																					);
																				}
																			)}
																		</tbody>
																	</table>
																</div>
															</div>
														)}
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									) : (
										<span className="text-muted-foreground">
											None
										</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
