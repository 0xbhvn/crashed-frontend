import { format } from 'date-fns';
import { saveAs } from 'file-saver';

// Types for chart configurations
export interface ChartDataset {
	label: string;
	data: number[];
	backgroundColor?: string;
	borderColor?: string;
	borderWidth?: number;
}

export interface ChartDefinition {
	id: string;
	title: string;
	type: 'bar' | 'line' | 'pie' | 'doughnut' | 'scatter';
	labels: string[];
	datasets: ChartDataset[];
	xAxisTitle?: string;
	yAxisTitle?: string;
}

export interface TableColumn {
	header: string;
	key: string;
	formatter?: (value: unknown) => string;
}

export interface HtmlChartConfig {
	title: string;
	subtitle?: string;
	fileName?: string;
	configTable?: {
		entries: Array<{ parameter: string; value: string | number | boolean }>;
	};
	charts?: ChartDefinition[];
	customHtml?: string;
	dataTable?: {
		columns: TableColumn[];
		data: Record<string, unknown>[];
	};
}

// Function to generate HTML with interactive charts
export function generateChartHtml(config: HtmlChartConfig): void {
	// Format data for HTML
	let chartScripts = '';
	let chartContainersHtml = '';

	// Process charts if they exist
	if (config.charts && config.charts.length > 0) {
		chartScripts = config.charts
			.map((chart) => {
				return `
    // ${chart.title} Chart
    new Chart(document.getElementById('${chart.id}'), {
      type: '${chart.type}',
      data: {
        labels: ${JSON.stringify(chart.labels)},
        datasets: ${JSON.stringify(chart.datasets)}
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: ${Boolean(chart.yAxisTitle)},
              text: ${chart.yAxisTitle ? `'${chart.yAxisTitle}'` : "''"}
            }
          },
          x: {
            title: {
              display: ${Boolean(chart.xAxisTitle)},
              text: ${chart.xAxisTitle ? `'${chart.xAxisTitle}'` : "''"}
            }
          }
        }
      }
    });
    `;
			})
			.join('\n');

		// Generate chart containers HTML
		chartContainersHtml = config.charts
			.map(
				(chart) => `
    <h2>${chart.title}</h2>
    <div class="chart-container">
      <canvas id="${chart.id}"></canvas>
    </div>
  `
			)
			.join('');
	}

	// Generate config table HTML if provided
	let configTableHtml = '';
	if (config.configTable) {
		configTableHtml = `
    <div class="config-info">
      <h2>Configuration</h2>
      <table>
        <tr><th>Parameter</th><th>Value</th></tr>
        ${config.configTable.entries
			.map(
				(entry) => `
          <tr><td>${entry.parameter}</td><td>${entry.value}</td></tr>
        `
			)
			.join('')}
      </table>
    </div>
    `;
	}

	// Generate data table HTML if provided
	let dataTableHtml = '';
	if (config.dataTable) {
		const dataTable = config.dataTable; // Create local non-null reference
		dataTableHtml = `
    <h2>Data Table</h2>
    <table class="data-table">
      <thead>
        <tr>
          ${dataTable.columns.map((col) => `<th>${col.header}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${dataTable.data
			.map(
				(row) => `
          <tr>
            ${dataTable.columns
				.map((col) => {
					const value = row[col.key];
					return `<td>${
						col.formatter ? col.formatter(value) : String(value)
					}</td>`;
				})
				.join('')}
          </tr>
        `
			)
			.join('')}
      </tbody>
    </table>
    `;
	}

	// Complete HTML template
	const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${config.title}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    .chart-container {
      width: 800px;
      height: 400px;
      margin: 20px auto;
    }
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }
    h1, h2 {
      text-align: center;
      color: #333;
    }
    .config-info {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .config-info table {
      width: 100%;
      border-collapse: collapse;
    }
    .config-info th, .config-info td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .config-info th {
      font-weight: bold;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30px;
    }
    .data-table th, .data-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .data-table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    .data-table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <h1>${config.title}</h1>
  ${
		config.subtitle
			? `<p style="text-align: center;">${config.subtitle}</p>`
			: ''
  }
  
  ${configTableHtml}
  
  ${config.customHtml || ''}
  
  ${chartContainersHtml}
  
  ${dataTableHtml}

  <script>
    ${chartScripts}
  </script>
</body>
</html>
`;

	// Save HTML to file
	const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
	const fileName = config.fileName || `charts_${timestamp}.html`;
	const htmlBlob = new Blob([html], { type: 'text/html' });
	saveAs(htmlBlob, fileName);
}
