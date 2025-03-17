'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalytics } from '@/context/analytics-context';

interface AnalyticsFilters {
	crashPoint?: number;
	timeRange: string;
	gameCount: string;
}

interface AnalyticsFiltersProps {
	onFilterChange?: (filters: AnalyticsFilters) => void;
	className?: string;
}

const CRASH_POINTS = ['2.0', '3.0', '4.0', '5.0', '10.0'];

export function AnalyticsFilters({
	onFilterChange,
	className,
}: AnalyticsFiltersProps) {
	const { setCrashPoint } = useAnalytics();

	const handleCrashPointChange = (value: string) => {
		const numValue = Number.parseFloat(value);
		setCrashPoint(numValue);
		onFilterChange?.({
			crashPoint: numValue,
			timeRange: '24h',
			gameCount: '100',
		});
	};

	const handleTimeRangeChange = (value: string) => {
		onFilterChange?.({
			crashPoint: undefined,
			timeRange: value,
			gameCount: '100',
		});
	};

	const handleGameCountChange = (value: string) => {
		onFilterChange?.({
			crashPoint: undefined,
			timeRange: '24h',
			gameCount: value,
		});
	};

	return (
		<Card className={className}>
			<CardContent className="flex flex-wrap gap-4 p-4">
				<div className="flex flex-col gap-1.5">
					<span className="text-sm font-medium">Crash Point</span>
					<Tabs
						defaultValue="2.0"
						onValueChange={handleCrashPointChange}
						aria-label="Select crash point"
					>
						<TabsList className="grid grid-cols-5 w-[300px]">
							{CRASH_POINTS.map((point) => (
								<TabsTrigger
									key={point}
									value={point}
								>
									{point}x
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>

				<div className="flex flex-col gap-1.5">
					<label
						className="text-sm font-medium"
						htmlFor="time-range"
					>
						Time Range
					</label>
					<Select
						defaultValue="24h"
						onValueChange={handleTimeRangeChange}
					>
						<SelectTrigger
							id="time-range"
							className="w-28"
						>
							<SelectValue placeholder="Select range" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1h">Last Hour</SelectItem>
							<SelectItem value="6h">Last 6 Hours</SelectItem>
							<SelectItem value="24h">Last 24 Hours</SelectItem>
							<SelectItem value="7d">Last 7 Days</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-col gap-1.5">
					<label
						className="text-sm font-medium"
						htmlFor="game-count"
					>
						Game Count
					</label>
					<Select
						defaultValue="100"
						onValueChange={handleGameCountChange}
					>
						<SelectTrigger
							id="game-count"
							className="w-28"
						>
							<SelectValue placeholder="Game count" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="50">50 Games</SelectItem>
							<SelectItem value="100">100 Games</SelectItem>
							<SelectItem value="500">500 Games</SelectItem>
							<SelectItem value="1000">1000 Games</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
}
