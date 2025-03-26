'use client';

import { useState } from 'react';
import type { Game } from '@/models/game';
import { calculateDuration, isValidDate } from '@/utils/date-utils';
import type { Row } from '@tanstack/react-table';
import { toast } from 'sonner';

export function useClipboard() {
	const [copySuccess, setCopySuccess] = useState(false);

	// Function to safely copy table data to clipboard
	const copyTableDataToClipboard = (rows: Row<Game>[]) => {
		if (!rows.length) return;

		try {
			// Format visible data for Google Sheets (TSV format)
			const visibleData = rows
				.map((row) => {
					// Get cell values for each visible column
					return row
						.getVisibleCells()
						.map((cell) => {
							try {
								// Get raw value when possible
								const column = cell.column.id;
								const rawValue =
									row.original?.[column as keyof Game];

								// For formatted values, use appropriate conversions
								if (column === 'crashPoint') {
									return typeof rawValue === 'number' &&
										Number.isFinite(rawValue)
										? String(rawValue)
										: '';
								}

								// For duration column (calculate from the raw dates)
								if (column === 'endTime') {
									const beginTime = row.original?.beginTime;
									return calculateDuration(
										rawValue as string | undefined,
										beginTime as string | undefined
									);
								}

								if (column === 'beginTime') {
									return isValidDate(
										rawValue as string | undefined
									)
										? String(rawValue)
										: '';
								}

								// Default case for other columns
								return String(rawValue ?? '');
							} catch {
								return 'Error';
							}
						})
						.join('\t'); // Tab separated for spreadsheet compatibility
				})
				.join('\n'); // New line for each row

			// Copy to clipboard
			navigator.clipboard
				.writeText(visibleData)
				.then(() => {
					// Set copy success state for button UI feedback
					setCopySuccess(true);

					// Show a toast notification
					toast.success('Data copied to clipboard', {
						description: `${rows.length} rows copied to clipboard`,
						duration: 2000,
					});

					// Reset after 2 seconds
					setTimeout(() => setCopySuccess(false), 2000);
				})
				.catch(() => {
					// Show error toast
					toast.error('Failed to copy data', {
						description: 'Please try again',
					});
				});
		} catch {
			// Show error toast
			toast.error('Error copying data', {
				description: 'An unexpected error occurred',
			});
		}
	};

	return {
		copySuccess,
		copyTableDataToClipboard,
	};
}
