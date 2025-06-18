# Statistical Models Widget Refactoring Guide

This guide documents the comprehensive refactoring done for the Risk-Adjusted Metrics widget, which should be applied to other statistical model analysis widgets for consistency.

## Table of Contents

1. [File Structure](#file-structure)
2. [UI Components](#ui-components)
3. [Navigation Patterns](#navigation-patterns)
4. [Control Components](#control-components)
5. [Table Styling](#table-styling)
6. [Color Schemes](#color-schemes)
7. [Export Functionality](#export-functionality)
8. [Best Practices](#best-practices)

## File Structure

### Before

```text
risk-adjusted-metrics (contained all logic)
```

### After (Recommended Structure)

```text
risk-adjusted-metrics/
├── index.tsx                      # Export only
├── risk-adjusted-metrics-widget.tsx  # Main widget component
├── controls.tsx                   # Control components
├── types.ts                      # TypeScript type definitions
├── utils.ts                      # Utility functions
├── overview-table.tsx            # Overview tab table
├── risk-metrics-table.tsx        # Risk metrics tab table
├── drawdown-table.tsx           # Drawdown tab table
├── details-table.tsx            # Details tab table
├── excel-export.ts              # Excel export config
└── html-export.ts               # HTML export config
```

### Key Principles

- **index.tsx** should only export the main widget
- **Separate components** for each table/view
- **Dedicated types file** for all TypeScript interfaces
- **Utils file** for shared functions (color calculations, etc.)
- **controls.tsx** (not control-components.tsx) for consistency

## UI Components

### Main Widget Structure

```tsx
// risk-adjusted-metrics-widget.tsx
export function RiskAdjustedMetricsWidget({ className }: BaseWidgetProps) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Risk-Adjusted Performance Metrics
          </CardTitle>
          <CardDescription>
            Concise description without marketing language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RiskAdjustedMetricsControls {...props} />
          {/* Content */}
        </CardContent>
      </Card>
    </div>
  );
}
```

### Key UI Changes Made

1. **Removed disclaimers** - No "historical data" warnings
2. **Simplified descriptions** - Short, functional descriptions
3. **Removed period display** - No dates in Analysis Summary
4. **Consistent spacing** - `space-y-6` for main sections

## Navigation Patterns

### Tab Navigation Style

The tab navigation should match the main analytics navigation style with a black active state:

```tsx
<Tabs defaultValue="first-tab" className="w-full">
  <div className="bg-muted/50 p-0.5 rounded-md">
    <TabsList className="grid w-full grid-cols-[number] bg-transparent">
      <TabsTrigger 
        value="tab-value"
        className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
      >
        Tab Label
      </TabsTrigger>
      {/* More tabs... */}
    </TabsList>
  </div>

  <TabsContent value="tab-value" className="mt-6">
    {/* Content */}
  </TabsContent>
</Tabs>
```

### Key Navigation Principles

1. **Consistent Styling**: Use the same bg-muted/50 wrapper and black active state
2. **Grid Layout**: Use grid with appropriate columns (grid-cols-4, grid-cols-5, etc.)
3. **Active State**: Black background with white text for active tabs
4. **Spacing**: Always use `mt-6` for TabsContent
5. **Transparent TabsList**: Add `bg-transparent` to TabsList to prevent double backgrounds

### Example Implementations

#### Statistical Models Main Navigation

```tsx
<div className="bg-muted/50 p-0.5 rounded-md">
  <TabsList className="grid w-full grid-cols-5 bg-transparent">
    <TabsTrigger 
      value="risk-metrics"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Risk Metrics
    </TabsTrigger>
    <TabsTrigger 
      value="risk-reward"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Risk/Reward
    </TabsTrigger>
    <TabsTrigger 
      value="patterns"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Patterns
    </TabsTrigger>
    <TabsTrigger 
      value="expected-values"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Expected Values
    </TabsTrigger>
    <TabsTrigger 
      value="psychology"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Psychology
    </TabsTrigger>
  </TabsList>
</div>
```

#### Risk-Adjusted Metrics Sub-Navigation

```tsx
<div className="bg-muted/50 p-0.5 rounded-md">
  <TabsList className="grid w-full grid-cols-4 bg-transparent">
    <TabsTrigger 
      value="overview"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Overview
    </TabsTrigger>
    <TabsTrigger 
      value="risk-metrics"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Risk Metrics
    </TabsTrigger>
    <TabsTrigger 
      value="drawdown"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Drawdown
    </TabsTrigger>
    <TabsTrigger 
      value="details"
      className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
    >
      Details
    </TabsTrigger>
  </TabsList>
</div>
```

## Control Components

### Crash Points Input (Multi-Select Style)

```tsx
<div className="flex items-center gap-2">
  <span className="text-sm font-medium">Crash Points</span>
  <div className="flex flex-wrap items-center gap-2 min-h-[32px] px-3 py-1 border rounded-md bg-background">
    {targets.map((target) => (
      <Badge
        key={target}
        variant="secondary"
        className="h-6 px-2 gap-1"
      >
        {target}x
        <button
          onClick={() => handleRemoveTarget(target)}
          className="ml-1 hover:text-destructive focus:outline-none"
        >
          <X className="h-3 w-3" />
        </button>
      </Badge>
    ))}
    <Input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleInputKeyDown}
      onBlur={() => handleAddTarget(inputValue)}
      placeholder=""
      className="border-0 h-6 w-20 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  </div>
</div>
```

### Games Input with Icon

```tsx
<div className="flex items-center gap-2">
  <Input
    type="number"
    value={limitInput}
    onChange={(e) => setLimitInput(e.target.value)}
    onBlur={applyLimitChange}
    onKeyDown={handleKeyDown}
    placeholder="1000"
    className="w-24 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  />
  <Dices className="h-4 w-4 text-muted-foreground" />
</div>
```

### Control Layout Pattern

```tsx
<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
  {/* Crash Points */}
  <div className="flex-1" />
  {/* Games Input */}
  <ExportButton />
</div>
```

## Table Styling

### Consistent Table Structure

```tsx
<div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow className="h-9">
        <TableHead className="px-2 py-1.5">Column</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="h-10 hover:bg-muted/50">
        <TableCell>Content</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

### Table Guidelines

- Use `rounded-md border` wrapper
- Header rows: `h-9`
- Body rows: `h-10 hover:bg-muted/50`
- Padding: `px-2 py-1.5` for headers
- No cards for data display - use tables for consistency

## Color Schemes

### Badge Color Classes

```tsx
// Standard pattern for all badge colors
const colorClasses = {
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
};
```

### Text Color Classes

```tsx
// For colored text (not badges)
const textColors = {
  green: 'text-green-600 dark:text-green-400',
  yellow: 'text-yellow-600 dark:text-yellow-400',
  red: 'text-red-600 dark:text-red-400'
};
```

### Color Logic Examples

```tsx
// Win Rate
if (value > 50) return 'green';
if (value > 30) return 'yellow';
return 'red';

// Sharpe Ratio
if (value > 1) return 'green';
if (value > 0.5) return 'yellow';
return 'red';

// Drawdown (inverse logic)
if (value < 10) return 'green';
if (value < 20) return 'yellow';
return 'red';
```

### Badge Implementation

```tsx
<Badge className={cn('text-xs', getRiskBadgeColor(value, metric))}>
  {value.toFixed(2)}%
</Badge>
```

## Export Functionality

### Separate Export Files

- Keep export logic in separate files
- Import types from local `types.ts`, not from hooks
- Maintain consistent export patterns

### Export File Structure

```tsx
// excel-export.ts
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { YourDataType } from './types';

export function getExcelConfig({ data, ...params }): ExcelExportConfig {
  return {
    fileName: 'your-export-name',
    sheets: [
      // All data tabs
    ]
  };
}
```

## Best Practices

### 1. Component Organization

- One component per file
- Clear, descriptive file names
- Components should have single responsibility

### 2. Type Safety

- All types in `types.ts`
- Export interfaces for reuse
- Use proper TypeScript patterns

### 3. Styling Consistency

- Use Tailwind classes consistently
- Follow dark mode patterns
- Match other analytics widgets

### 4. User Experience

- Auto-apply on blur/Enter (no Apply buttons)
- Clear visual feedback with colors
- Consistent icons (Dices for games)

### 5. Code Patterns

```tsx
// State management for inputs
const [value, setValue] = useState<number>(defaultValue);
const [inputValue, setInputValue] = useState<string>(defaultValue.toString());

// Apply pattern
const applyChange = () => {
  const newValue = parseFloat(inputValue);
  if (!isNaN(newValue) && newValue > 0) {
    setValue(newValue);
  } else {
    setInputValue(value.toString());
  }
};

// Enter key handling
onKeyDown={(e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    applyChange();
  }
}}
```

## Implementation Checklist

When refactoring other statistical model widgets:

- [ ] Create proper file structure
- [ ] Move main logic to `[name]-widget.tsx`
- [ ] Extract controls to `controls.tsx`
- [ ] Create `types.ts` with all interfaces
- [ ] Create `utils.ts` for shared functions
- [ ] Split tables into separate components
- [ ] Update imports to use local types
- [ ] Apply consistent table styling
- [ ] Implement proper color schemes with badges
- [ ] Remove marketing language and disclaimers
- [ ] Add proper dark mode support
- [ ] Ensure auto-apply functionality (no buttons)
- [ ] Use consistent icons (Dices for games)
- [ ] Match control layout patterns
- [ ] Update tab navigation to match analytics nav style (black active state)
- [ ] Use bg-muted/50 wrapper for tab lists
- [ ] Add bg-transparent to TabsList components
- [ ] Create README.md for documentation (optional but recommended)
- [ ] Add proper TypeScript types for chart data
- [ ] Implement responsive grid layouts for cards

## Chart Components

### Chart Types Used

1. **Pie Charts** (Pattern Analysis - Distribution)

   ```tsx
   <PieChart>
     <Pie
       data={data}
       cx="50%"
       cy="50%"
       labelLine={false}
       label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
       outerRadius={150}  // Increased for better visibility
       fill="#8884d8"
       dataKey="value"
     >
   ```

2. **Bar Charts** (Pattern Analysis - Autocorrelation)

   ```tsx
   <BarChart data={data}>
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="lag" />
     <YAxis />
     <Bar dataKey="correlation" />
   </BarChart>
   ```

3. **Radar Charts** (Risk-Reward Profiles)
   - Use relative scaling (0-100) for fair comparison
   - Include explanatory text about scaling
   - Show actual values in tooltips
   - Support multiple strategies on same chart

4. **Radial Bar Charts** (Pattern Analysis - Metrics)

   ```tsx
   <RadialBarChart
     cx="50%"
     cy="50%"
     innerRadius="30%"
     outerRadius="80%"
     barSize={20}
     data={chartData}
     startAngle={90}
     endAngle={-270}
   >
   ```

### Chart Best Practices

- Always include ChartContainer wrapper
- Use ResponsiveContainer for proper sizing
- Implement custom tooltips with detailed information
- Add legends where appropriate
- Use consistent color schemes

## Additional UI Components

### Summary Cards Pattern

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium">Metric Name</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">
        Additional context
      </p>
    </CardContent>
  </Card>
</div>
```

### Analysis Summary Pattern

```tsx
<Card>
  <CardHeader>
    <CardTitle className="text-lg">Analysis Summary</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key metrics */}
      </div>
      <div className="p-4 bg-muted rounded-md">
        <p className="text-sm font-medium">Recommendation</p>
        <p className="text-sm text-muted-foreground mt-1">
          {recommendation}
        </p>
      </div>
    </div>
  </CardContent>
</Card>
```

## Export Enhancements

### Excel Export Features

1. **Multiple Sheets Organization**
   - Summary/Overview sheet first
   - Detailed data sheets
   - Analysis Info sheet last
   - Use descriptive sheet names

2. **Column Configuration**

   ```tsx
   columns: [
     { header: 'Column Name', key: 'dataKey', width: 20 },
   ]
   ```

3. **Auto-filter and Freeze Headers**

   ```tsx
   autoFilter: true,
   freezeHeader: true,
   ```

4. **File Naming Convention**

   ```tsx
   fileName: `widget-name_${params}_${new Date().toISOString().split('T')[0]}`
   ```

### HTML Export Features

1. **Timestamp**

   ```html
   <div style="text-align: right; color: #666; font-size: 0.875em;">
     <p>Generated: ${new Date().toLocaleString()}</p>
   </div>
   ```

2. **Interactive Charts**
   - Include Chart.js charts where applicable
   - Use consistent chart configurations

3. **Responsive Tables**

   ```html
   <div style="overflow-x: auto;">
     <table style="width: 100%; border-collapse: collapse;">
   ```

4. **Color Coding in HTML**
   - Use inline styles for consistency
   - Match UI color logic

## Special Patterns

### Multi-Value Inputs (Pattern Analysis)

For single numeric inputs with labels:

```tsx
<div className="flex items-center gap-2">
  <span className="text-sm font-medium">Z-Score</span>
  <Input
    type="number"
    value={thresholdInput}
    onChange={(e) => onThresholdInputChange(e.target.value)}
    onBlur={applyThresholdChange}
    onKeyDown={handleThresholdKeyDown}
    className="w-20 h-8 text-center"
    min="0.1"
    max="10"
    step="0.1"
  />
</div>
```

### Tab Value Naming

- Use lowercase with hyphens: `risk-metrics`, `risk-reward`
- Match TabsContent value with TabsTrigger value
- Use descriptive names that match the content

### Widget-Specific Features

1. **Pattern Analysis**
   - Z-Score threshold input
   - Distribution renamed from "Clustering"
   - Radial bar chart for pattern metrics
   - Anomaly detection with IQR bounds

2. **Risk-Adjusted Metrics**
   - No README needed (reference implementation)
   - Four-tab layout standard
   - Comprehensive metric coverage

3. **Risk-Reward Profiles**
   - Dynamic radar charts with relative scaling
   - Risk categorization (Low/Medium/High)
   - Efficient frontier visualization
   - Strategy performance profiles

## Examples from Other Widgets

Reference these widgets for patterns:

- **Last Games**: Streak badges, probability colors
- **Occurrences**: Percentage badges, comparison colors
- **Series**: Quartile colors, chart components
- **Intervals**: Grid tables, time-based analysis
- **Risk Adjusted Metrics**: Complete reference implementation
- **Pattern Analysis**: Chart variety, summary cards
- **Risk-Reward Profiles**: Radar charts, categorization

Each widget should maintain its unique functionality while following these consistent UI patterns.

## Current Status & Missing Items

### Completed Widgets

1. **Risk-Adjusted Metrics** ✅
   - Fully refactored reference implementation
   - All patterns documented
   - Export functionality complete

2. **Pattern Analysis** ✅
   - Follows file structure
   - Has README documentation
   - Enhanced exports with charts
   - Tab renamed: "Clustering" → "Distribution"
   - Pie chart size increased (height: 450px, radius: 150)

3. **Risk-Reward Profiles** ✅
   - Follows file structure
   - Has README documentation
   - Radar charts with relative scaling
   - Dynamic range calculation

### Remaining Widgets to Refactor

1. **Expected Values**
   - Needs file structure refactoring
   - Extract components
   - Add export configurations

2. **Market Psychology (Volatility)**
   - Needs complete refactoring
   - Implement consistent patterns
   - Add proper exports

### Common Improvements Made

1. **Export Enhancements**
   - Added timestamps to all HTML exports
   - Added Analysis Info sheets to Excel exports
   - Included interactive charts in HTML exports
   - Proper file naming with dates and parameters

2. **UI Consistency**
   - Standardized tab styling (black active state)
   - Consistent control layouts
   - Proper spacing and padding
   - Dark mode support

3. **Data Visualization**
   - Relative scaling for radar charts
   - Larger pie charts for better visibility
   - Custom tooltips with detailed information
   - Explanatory text for complex visualizations

### Future Enhancements

1. **Performance**
   - Consider virtualization for large tables
   - Optimize re-renders with React.memo
   - Lazy load chart components

2. **Accessibility**
   - Add ARIA labels to charts
   - Keyboard navigation for tabs
   - Screen reader support for data tables

3. **User Experience**
   - Add loading states for chart components
   - Implement error boundaries
   - Add data refresh indicators
   - Consider adding chart zoom/pan features

4. **Export Features**
   - Add PDF export option
   - Include chart images in exports
   - Add custom export templates
   - Batch export functionality

### Code Quality

1. **Type Safety**
   - All widgets now use proper TypeScript types
   - Shared types in individual `types.ts` files
   - No any types or type assertions

2. **Component Structure**
   - Single responsibility principle followed
   - Clear separation of concerns
   - Reusable utility functions

3. **Consistency**
   - Naming conventions standardized
   - File structure patterns consistent
   - Import order maintained

This guide should be updated as new patterns emerge or improvements are made to the statistical models widgets.
