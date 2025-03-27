import { IntervalsWidget } from './intervals';
import { OccurrencesTable } from './occurrences';
import { SeriesWidget } from './series';
import { LastGamesTable } from './last-games';
import { useEffect, type ReactNode } from 'react';

/**
 * Wrapper component to ensure proper component mounting and unmounting
 * This helps prevent memory leaks when switching between tabs
 */
export function TabWrapper({ children }: { children: ReactNode }) {
	// Log when tab wrapper mounts/unmounts for debugging
	useEffect(() => {
		console.log('TabWrapper mounted');

		return () => {
			console.log('TabWrapper unmounted');
		};
	}, []);

	return <>{children}</>;
}

export { IntervalsWidget, OccurrencesTable, SeriesWidget, LastGamesTable };
