import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

// Generic column definition interface
export interface ExcelColumnDefinition {
	header: string;
	key: string;
	width?: number;
	formatter?: (value: unknown) => string | number | Date;
}

// Configuration for Excel export
export interface ExcelExportConfig {
	fileName?: string; // If not provided, will use a timestamp
	creator?: string;
	sheets: ExcelSheetConfig[];
}

// Configuration for a single sheet
export interface ExcelSheetConfig {
	name: string;
	columns: ExcelColumnDefinition[];
	data: Record<string, unknown>[];
	autoFilter?: boolean;
	freezeHeader?: boolean;
}

// Function to export data to Excel
export async function exportToExcel(config: ExcelExportConfig): Promise<void> {
	// Create a new workbook
	const workbook = new ExcelJS.Workbook();
	workbook.creator = config.creator || 'Data Export Tool';
	workbook.lastModifiedBy = config.creator || 'Data Export Tool';
	workbook.created = new Date();
	workbook.modified = new Date();

	// Process each sheet
	for (const sheetConfig of config.sheets) {
		const worksheet = workbook.addWorksheet(sheetConfig.name);

		// Set columns
		worksheet.columns = sheetConfig.columns;

		// Apply header styling
		worksheet.getRow(1).font = { bold: true };
		worksheet.getRow(1).fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFE0E0E0' },
		};

		// Add data rows
		for (const item of sheetConfig.data) {
			const row: Record<string, unknown> = {};

			// Apply formatting if provided
			for (const column of sheetConfig.columns) {
				const value = item[column.key];
				row[column.key] = column.formatter
					? column.formatter(value)
					: value;
			}

			worksheet.addRow(row);
		}

		// Apply auto-filter if requested
		if (sheetConfig.autoFilter) {
			worksheet.autoFilter = {
				from: { row: 1, column: 1 },
				to: { row: 1, column: sheetConfig.columns.length },
			};
		}

		// Freeze header if requested
		if (sheetConfig.freezeHeader) {
			worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
		}
	}

	// Generate file name with timestamp if not provided
	const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
	const fileName = config.fileName || `data_export_${timestamp}.xlsx`;

	// Write to buffer and save
	const buffer = await workbook.xlsx.writeBuffer();
	saveAs(new Blob([buffer]), fileName);

	return;
}
