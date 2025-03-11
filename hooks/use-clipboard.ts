'use client';

import { useState } from 'react';
import type { Game } from '@/models/game';
import { calculateDuration, isValidDate } from '@/utils/date-utils';
import type { Row } from '@tanstack/react-table';

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
					setCopySuccess(true);
					setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
				})
				.catch((err) => {
					console.error('Failed to copy: ', err);
				});
		} catch (error) {
			console.error('Error copying data to clipboard:', error);
		}
	};

	return {
		copySuccess,
		copyTableDataToClipboard,
	};
}
