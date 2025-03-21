'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExportButton } from '@/components/export-button';
import type { LastGamesControls } from './types';

export function Controls({
	selectedType,
	setSelectedType,
	getExcelConfig,
	getChartConfig,
}: LastGamesControls) {
	return (
		<div className="flex justify-between mb-4">
			<Tabs
				defaultValue="current"
				value={selectedType}
				onValueChange={(value) =>
					setSelectedType(value as 'current' | 'unique')
				}
			>
				<TabsList className="grid w-[240px] grid-cols-2 bg-muted/50 p-0.5">
					<TabsTrigger
						value="current"
						className="data-[state=active]:bg-black data-[state=active]:text-white"
					>
						Above Value
					</TabsTrigger>
					<TabsTrigger
						value="unique"
						className="data-[state=active]:bg-black data-[state=active]:text-white"
					>
						Exact Value
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{/* Export Button */}
			<ExportButton
				getExcelConfig={getExcelConfig}
				getChartConfig={getChartConfig}
				className="h-8 w-8"
			/>
		</div>
	);
}
