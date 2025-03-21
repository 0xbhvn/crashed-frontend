import { format } from 'date-fns';
import type { HtmlChartConfig } from './chart-html';

// Interface for occurrence data
export interface OccurrenceData {
	count: number;
	percentage: number;
}

// Interface for comparison data
export interface OccurrenceComparison {
	current_period: OccurrenceData;
	previous_period: OccurrenceData;
	comparison: {
		count_diff: number;
		count_percent_change: number;
		percentage_diff: number;
	};
}

// Interface for occurrences HTML export configuration
export interface OccurrencesHtmlConfig {
	selectedType: 'current' | 'unique';
	analyzeBy: 'games' | 'time';
	limit: number;
	hours: number;
	showComparison: boolean;
	occurrencesData:
		| Record<
				string,
				{
					current?:
						| OccurrenceData
						| OccurrenceComparison
						| undefined
						| null;
					unique?:
						| OccurrenceData
						| OccurrenceComparison
						| undefined
						| null;
				}
		  >
		| null
		| undefined;
	pointsToShow: number[];
}

/**
 * Generate HTML chart configuration for occurrences data
 */
export function generateOccurrencesHtmlConfig(
	config: OccurrencesHtmlConfig
): HtmlChartConfig {
	const {
		selectedType,
		analyzeBy,
		limit,
		hours,
		showComparison,
		occurrencesData,
		pointsToShow,
	} = config;

	// Utility functions copied from component
	const isComparisonData = (data: unknown): data is OccurrenceComparison => {
		return (
			data !== null &&
			typeof data === 'object' &&
			'current_period' in data &&
			'comparison' in data &&
			'previous_period' in data
		);
	};

	const getPercentageBadgeColor = (
		percentage: number,
		point: number,
		type: 'current' | 'unique'
	) => {
		if (type === 'unique') {
			return 'blue';
		}

		const threshold = 100 / point;
		if (percentage < threshold) {
			return 'low';
		}
		if (Math.abs(percentage - threshold) < 0.05) {
			return 'medium';
		}
		return 'high';
	};

	const getComparisonBadgeColor = (changePercent: number) => {
		if (changePercent > 0) {
			return 'high';
		}
		if (changePercent < 0) {
			return 'low';
		}
		return 'neutral';
	};

	const getChangeSymbol = (change: number) => {
		if (change > 0) return '+';
		if (change < 0) return '';
		return '±';
	};

	// Build HTML chart config with custom table rendering
	const htmlConfig: HtmlChartConfig = {
		title: 'Occurrences Analysis',
		subtitle: `Frequency analysis of crash points (${
			selectedType === 'current' ? 'Above Value' : 'Exact Value'
		})`,
		configTable: {
			entries: [
				{
					parameter: 'Analysis Type',
					value:
						selectedType === 'current'
							? 'Above Value'
							: 'Exact Value',
				},
				{
					parameter: 'Analyze By',
					value:
						analyzeBy === 'games'
							? `Games (${limit})`
							: `Hours (${hours})`,
				},
				{
					parameter: 'Comparison Mode',
					value: showComparison ? 'Enabled' : 'Disabled',
				},
			],
		},
		// Custom HTML structure for visualization
		customHtml: `
      <style>
        .occurrences-table {
          border-collapse: collapse;
          width: 100%;
          margin: 20px 0;
          font-size: 14px;
        }
        .occurrences-table th, .occurrences-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        .occurrences-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .percent-badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 12px;
        }
        .percent-badge.high {
          background-color: rgba(34, 197, 94, 0.2);
          color: rgb(22, 101, 52);
        }
        .percent-badge.medium {
          background-color: rgba(234, 179, 8, 0.2);
          color: rgb(113, 63, 18);
        }
        .percent-badge.low {
          background-color: rgba(239, 68, 68, 0.2);
          color: rgb(153, 27, 27);
        }
        .percent-badge.blue {
          background-color: rgba(59, 130, 246, 0.2);
          color: rgb(30, 58, 138);
        }
        .percent-badge.neutral {
          background-color: rgba(107, 114, 128, 0.2);
          color: rgb(31, 41, 55);
        }
        .change-icon {
          display: inline-block;
          width: 0;
          height: 0;
          margin-right: 4px;
        }
        .change-icon.up {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 6px solid currentColor;
        }
        .change-icon.down {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 6px solid currentColor;
        }
        .change-icon.neutral {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 3px solid currentColor;
          border-top: 3px solid currentColor;
          height: 3px;
        }
      </style>
      <table class="occurrences-table">
        <thead>
          <tr>
            <th>Crash Point</th>
            <th>Occurrences</th>
            ${showComparison ? '<th>Change</th>' : ''}
            <th>Percentage</th>
            ${
				showComparison
					? `<th>${
							analyzeBy === 'games' ? '% Change' : '% Diff'
					  }</th>`
					: ''
			}
          </tr>
        </thead>
        <tbody>
          ${pointsToShow
				.map((point) => {
					// Format the key to match exactly what the API returns (with decimal)
					const pointKey =
						point === Math.floor(point)
							? `${point}.0`
							: point.toString();

					// Get the data for the selected type (current or unique)
					const dataItem =
						occurrencesData?.[pointKey]?.[selectedType];

					if (!dataItem) {
						return `
                <tr>
                  <td>${
						selectedType === 'current'
							? `≥ ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
							: `= ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
					}</td>
                  <td>0</td>
                  ${showComparison ? '<td>-</td>' : ''}
                  <td><span class="percent-badge ${getPercentageBadgeColor(
						0,
						point,
						selectedType
					)}">0.00%</span></td>
                  ${showComparison ? '<td>-</td>' : ''}
                </tr>
              `;
					}

					// Comparison data handling
					if (isComparisonData(dataItem)) {
						const currentData = dataItem.current_period;
						const comparison = dataItem.comparison;
						const changePercent =
							analyzeBy === 'games'
								? comparison.count_percent_change
								: comparison.percentage_diff;

						let changeIconClass = 'neutral';
						if (changePercent > 0) changeIconClass = 'up';
						else if (changePercent < 0) changeIconClass = 'down';

						return `
                <tr>
                  <td>${
						selectedType === 'current'
							? `≥ ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
							: `= ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
					}</td>
                  <td>${currentData.count}</td>
                  ${
						showComparison
							? `
                    <td>
                      <span class="percent-badge ${getComparisonBadgeColor(
							comparison.count_diff
						)}">
                        ${getChangeSymbol(comparison.count_diff)}${
									comparison.count_diff
							  }
                      </span>
                    </td>
                  `
							: ''
					}
                  <td>
                    <span class="percent-badge ${getPercentageBadgeColor(
						currentData.percentage,
						point,
						selectedType
					)}">
                      ${currentData.percentage.toFixed(2)}%
                    </span>
                  </td>
                  ${
						showComparison
							? `
                    <td>
                      <span class="percent-badge ${getComparisonBadgeColor(
							changePercent
						)}">
                        <span class="change-icon ${changeIconClass}"></span>
                        ${Math.abs(changePercent).toFixed(2)}%
                      </span>
                    </td>
                  `
							: ''
					}
                </tr>
              `;
					}

					// Regular data handling (non-comparison)
					const count = dataItem?.count ?? 0;
					const percentage = dataItem?.percentage ?? 0;

					return `
              <tr>
                <td>${
					selectedType === 'current'
						? `≥ ${point}${point === Math.floor(point) ? '.0' : ''}`
						: `= ${point}${point === Math.floor(point) ? '.0' : ''}`
				}</td>
                <td>${count}</td>
                ${showComparison ? '<td>-</td>' : ''}
                <td>
                  <span class="percent-badge ${getPercentageBadgeColor(
						percentage,
						point,
						selectedType
					)}">
                    ${percentage.toFixed(2)}%
                  </span>
                </td>
                ${showComparison ? '<td>-</td>' : ''}
              </tr>
            `;
				})
				.join('')}
        </tbody>
      </table>
    `,
		// Include a data table for the raw data
		dataTable: {
			columns: [
				{ header: 'Crash Point', key: 'crashPoint' },
				{ header: 'Occurrences', key: 'occurrences' },
				...(showComparison
					? [{ header: 'Change', key: 'change' }]
					: []),
				{ header: 'Percentage', key: 'percentage' },
				...(showComparison
					? [
							{
								header:
									analyzeBy === 'games'
										? '% Change'
										: '% Diff',
								key: 'percentChange',
							},
					  ]
					: []),
			],
			data: pointsToShow.map((point) => {
				const pointKey =
					point === Math.floor(point)
						? `${point}.0`
						: point.toString();
				const dataItem = occurrencesData?.[pointKey]?.[selectedType];

				if (!dataItem) {
					return {
						crashPoint:
							selectedType === 'current'
								? `≥ ${point}${
										point === Math.floor(point) ? '.0' : ''
								  }`
								: `= ${point}${
										point === Math.floor(point) ? '.0' : ''
								  }`,
						occurrences: 0,
						...(showComparison ? { change: '-' } : {}),
						percentage: '0.00%',
						...(showComparison ? { percentChange: '-' } : {}),
					};
				}

				if (isComparisonData(dataItem)) {
					const currentData = dataItem.current_period;
					const comparison = dataItem.comparison;

					return {
						crashPoint:
							selectedType === 'current'
								? `≥ ${point}${
										point === Math.floor(point) ? '.0' : ''
								  }`
								: `= ${point}${
										point === Math.floor(point) ? '.0' : ''
								  }`,
						occurrences: currentData.count,
						...(showComparison
							? {
									change: `${getChangeSymbol(
										comparison.count_diff
									)}${comparison.count_diff}`,
							  }
							: {}),
						percentage: `${currentData.percentage.toFixed(2)}%`,
						...(showComparison
							? {
									percentChange: `${getChangeSymbol(
										analyzeBy === 'games'
											? comparison.count_percent_change
											: comparison.percentage_diff
									)}${Math.abs(
										analyzeBy === 'games'
											? comparison.count_percent_change
											: comparison.percentage_diff
									).toFixed(2)}%`,
							  }
							: {}),
					};
				}

				const count = dataItem?.count ?? 0;
				const percentage = dataItem?.percentage ?? 0;

				return {
					crashPoint:
						selectedType === 'current'
							? `≥ ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
							: `= ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`,
					occurrences: count,
					...(showComparison ? { change: '-' } : {}),
					percentage: `${percentage.toFixed(2)}%`,
					...(showComparison ? { percentChange: '-' } : {}),
				};
			}),
		},
		fileName: `occurrences_analysis_${format(
			new Date(),
			'yyyyMMdd_HHmmss'
		)}.html`,
	};

	return htmlConfig;
}
