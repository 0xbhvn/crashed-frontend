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

## Examples from Other Widgets

Reference these widgets for patterns:

- **Last Games**: Streak badges, probability colors
- **Occurrences**: Percentage badges, comparison colors
- **Series**: Quartile colors, chart components
- **Intervals**: Grid tables, time-based analysis
- **Risk Adjusted Metrics**: everything

Each widget should maintain its unique functionality while following these consistent UI patterns.
