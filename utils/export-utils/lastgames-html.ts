import { format } from 'date-fns';
import type { HtmlChartConfig } from './chart-html';

// Interface for game data
export interface GameData {
	gameId: string;
	crashPoint: number;
	beginTime: string;
}

// Interface for point data
export interface PointData {
	current: number;
	unique: number;
	currentGame?: GameData | null;
	uniqueGame?: GameData | null;
	currentProbability?: number | null;
	uniqueProbability?: number | null;
}

// Interface for last games export configuration
export interface LastGamesHtmlConfig {
	selectedType: 'current' | 'unique';
	batchData: Record<number, PointData>;
	timeAgoMap: Record<number, string>;
	pointsToShow: number[];
}

/**
 * Generate HTML chart configuration for last games data
 */
export function generateLastGamesHtmlConfig(
	config: LastGamesHtmlConfig
): HtmlChartConfig {
	const { selectedType, batchData, timeAgoMap, pointsToShow } = config;

	// Build HTML chart config with custom table rendering
	const htmlConfig: HtmlChartConfig = {
		title: 'Last Games Analysis',
		subtitle: `Games meeting crash point thresholds (${
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
				{ parameter: 'Points Analyzed', value: pointsToShow.length },
			],
		},
		// Custom HTML structure for visualization
		customHtml: `
      <style>
        .lastgames-table {
          border-collapse: collapse;
          width: 100%;
          margin: 20px 0;
          font-size: 14px;
        }
        .lastgames-table th, .lastgames-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        .lastgames-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .streak-badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 12px;
        }
        .streak-badge.high {
          background-color: rgba(34, 197, 94, 0.2);
          color: rgb(22, 101, 52);
        }
        .streak-badge.medium {
          background-color: rgba(234, 179, 8, 0.2);
          color: rgb(113, 63, 18);
        }
        .streak-badge.low {
          background-color: rgba(239, 68, 68, 0.2);
          color: rgb(153, 27, 27);
        }
        .streak-badge.blue {
          background-color: rgba(59, 130, 246, 0.2);
          color: rgb(30, 58, 138);
        }
        .probability-badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 12px;
          border: 1px solid;
        }
        .probability-badge.high {
          background-color: rgba(34, 197, 94, 0.1);
          color: rgb(22, 101, 52);
          border-color: rgba(34, 197, 94, 0.5);
        }
        .probability-badge.medium {
          background-color: rgba(234, 179, 8, 0.1);
          color: rgb(113, 63, 18);
          border-color: rgba(234, 179, 8, 0.5);
        }
        .probability-badge.low {
          background-color: rgba(239, 68, 68, 0.1);
          color: rgb(153, 27, 27);
          border-color: rgba(239, 68, 68, 0.5);
        }
      </style>
      <table class="lastgames-table">
        <thead>
          <tr>
            <th>Crash Point</th>
            <th>Streak Count</th>
            ${selectedType === 'current' ? '<th>Probability</th>' : ''}
            <th>Time Since</th>
            <th>Last Game</th>
            <th>Exact Crash</th>
          </tr>
        </thead>
        <tbody>
          ${pointsToShow
				.map((point) => {
					const pointData = batchData?.[point];
					const streakValue = pointData?.[selectedType] ?? 0;

					// Use the appropriate game data based on selected tab
					const gameData =
						selectedType === 'current'
							? pointData?.currentGame
							: pointData?.uniqueGame;

					// Get probability based on selected type (only for current mode)
					const probability =
						selectedType === 'current'
							? pointData?.currentProbability
							: null;

					const exact = gameData?.crashPoint;

					// Get streak badge color
					let badgeClass = 'blue';
					if (selectedType === 'current') {
						if (streakValue <= point / 2) {
							badgeClass = 'low';
						} else if (streakValue <= point) {
							badgeClass = 'medium';
						} else {
							badgeClass = 'high';
						}
					}

					// Get probability badge color
					let probabilityBadgeClass = 'low';
					if (probability !== undefined && probability !== null) {
						if (probability > 50) {
							probabilityBadgeClass = 'high';
						} else if (probability > 30) {
							probabilityBadgeClass = 'medium';
						}
					}

					// Build probability cell HTML if in current mode
					const probabilityCell =
						selectedType === 'current'
							? `<td>${
									probability !== undefined &&
									probability !== null
										? `<span class="probability-badge ${probabilityBadgeClass}">${probability.toFixed(
												2
										  )}%</span>`
										: '-'
							  }</td>`
							: '';

					return `
              <tr>
                <td>${
					selectedType === 'current'
						? `≥ ${point}${point === Math.floor(point) ? '.0' : ''}`
						: `= ${point}${point === Math.floor(point) ? '.0' : ''}`
				}</td>
                <td><span class="streak-badge ${badgeClass}">${streakValue}</span></td>
                ${probabilityCell}
                <td>${
					!gameData
						? 'No data'
						: timeAgoMap[point] || 'calculating...'
				}</td>
                <td>${!gameData ? '-' : `#${gameData.gameId}`}</td>
                <td>${!gameData ? '-' : `${exact?.toFixed(2)}x`}</td>
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
				{ header: 'Streak Count', key: 'streakCount' },
				...(selectedType === 'current'
					? [{ header: 'Probability', key: 'probability' }]
					: []),
				{ header: 'Time Since', key: 'timeSince' },
				{ header: 'Last Game ID', key: 'lastGameId' },
				{ header: 'Exact Crash', key: 'exactCrash' },
			],
			data: pointsToShow.map((point) => {
				const pointData = batchData?.[point];
				const streakValue = pointData?.[selectedType] ?? 0;
				const gameData =
					selectedType === 'current'
						? pointData?.currentGame
						: pointData?.uniqueGame;
				const probability =
					selectedType === 'current'
						? pointData?.currentProbability
						: null;
				const exact = gameData?.crashPoint;

				const baseData = {
					crashPoint:
						selectedType === 'current'
							? `≥ ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
							: `= ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`,
					streakCount: streakValue,
					timeSince: !gameData
						? 'No data'
						: timeAgoMap[point] || 'calculating...',
					lastGameId: !gameData ? '-' : `#${gameData.gameId}`,
					exactCrash: !gameData ? '-' : `${exact?.toFixed(2)}x`,
				};

				// Add probability only for current mode
				if (selectedType === 'current') {
					return {
						...baseData,
						probability:
							probability !== undefined && probability !== null
								? `${probability.toFixed(2)}%`
								: '-',
					};
				}

				return baseData;
			}),
		},
		fileName: `lastgames_analysis_${format(
			new Date(),
			'yyyyMMdd_HHmmss'
		)}.html`,
	};

	return htmlConfig;
}
