'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, RefreshCw, Flame, Snowflake, Target, Clock } from 'lucide-react';
import { useStreakAnalysis } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import type { Streak } from '@/hooks/analytics/statistical-models/useStreakAnalysis';

export function StreakAnalysisWidget({ className }: BaseWidgetProps) {
	const [thresholdHigh, setThresholdHigh] = React.useState<number>(5.0);
	const [thresholdHighInput, setThresholdHighInput] = React.useState<string>('5.0');
	const [thresholdLow, setThresholdLow] = React.useState<number>(2.0);
	const [thresholdLowInput, setThresholdLowInput] = React.useState<string>('2.0');
	const [minLength, setMinLength] = React.useState<number>(3);
	const [minLengthInput, setMinLengthInput] = React.useState<string>('3');
	const [limit, setLimit] = React.useState<number>(1000);
	const [limitInput, setLimitInput] = React.useState<string>('1000');

	const {
		data,
		isLoading,
		error,
		refreshData,
	} = useStreakAnalysis({
		thresholdHigh,
		thresholdLow,
		minLength,
		limit,
		enabled: true,
	});

	const handleThresholdHighChange = () => {
		const newThreshold = parseFloat(thresholdHighInput);
		if (!isNaN(newThreshold) && newThreshold > 0) {
			setThresholdHigh(newThreshold);
		}
	};

	const handleThresholdLowChange = () => {
		const newThreshold = parseFloat(thresholdLowInput);
		if (!isNaN(newThreshold) && newThreshold > 0) {
			setThresholdLow(newThreshold);
		}
	};

	const handleMinLengthChange = () => {
		const newMinLength = parseInt(minLengthInput);
		if (!isNaN(newMinLength) && newMinLength > 0) {
			setMinLength(newMinLength);
		}
	};

	const handleLimitChange = () => {
		const newLimit = parseInt(limitInput);
		if (!isNaN(newLimit) && newLimit > 0) {
			setLimit(newLimit);
		}
	};

	const formatDuration = (startTime: string, endTime: string) => {
		const start = new Date(startTime);
		const end = new Date(endTime);
		const diffMs = end.getTime() - start.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMins / 60);
		
		if (diffHours > 0) {
			return `${diffHours}h ${diffMins % 60}m`;
		}
		return `${diffMins}m`;
	};

	const StreakCard = ({ streak, type }: { streak: Streak; type: 'hot' | 'cold' }) => (
		<Card className="mb-4">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base flex items-center gap-2">
						{type === 'hot' ? (
							<Flame className="h-4 w-4 text-red-500" />
						) : (
							<Snowflake className="h-4 w-4 text-blue-500" />
						)}
						{type === 'hot' ? 'Hot' : 'Cold'} Streak - {streak.length} Games
						{streak.is_ongoing && (
							<Badge variant="destructive" className="ml-2">
								Ongoing
							</Badge>
						)}
					</CardTitle>
					<Badge variant="outline">
						Avg: {streak.average_crash_point.toFixed(2)}x
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
					<div>
						<Label className="text-xs text-muted-foreground">Start Game</Label>
						<p className="font-mono">{streak.start_game_id}</p>
					</div>
					<div>
						<Label className="text-xs text-muted-foreground">End Game</Label>
						<p className="font-mono">{streak.end_game_id}</p>
					</div>
					<div>
						<Label className="text-xs text-muted-foreground">Duration</Label>
						<p className="flex items-center gap-1">
							<Clock className="h-3 w-3" />
							{formatDuration(streak.start_time, streak.end_time)}
						</p>
					</div>
					<div>
						<Label className="text-xs text-muted-foreground">Period</Label>
						<p>{new Date(streak.start_time).toLocaleDateString()}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Target className="h-5 w-5" />
						Streak Analysis
					</CardTitle>
					<CardDescription>
						Detect and analyze hot and cold streaks in crash game patterns
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Controls */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						<div className="space-y-2">
							<Label htmlFor="threshold-high">Hot Threshold</Label>
							<div className="flex gap-2">
								<Input
									id="threshold-high"
									value={thresholdHighInput}
									onChange={(e) => setThresholdHighInput(e.target.value)}
									placeholder="5.0"
									className="flex-1"
								/>
								<Button
									onClick={handleThresholdHighChange}
									variant="outline"
									size="sm"
								>
									Apply
								</Button>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="threshold-low">Cold Threshold</Label>
							<div className="flex gap-2">
								<Input
									id="threshold-low"
									value={thresholdLowInput}
									onChange={(e) => setThresholdLowInput(e.target.value)}
									placeholder="2.0"
									className="flex-1"
								/>
								<Button
									onClick={handleThresholdLowChange}
									variant="outline"
									size="sm"
								>
									Apply
								</Button>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="min-length">Min Length</Label>
							<div className="flex gap-2">
								<Input
									id="min-length"
									value={minLengthInput}
									onChange={(e) => setMinLengthInput(e.target.value)}
									placeholder="3"
									className="flex-1"
								/>
								<Button
									onClick={handleMinLengthChange}
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
							{/* Current State */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Current Market State</CardTitle>
									<CardDescription>
										Analysis of the most recent game activity
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div className="flex items-center gap-2">
											<div className={`w-3 h-3 rounded-full ${data.current_state.is_hot_streak ? 'bg-red-500' : 'bg-gray-300'}`} />
											<span className={data.current_state.is_hot_streak ? 'text-red-500 font-semibold' : 'text-muted-foreground'}>
												Hot Streak Active
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className={`w-3 h-3 rounded-full ${data.current_state.is_cold_streak ? 'bg-blue-500' : 'bg-gray-300'}`} />
											<span className={data.current_state.is_cold_streak ? 'text-blue-500 font-semibold' : 'text-muted-foreground'}>
												Cold Streak Active
											</span>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Last Game</Label>
											<p className="font-semibold">
												{data.current_state.last_game_crash_point?.toFixed(2) || 'N/A'}x
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Statistics Summary */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-lg flex items-center gap-2">
											<Flame className="h-5 w-5 text-red-500" />
											Hot Streaks (≥{thresholdHigh}x)
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<Label className="text-xs text-muted-foreground">Total Count</Label>
												<p className="font-semibold text-2xl">{data.hot_streaks.count}</p>
											</div>
											<div>
												<Label className="text-xs text-muted-foreground">Average Length</Label>
												<p className="font-semibold text-2xl">
													{data.hot_streaks.statistics.average_length.toFixed(1)}
												</p>
											</div>
											<div>
												<Label className="text-xs text-muted-foreground">Longest Streak</Label>
												<p className="font-semibold text-xl text-red-500">
													{data.hot_streaks.statistics.longest_streak} games
												</p>
											</div>
											<div>
												<Label className="text-xs text-muted-foreground">Shortest Streak</Label>
												<p className="font-semibold text-xl">
													{data.hot_streaks.statistics.shortest_streak} games
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-lg flex items-center gap-2">
											<Snowflake className="h-5 w-5 text-blue-500" />
											Cold Streaks (≤{thresholdLow}x)
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<Label className="text-xs text-muted-foreground">Total Count</Label>
												<p className="font-semibold text-2xl">{data.cold_streaks.count}</p>
											</div>
											<div>
												<Label className="text-xs text-muted-foreground">Average Length</Label>
												<p className="font-semibold text-2xl">
													{data.cold_streaks.statistics.average_length.toFixed(1)}
												</p>
											</div>
											<div>
												<Label className="text-xs text-muted-foreground">Longest Streak</Label>
												<p className="font-semibold text-xl text-blue-500">
													{data.cold_streaks.statistics.longest_streak} games
												</p>
											</div>
											<div>
												<Label className="text-xs text-muted-foreground">Shortest Streak</Label>
												<p className="font-semibold text-xl">
													{data.cold_streaks.statistics.shortest_streak} games
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Detailed Streaks */}
							<Tabs defaultValue="hot" className="w-full">
								<TabsList className="grid w-full grid-cols-2">
									<TabsTrigger value="hot" className="flex items-center gap-2">
										<Flame className="h-4 w-4" />
										Hot Streaks ({data.hot_streaks.count})
									</TabsTrigger>
									<TabsTrigger value="cold" className="flex items-center gap-2">
										<Snowflake className="h-4 w-4" />
										Cold Streaks ({data.cold_streaks.count})
									</TabsTrigger>
								</TabsList>

								<TabsContent value="hot" className="space-y-4">
									{data.hot_streaks.streaks.length > 0 ? (
										<div className="space-y-4">
											{data.hot_streaks.streaks
												.sort((a, b) => b.length - a.length)
												.slice(0, 10)
												.map((streak, index) => (
												<StreakCard key={`hot-${index}`} streak={streak} type="hot" />
											))}
											{data.hot_streaks.streaks.length > 10 && (
												<Alert>
													<AlertCircle className="h-4 w-4" />
													<AlertDescription>
														Showing top 10 longest hot streaks. Total: {data.hot_streaks.count} streaks found.
													</AlertDescription>
												</Alert>
											)}
										</div>
									) : (
										<Alert>
											<AlertCircle className="h-4 w-4" />
											<AlertDescription>
												No hot streaks found with the current criteria (≥{thresholdHigh}x, min length {minLength}).
											</AlertDescription>
										</Alert>
									)}
								</TabsContent>

								<TabsContent value="cold" className="space-y-4">
									{data.cold_streaks.streaks.length > 0 ? (
										<div className="space-y-4">
											{data.cold_streaks.streaks
												.sort((a, b) => b.length - a.length)
												.slice(0, 10)
												.map((streak, index) => (
												<StreakCard key={`cold-${index}`} streak={streak} type="cold" />
											))}
											{data.cold_streaks.streaks.length > 10 && (
												<Alert>
													<AlertCircle className="h-4 w-4" />
													<AlertDescription>
														Showing top 10 longest cold streaks. Total: {data.cold_streaks.count} streaks found.
													</AlertDescription>
												</Alert>
											)}
										</div>
									) : (
										<Alert>
											<AlertCircle className="h-4 w-4" />
											<AlertDescription>
												No cold streaks found with the current criteria (≤{thresholdLow}x, min length {minLength}).
											</AlertDescription>
										</Alert>
									)}
								</TabsContent>
							</Tabs>
						</div>
					)}

					{isLoading && !data && (
						<div className="flex items-center justify-center py-8">
							<RefreshCw className="h-6 w-6 animate-spin mr-2" />
							<span>Loading streak analysis...</span>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}