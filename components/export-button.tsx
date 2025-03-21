import * as React from 'react';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import { exportToExcel } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { generateChartHtml } from '@/utils/export-utils/chart-html';

export interface ExportButtonProps {
	// Function that returns the Excel configuration
	getExcelConfig: () => Promise<ExcelExportConfig> | ExcelExportConfig;

	// Optional function for chart HTML configuration
	getChartConfig?: () => Promise<HtmlChartConfig> | HtmlChartConfig;

	// Button customization options
	buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
	buttonVariant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link';
	buttonLabel?: string;
	className?: string;
}

export function ExportButton({
	getExcelConfig,
	getChartConfig,
	buttonSize = 'icon',
	buttonVariant = 'outline',
	buttonLabel,
	className = 'h-8 w-8',
}: ExportButtonProps) {
	const [isExporting, setIsExporting] = React.useState(false);

	const handleExport = async () => {
		try {
			setIsExporting(true);

			// Get Excel configuration
			const excelConfig = await getExcelConfig();

			// Export Excel file
			await exportToExcel(excelConfig);

			// If chart config is provided, generate HTML chart
			if (getChartConfig) {
				const chartConfig = await getChartConfig();
				generateChartHtml(chartConfig);

				// Notify success with both exports
				toast.success(
					'Export completed! Excel data and HTML charts have been downloaded.'
				);
			} else {
				// Notify success with Excel only
				toast.success('Excel data has been downloaded successfully.');
			}
		} catch (error) {
			console.error('Export failed:', error);
			toast.error('Export failed. Please try again.');
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<Button
			variant={buttonVariant}
			size={buttonSize}
			className={className}
			title="Export to Excel"
			onClick={handleExport}
			disabled={isExporting}
		>
			{isExporting ? (
				<div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
			) : (
				<>
					<DownloadIcon className="h-4 w-4 text-muted-foreground" />
					{buttonLabel && <span className="ml-2">{buttonLabel}</span>}
				</>
			)}
		</Button>
	);
}
