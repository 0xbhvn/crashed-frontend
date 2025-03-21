'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from 'react';
import type { ReactNode } from 'react';
import { useWebSocketGames } from '@/hooks/useWebsocketGames';
import type { Game } from '@/models/game';

interface AnalyticsContextType {
	crashPoint: number | null;
	setCrashPoint: (value: number | null) => void;
	latestGame: Game | null;
	processedGames: Game[];
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
	undefined
);

interface AnalyticsProviderProps {
	children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
	const [crashPoint, setCrashPoint] = useState<number | null>(null);

	// Connect to the WebSocket for real-time game updates
	const { newGames } = useWebSocketGames();

	// Track the latest game received via websocket
	const [latestGame, setLatestGame] = useState<Game | null>(null);

	// Keep track of all processed games for analysis
	const [processedGames, setProcessedGames] = useState<Game[]>([]);

	// Keep track of last processed game ID to prevent duplicate processing
	const lastProcessedGameIdRef = useRef<string | null>(null);

	// Process new games as they arrive
	useEffect(() => {
		if (newGames.length > 0) {
			// Get the latest game (first in the array)
			const latest = newGames[0];

			// Skip if we've already processed this game
			if (lastProcessedGameIdRef.current === latest.gameId) {
				return;
			}

			// Only log in development when console is open
			if (
				process.env.NODE_ENV === 'development' &&
				typeof window !== 'undefined' &&
				window.console &&
				console.debug
			) {
				console.debug(`WebSocket game received: ${latest.gameId}`);
			}

			// Update latest game state - ensure a new object is created to trigger re-render
			setLatestGame({ ...latest });
			lastProcessedGameIdRef.current = latest.gameId;

			// Add to processed games list
			setProcessedGames((prev) => {
				// Check if game is already in our list to avoid duplicates
				const exists = prev.some(
					(game) => game.gameId === latest.gameId
				);
				if (!exists) {
					return [latest, ...prev.slice(0, 19)]; // Keep only the 20 most recent
				}
				return prev;
			});
		}
	}, [newGames]);

	const value = {
		crashPoint,
		setCrashPoint,
		latestGame,
		processedGames,
	};

	return (
		<AnalyticsContext.Provider value={value}>
			{children}
		</AnalyticsContext.Provider>
	);
}

export function useAnalytics() {
	const context = useContext(AnalyticsContext);
	if (context === undefined) {
		throw new Error(
			'useAnalytics must be used within an AnalyticsProvider'
		);
	}
	return context;
}
