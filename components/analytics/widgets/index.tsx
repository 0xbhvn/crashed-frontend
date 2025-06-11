import { IntervalsWidget } from './intervals';
import { OccurrencesTable } from './occurrences';
import { SeriesWidget } from './series';
import { LastGamesTable } from './last-games';
import { StatisticalModelsWidget } from './statistical-models';
import type { ReactNode } from 'react';

/**
 * Wrapper component to ensure proper component mounting and unmounting
 * This helps prevent memory leaks when switching between tabs
 */
export function TabWrapper({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

export { IntervalsWidget, OccurrencesTable, SeriesWidget, LastGamesTable, StatisticalModelsWidget };
