'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useMovingAverages } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function MovingAveragesWidget({ className }: BaseWidgetProps) {
	const [windows, setWindows] = React.useState<number[]>([5, 10, 20]);
	const [windowsInput, setWindowsInput] = React.useState<string>('5,10,20');
	const [limit, setLimit] = React.useState<number>(1000);
	const [limitInput, setLimitInput] = React.useState<string>('1000');

	const {
		data,
		isLoading,
		error,
		refreshData,
	} = useMovingAverages({
		windows,
		limit,
		enabled: true,
	});

	const handleWindowsChange = () => {
		try {
			const newWindows = windowsInput
				.split(',')
				.map(w => parseInt(w.trim()))
				.filter(w => !isNaN(w) && w > 0);
			
			if (newWindows.length > 0) {
				setWindows(newWindows);
			}
		} catch (err) {
			console.error('Invalid windows format');
		}
	};

	const handleLimitChange = () => {
		const newLimit = parseInt(limitInput);
		if (!isNaN(newLimit) && newLimit > 0) {
			setLimit(newLimit);
		}
	};

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<TrendingUp className="h-5 w-5" />
						Moving Averages Analysis
					</CardTitle>
					<CardDescription>
						Analyze moving averages of crash points over different window sizes
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Controls */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="windows">Window Sizes</Label>
							<div className="flex gap-2">
								<Input
									id="windows"
									value={windowsInput}
									onChange={(e) => setWindowsInput(e.target.value)}
									placeholder="5,10,20"
									className="flex-1"
								/>
								<Button
									onClick={handleWindowsChange}
									variant="outline"
									size="sm"
								>
									Apply
								</Button>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="limit">Games to Analyze</Label>
							<div className="flex gap-2">
								<Input
									id="limit"
									value={limitInput}
									onChange={(e) => setLimitInput(e.target.value)}
									placeholder="1000"
									className="flex-1"
								/>
								<Button
									onClick={handleLimitChange}
									variant="outline"
									size="sm"
								>
									Apply
								</Button>
							</div>
						</div>
						<div className="flex items-end">
							<Button
								onClick={refreshData}
								disabled={isLoading}
								className="w-full"
							>
								{isLoading ? (
									<RefreshCw className="h-4 w-4 animate-spin mr-2" />
								) : (
									<RefreshCw className="h-4 w-4 mr-2" />
								)}
								Refresh
							</Button>
						</div>
					</div>

					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{data && (
						<div className="space-y-6">
							{/* Summary */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm">Total Games</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-2xl font-bold">{data.total_games.toLocaleString()}</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm">Latest Game</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											{new Date(data.latest_game_time).toLocaleString()}
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm">Windows Analyzed</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex flex-wrap gap-1">
											{windows.map((window) => (
												<Badge key={window} variant="secondary">
													{window}
												</Badge>
											))}
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Moving Averages Data */}
							<div className="space-y-4">
								{Object.entries(data.moving_averages).map(([key, windowData]) => {
									if ('error' in windowData) {
										return (
											<Alert key={key} variant="destructive">
												<AlertCircle className="h-4 w-4" />
												<AlertDescription>
													Window {key}: {windowData.error}
												</AlertDescription>
											</Alert>
										);
									}

									return (
										<Card key={key}>
											<CardHeader>
												<CardTitle className="text-lg">
													{key.replace('ma_', 'Moving Average - ')} Games
												</CardTitle>
												<CardDescription>
													Window Size: {windowData.window_size} | Data Points: {windowData.data_points}
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												{/* Statistics */}
												<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
													<div>
														<Label className="text-xs text-muted-foreground">Current MA</Label>
														<p className="font-semibold">
															{windowData.current_ma?.toFixed(2) || 'N/A'}
														</p>
													</div>
													<div>
														<Label className="text-xs text-muted-foreground">Average MA</Label>
														<p className="font-semibold">
															{windowData.average_ma?.toFixed(2) || 'N/A'}
														</p>
													</div>
													<div>
														<Label className="text-xs text-muted-foreground">Min MA</Label>
														<p className="font-semibold">
															{windowData.min_ma?.toFixed(2) || 'N/A'}
														</p>
													</div>
													<div>
														<Label className="text-xs text-muted-foreground">Max MA</Label>
														<p className="font-semibold">
															{windowData.max_ma?.toFixed(2) || 'N/A'}
														</p>
													</div>
													<div>
														<Label className="text-xs text-muted-foreground">Std Dev</Label>
														<p className="font-semibold">
															{windowData.std_dev_ma?.toFixed(2) || 'N/A'}
														</p>
													</div>
												</div>

												{/* Recent Data Table */}
												{windowData.recent_data && windowData.recent_data.length > 0 && (
													<div>
														<Label className="text-sm font-medium">Recent Data Points</Label>
														<div className="mt-2 border rounded-md">
															<Table>
																<TableHeader>
																	<TableRow>
																		<TableHead>Game ID</TableHead>
																		<TableHead>Crash Point</TableHead>
																		<TableHead>Moving Average</TableHead>
																		<TableHead>Trend</TableHead>
																		<TableHead>Time</TableHead>
																	</TableRow>
																</TableHeader>
																<TableBody>
																	{windowData.recent_data.slice(-5).map((point, index) => {
																		const previousPoint = index > 0 ? windowData.recent_data[windowData.recent_data.length - 5 + index - 1] : null;
																		const trend = previousPoint 
																			? point.moving_average > previousPoint.moving_average ? 'up' : 'down'
																			: 'neutral';
																		
																		return (
																			<TableRow key={point.game_id}>
																				<TableCell className="font-mono">
																					{point.game_id}
																				</TableCell>
																				<TableCell>
																					{point.crash_point.toFixed(2)}x
																				</TableCell>
																				<TableCell className="font-semibold">
																					{point.moving_average.toFixed(2)}
																				</TableCell>
																				<TableCell>
																					{trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
																					{trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
																					{trend === 'neutral' && <span className="text-muted-foreground">-</span>}
																				</TableCell>
																				<TableCell className="text-sm text-muted-foreground">
																					{new Date(point.time).toLocaleTimeString()}
																				</TableCell>
																			</TableRow>
																		);
																	})}
																</TableBody>
															</Table>
														</div>
													</div>
												)}
											</CardContent>
										</Card>
									);
								})}
							</div>
						</div>
					)}

					{isLoading && !data && (
						<div className="flex items-center justify-center py-8">
							<RefreshCw className="h-6 w-6 animate-spin mr-2" />
							<span>Loading moving averages data...</span>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}