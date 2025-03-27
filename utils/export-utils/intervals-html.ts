import { format } from 'date-fns';
import type { HtmlChartConfig } from './chart-html';

// Interface for interval data
export interface IntervalData {
	count: number;
	percentage: number;
	total_games: number;
}

// Interface for interval grid data
export interface IntervalGridData {
	[hourKey: string]: {
		[intervalKey: string]: IntervalData;
	};
}

// Interface for hour totals
export interface HourTotal {
	count: number;
	totalGames: number;
	percentage: number;
}

// Interface for intervals HTML export configuration
export interface IntervalsHtmlConfig {
	value: number;
	hours: number;
	intervalMinutes: number;
	intervalColumns: number[];
	hourLabels: string[];
	gridData: IntervalGridData;
	hourTotals: Record<string, HourTotal>;
	formatHourLabel: (hourKey: string) => string;
	subtitle?: string; // Optional custom subtitle
}

/**
 * Generate HTML chart configuration for intervals data
 */
export function generateIntervalsHtmlConfig(
	config: IntervalsHtmlConfig
): HtmlChartConfig {
	const {
		value,
		hours,
		intervalMinutes,
		intervalColumns,
		hourLabels,
		gridData,
		hourTotals,
		formatHourLabel,
		subtitle,
	} = config;

	// Build HTML chart config with custom heatmap rendering
	const htmlConfig: HtmlChartConfig = {
		title: `Intervals Analysis for Crash Point ${value}x`,
		subtitle:
			subtitle ||
			`Games with crash point below ${value}x by time interval`,
		configTable: {
			entries: [
				{ parameter: 'Crash Point', value },
				{ parameter: 'Hours', value: hours },
				{ parameter: 'Interval (minutes)', value: intervalMinutes },
			],
		},
		// Custom HTML structure for visualization
		customHtml: `
            <style>
                .intervals-heatmap {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 20px 0;
                    font-size: 14px;
                }
                .intervals-heatmap th, .intervals-heatmap td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: center;
                }
                .intervals-heatmap th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .intervals-heatmap .hour-total {
                    background-color: #f8f8f8;
                    font-weight: bold;
                }
                .cell-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .cell-count {
                    font-size: 20px;
                    font-weight: 500;
                }
                .cell-percentage {
                    margin: 4px 0;
                }
                .percentage-badge {
                    display: inline-block;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 12px;
                }
                .percentage-badge.high {
                    background-color: rgba(34, 197, 94, 0.2);
                    color: rgb(22, 101, 52);
                }
                .percentage-badge.medium {
                    background-color: rgba(234, 179, 8, 0.2);
                    color: rgb(113, 63, 18);
                }
                .percentage-badge.low {
                    background-color: rgba(239, 68, 68, 0.2);
                    color: rgb(153, 27, 27);
                }
                .cell-total {
                    font-size: 11px;
                    color: #666;
                }
            </style>
            <div class="heatmap-container">
                <table class="intervals-heatmap">
                    <thead>
                        <tr>
                            <th>Hour</th>
                            ${intervalColumns
								.map((startMinute) => {
									const endMinute =
										startMinute + intervalMinutes;
									return `<th>${startMinute}-${endMinute}</th>`;
								})
								.join('')}
                            <th class="hour-total">Hour Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${hourLabels
							.map((hourKey) => {
								const hourData = gridData[hourKey];
								const hourTotal = hourTotals[hourKey];

								return `
                                <tr>
                                    <td>${formatHourLabel(hourKey)}</td>
                                    ${intervalColumns
										.map((startMinute) => {
											const intervalKey = startMinute
												.toString()
												.padStart(2, '0');
											const intervalData =
												hourData?.[intervalKey];

											if (!intervalData) {
												return '<td>-</td>';
											}

											// Get badge class based on percentage
											let badgeClass = 'medium';
											const borderlinePercentage =
												100 / value;

											if (
												Math.abs(
													intervalData.percentage -
														borderlinePercentage
												) < 1
											) {
												badgeClass = 'medium';
											} else if (
												intervalData.percentage <
												borderlinePercentage
											) {
												badgeClass = 'low';
											} else {
												badgeClass = 'high';
											}

											return `
                                            <td>
                                                <div class="cell-content">
                                                    <div class="cell-count">${
														intervalData.count
													}</div>
                                                    <div class="cell-percentage">
                                                        <span class="percentage-badge ${badgeClass}">${intervalData.percentage.toFixed(
												1
											)}%</span>
                                                    </div>
                                                    <div class="cell-total">${
														intervalData.total_games
													}</div>
                                                </div>
                                            </td>
                                        `;
										})
										.join('')}
                                    <td class="hour-total">
                                        ${
											hourTotal
												? `
                                            <div class="cell-content">
                                                <div class="cell-count">${
													hourTotal.count
												}</div>
                                                <div class="cell-percentage">
                                                    ${(() => {
														// Get badge class for hour total
														let badgeClass =
															'medium';
														const borderlinePercentage =
															100 / value;

														if (
															Math.abs(
																hourTotal.percentage -
																	borderlinePercentage
															) < 1
														) {
															badgeClass =
																'medium';
														} else if (
															hourTotal.percentage <
															borderlinePercentage
														) {
															badgeClass = 'low';
														} else {
															badgeClass = 'high';
														}

														return `<span class="percentage-badge ${badgeClass}">${hourTotal.percentage.toFixed(
															1
														)}%</span>`;
													})()}
                                                </div>
                                                <div class="cell-total">${
													hourTotal.totalGames
												}</div>
                                            </div>
                                        `
												: '-'
										}
                                    </td>
                                </tr>
                            `;
							})
							.join('')}
                    </tbody>
                </table>
            </div>
        `,
		// Include a summary table for the data
		dataTable: {
			columns: [
				{ header: 'Hour', key: 'hour' },
				{ header: 'Count', key: 'count' },
				{
					header: 'Percentage',
					key: 'percentage',
					formatter: (value) =>
						typeof value === 'number'
							? `${value.toFixed(1)}%`
							: '0%',
				},
				{ header: 'Total Games', key: 'totalGames' },
			],
			data: hourLabels.map((hourKey) => {
				const hourTotal = hourTotals[hourKey];
				return {
					hour: formatHourLabel(hourKey),
					count: hourTotal?.count || 0,
					percentage: hourTotal?.percentage || 0,
					totalGames: hourTotal?.totalGames || 0,
				};
			}),
		},
		fileName: `intervals_analysis_${format(
			new Date(),
			'yyyyMMdd_HHmmss'
		)}.html`,
	};

	return htmlConfig;
}
