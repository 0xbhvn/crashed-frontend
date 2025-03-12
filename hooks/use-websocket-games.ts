import { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { GameSchema } from '@/models/game';
import type { Game } from '@/models/game';
import { z } from 'zod';
import { toast } from 'sonner';

// Schema for WebSocket message validation - using union instead of discriminatedUnion
const WebSocketMessageSchema = z.union([
	// Connection message
	z.object({
		type: z.literal('connection_established'),
		message: z.string(),
	}),
	// Game update/new game message
	z.object({
		type: z.union([z.literal('new_game'), z.literal('game_update')]),
		data: GameSchema,
	}),
]);

interface UseWebSocketGamesResult {
	newGames: Game[];
	connectionStatus: string;
	clearNewGames: () => void;
}

export function useWebSocketGames(): UseWebSocketGamesResult {
	const [newGames, setNewGames] = useState<Game[]>([]);

	// WebSocket URL from the proxy server
	const socketUrl = 'wss://crashed-proxy-production.up.railway.app/ws';

	// Options for the WebSocket connection
	const { lastMessage, readyState } = useWebSocket(socketUrl, {
		onOpen: () => {
			console.log('WebSocket connection established');
		},
		onError: (event) => {
			console.error('WebSocket error:', event);
			toast.error(
				'WebSocket connection error. Real-time updates may not work.'
			);
		},
		onClose: () => {
			console.log('WebSocket connection closed');
		},
		// Reconnect on connection loss
		shouldReconnect: () => true,
		reconnectAttempts: 10,
		reconnectInterval: 3000,
	});

	// Process incoming WebSocket messages
	useEffect(() => {
		if (lastMessage !== null) {
			try {
				const parsedData = JSON.parse(lastMessage.data);
				const result = WebSocketMessageSchema.safeParse(parsedData);

				if (result.success) {
					const validatedMessage = result.data;

					// Handle message based on type field
					if (validatedMessage.type === 'connection_established') {
						console.log(
							'Connection confirmed:',
							validatedMessage.message
						);
					} else if (
						validatedMessage.type === 'new_game' ||
						validatedMessage.type === 'game_update'
					) {
						console.log(
							`WebSocket received ${validatedMessage.type}:`,
							validatedMessage.data.gameId
						);

						// Add the new game to the list
						setNewGames((prevGames) => {
							// Check if the game already exists in our list
							const gameExists = prevGames.some(
								(game) =>
									game.gameId === validatedMessage.data.gameId
							);

							// If the game doesn't exist, add it to the list
							if (!gameExists) {
								console.log(
									`Adding new game to WebSocket buffer: ${validatedMessage.data.gameId}`
								);
								return [validatedMessage.data, ...prevGames];
							}

							// If the game exists, update it
							console.log(
								`Updating existing game in WebSocket buffer: ${validatedMessage.data.gameId}`
							);
							return prevGames.map((game) =>
								game.gameId === validatedMessage.data.gameId
									? validatedMessage.data
									: game
							);
						});
					} else {
						console.log('Unknown message type:', validatedMessage);
					}
				} else {
					console.warn(
						'Invalid WebSocket message format:',
						parsedData,
						result.error.format()
					);
				}
			} catch (error) {
				console.error('Error processing WebSocket message:', error);
			}
		}
	}, [lastMessage]);

	// Connection status string based on ReadyState
	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Connected',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Disconnected',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState];

	// Function to clear the new games list
	const clearNewGames = useCallback(() => {
		setNewGames([]);
	}, []);

	return {
		newGames,
		connectionStatus,
		clearNewGames,
	};
}
