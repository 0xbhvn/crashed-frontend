'use client';

import { useCallback, useEffect, useState } from 'react';
import { getApiHeaders } from '@/lib/api-config';

export interface SeriesData {
	start_game_id: string;
	end_game_id: string;
	start_time: string;
	end_time: string;
	length: number;
	follow_streak?: {
		count: number;
		games: {
			game_id: string;
			crash_point: number;
			time: string;
		}[];
	};
}

export interface SeriesAnalysisResponse {
	status: 'success' | 'error';
	data: SeriesData[];
	message?: string;
}

interface UseSeriesAnalysisProps {
	value: number;
	analyzeBy: 'games' | 'time';
	limit?: number;
	hours?: number;
	sortBy?: 'time' | 'length';
}

export function useSeriesAnalysis({
	value,
	analyzeBy = 'games',
	limit = 1000,
	hours = 24,
	sortBy = 'time',
}: UseSeriesAnalysisProps) {
	const [data, setData] = useState<SeriesData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	// Ensure component is mounted before making requests
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const fetchData = useCallback(async () => {
		// Don't fetch if not mounted (prevents SSR/hydration issues)
		if (!isMounted) {
			console.log('[useSeriesAnalysis] Skipping fetch - not mounted yet');
			return;
		}

		setIsLoading(true);
		setError(null);
		try {
			// Determine endpoint based on analysis type
			const baseEndpoint = `/api/analytics/series/without-min-crash-point/${value}`;
			const endpoint =
				analyzeBy === 'games' ? baseEndpoint : `${baseEndpoint}/time`;

			// Set query parameters based on analysis type
			const queryParams = new URLSearchParams();
			if (analyzeBy === 'games') {
				queryParams.append('limit', limit.toString());
			} else {
				queryParams.append('hours', hours.toString());
			}
			queryParams.append('sort_by', sortBy);

			// Prepare headers - only include timezone for time-based queries
			const headers = { ...getApiHeaders() } as Record<string, string>;
			if (analyzeBy === 'time') {
				headers['X-Timezone'] = 'Asia/Kolkata'; // Use the user's timezone or a default
			}

			// Log the full URL for debugging
			const fullUrl = `${endpoint}?${queryParams.toString()}`;
			console.log('[useSeriesAnalysis] Fetching from:', fullUrl);
			console.log('[useSeriesAnalysis] Headers:', headers);

			// Add timeout to prevent hanging requests
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

			try {
				// Call the API
				const response = await fetch(fullUrl, {
					method: 'GET',
					headers,
					cache: 'no-store',
					signal: controller.signal,
				});

				clearTimeout(timeoutId);

				// Log response details for debugging
				console.log(
					'[useSeriesAnalysis] Response status:',
					response.status
				);
				console.log('[useSeriesAnalysis] Response ok:', response.ok);

				// Check for non-OK responses
				if (!response.ok) {
					const errorText = await response.text();
					console.error(
						'[useSeriesAnalysis] API Error Response:',
						errorText
					);
					throw new Error(
						`API responded with status: ${response.status} - ${errorText}`
					);
				}

				// Parse response
				const responseData: SeriesAnalysisResponse =
					await response.json();
				console.log('[useSeriesAnalysis] Response data:', responseData);

				// Check for error status in the response
				if (responseData.status === 'error') {
					throw new Error(
						responseData.message || 'Error in series analysis data'
					);
				}

				// Verify data structure and handle potential changes in API response
				if (responseData.data) {
					// Check if it's an array as expected (old structure)
					if (Array.isArray(responseData.data)) {
						console.log(
							'[useSeriesAnalysis] Data is array, length:',
							responseData.data.length
						);
						setData(responseData.data);
					} else {
						// New API structure - data.data is now an object with arrays inside
						if (
							typeof responseData.data === 'object' &&
							responseData.data !== null
						) {
							// Look for potential array fields within the data object
							const potentialArrayFields = Object.values(
								responseData.data
							).filter((value) => Array.isArray(value));

							if (
								potentialArrayFields.length > 0 &&
								Array.isArray(potentialArrayFields[0])
							) {
								// Use the first array found as our data
								console.log(
									'[useSeriesAnalysis] Using nested array, length:',
									potentialArrayFields[0].length
								);
								setData(
									potentialArrayFields[0] as SeriesData[]
								);
							} else {
								// Set empty array if we can't find suitable data
								console.warn(
									'[useSeriesAnalysis] No array found in nested data structure'
								);
								setData([]);
							}
						} else {
							// Set empty array as fallback
							console.warn(
								'[useSeriesAnalysis] Data is not object'
							);
							setData([]);
						}
					}
				} else {
					// Set empty array if data is missing
					console.warn(
						'[useSeriesAnalysis] No data property in response'
					);
					setData([]);
				}
			} catch (fetchError) {
				clearTimeout(timeoutId);

				// Handle specific fetch errors
				if (fetchError instanceof Error) {
					if (fetchError.name === 'AbortError') {
						throw new Error(
							'Request timed out after 30 seconds. The API might be slow or unresponsive.'
						);
					}
					if (fetchError.message.includes('Failed to fetch')) {
						throw new Error(
							'Network error: Could not connect to the API. Please check your internet connection and try again.'
						);
					}
				}
				throw fetchError;
			}
		} catch (err) {
			console.error('[useSeriesAnalysis] API request failed:', err);

			// Create user-friendly error messages
			let errorMessage = 'Failed to fetch series analysis data';

			if (err instanceof Error) {
				if (
					err.message.includes('timeout') ||
					err.message.includes('timed out')
				) {
					errorMessage =
						'Request timed out. The server might be busy. Please try again.';
				} else if (
					err.message.includes('Network error') ||
					err.message.includes('Failed to fetch')
				) {
					errorMessage =
						'Network connection error. Please check your internet connection and try again.';
				} else if (err.message.includes('500')) {
					errorMessage =
						'Server error. The API service might be temporarily unavailable.';
				} else if (err.message.includes('404')) {
					errorMessage =
						'API endpoint not found. Please contact support.';
				} else {
					errorMessage = err.message;
				}
			}

			setError(new Error(errorMessage));
		} finally {
			setIsLoading(false);
		}
	}, [value, analyzeBy, limit, hours, sortBy, isMounted]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, isLoading, error, fetchData, refreshData: fetchData };
}
