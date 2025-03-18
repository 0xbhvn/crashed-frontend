# Crash Game Analytics Frontend Implementation Plan

## Overview

This document outlines the frontend implementation plan for the BC Crash Game Analytics features. Based on the backend API documentation, we'll create a comprehensive analytics dashboard that allows users to visualize game patterns, track performance metrics, and make data-driven decisions.

## Goals and User Stories

### Primary Goals

- Provide intuitive visualization of game analytics data
- Enable users to identify patterns in crash points
- Support data exploration across different time frames
- Present analytics in a user-friendly, accessible format

### User Stories

1. As a user, I want to see when the last occurrence of a specific crash point value happened
2. As a user, I want to analyze how frequently certain crash points occur
3. As a user, I want to identify patterns of non-occurrence for specific crash points
4. As a user, I want to examine crash point distributions across different time intervals

## Technical Architecture

### Libraries and Dependencies

We'll utilize the existing tech stack with the following key libraries:

| Category | Libraries |
|----------|-----------|
| **Core** | React, Next.js, TypeScript |
| **UI Components** | ShadCN UI (for consistency with existing UI) |
| **Data Visualization** | Recharts (for charts), React-Table (for data tables) |
| **State Management** | React Query (for API data fetching and caching) |
| **Form Handling** | React Hook Form, Zod (for validation) |
| **Utilities** | date-fns (for date manipulation), clsx/tailwind-merge (for styling) |

### Component Structure

```text
/analytics
  /components
    /core
      AnalyticsLayout.tsx        # Layout wrapper for all analytics pages
      AnalyticsCard.tsx          # Card component for displaying analytics widgets
      AnalyticsFilters.tsx       # Common filters for all analytics (time range, etc.)
      
    /charts
      BarChart.tsx               # Reusable bar chart component
      LineChart.tsx              # Reusable line chart component
      PieChart.tsx               # Reusable pie chart component
      
    /widgets
      LastGamesWidget.tsx        # Widget for "Last Games" (formerly "Last Game With Crash Points")
      OccurrenceWidget.tsx       # Widget for "Crash Point Occurrence Analysis"
      SeriesWidget.tsx           # Widget for "Non-occurrence Series Analysis" 
      IntervalsWidget.tsx        # Widget for "Interval Analysis"
      
    /tables
      AnalyticsTable.tsx         # Base table component for analytics data
      LastGamesTable.tsx         # Table for Last Games data
      OccurrenceTable.tsx        # Table for occurrence data
      SeriesTable.tsx            # Table for series data
      IntervalsTable.tsx         # Table for interval data
      
  /hooks
    useLastGames.ts              # Hook for fetching "Last Games" analytics
    useOccurrenceAnalysis.ts     # Hook for fetching "Occurrence" analytics
    useSeriesAnalysis.ts         # Hook for fetching "Series" analytics
    useIntervalsAnalysis.ts      # Hook for fetching "Intervals" analytics
    
  /pages
    index.tsx                    # Dashboard overview with key metrics
    last-games.tsx               # Page for detailed "Last Games" analytics
    occurrences.tsx              # Page for detailed "Occurrence" analytics
    series.tsx                   # Page for detailed "Series" analytics
    intervals.tsx                # Page for detailed "Intervals" analytics
    
  /utils
    formatters.ts                # Utility functions for formatting data
    calculators.ts               # Utility functions for additional calculations
    constants.ts                 # Constants used across the analytics module
```

## UI/UX Design Approach

### Layout and Navigation

The analytics module will feature:

1. **Dashboard Overview**: A main dashboard displaying key widgets from all categories
2. **Category Pages**: Detailed pages for each analytics category
3. **Navigation**: Tab-based navigation for switching between categories:
   - Last Games (for recent games meeting specific criteria)
   - Occurrences (for frequency analysis)
   - Series (for non-occurrence pattern analysis)
   - Intervals (for time-based distribution analysis)
4. **Filters**: Consistent filter controls for adjusting time ranges and other parameters

### Design System

We'll follow the existing design system using ShadCN components with:

- **Cards**: Each analytics widget will be contained in a card with a consistent header/body structure
- **Tables**: Data-dense tables with sorting, pagination, and expandable rows where appropriate
- **Charts**: Interactive charts with tooltips, legends, and responsive behavior
- **Form Controls**: Consistent form elements for filters and user inputs

### Responsive Considerations

- Desktop: Multi-column grid layout for dashboard widgets
- Tablet: Two-column grid with reorganized widgets
- Mobile: Single column with collapsible sections

## Data Fetching Strategy

We'll implement a robust data fetching strategy using React Query:

```typescript
// Example hook for occurrence analysis
export function useOccurrenceAnalysis(
  params: OccurrenceAnalysisParams,
  options?: UseQueryOptions<OccurrenceAnalysisData>
) {
  return useQuery(
    ['occurrenceAnalysis', params],
    () => fetchOccurrenceAnalysis(params),
    {
      // Default stale time of 5 minutes
      staleTime: 5 * 60 * 1000,
      // Default cache time of 10 minutes
      cacheTime: 10 * 60 * 1000,
      // Default retry configuration
      retry: 2,
      // Allow options override
      ...options,
    }
  );
}
```

### Caching Strategy

- Short stale time (5 minutes) to ensure data is refreshed regularly
- Longer cache time (10 minutes) to prevent unnecessary refetches
- Manual invalidation when user actions should trigger a refresh

### Error Handling

Comprehensive error handling for all API requests:

1. Connection errors: Retry with exponential backoff
2. Server errors (5xx): Display error message with retry button
3. Client errors (4xx): Display appropriate validation errors
4. Empty data: Show empty state components with helpful messaging

## Implementation Phases

### Phase 1: Core Framework (Week 1-2)

1. Set up project structure and base components
2. Implement API integration layer with React Query
3. Create reusable chart and table components
4. Build analytics layout and navigation

### Phase 2: Feature Implementation (Week 3-5)

1. **Last Games Analytics**
   - Implement single and batch query interfaces
   - Create visualization for time since last occurrence
   - Build comparison views for different crash point values

2. **Occurrence Analysis**
   - Implement occurrence statistics for various time frames
   - Create distribution charts for crash point occurrences
   - Build detailed tables with filtering and sorting

3. **Series Analysis**
   - Implement series visualization components
   - Create timeline view of non-occurrence series
   - Build detailed series data tables

4. **Intervals Analysis**
   - Implement time-based and game-set interval components
   - Create charts for visualizing interval patterns
   - Build detailed interval data tables

### Phase 3: Refinement and Optimization (Week 6-7)

1. Performance optimization
   - Implement virtualized lists for large datasets
   - Optimize chart rendering for better performance
   - Add data pre-processing for complex visualizations

2. UX Enhancements
   - Add saved filter presets
   - Implement export functionality (CSV, PNG)
   - Add user onboarding tooltips for complex features

3. Testing and QA
   - Comprehensive testing across browsers and devices
   - User acceptance testing with stakeholders
   - Bug fixes and final refinements

## Component Details

### Analytics Dashboard

The main dashboard will feature:

- Summary cards with key metrics
- Quick filters for time range selection
- Most important visualizations from each category
- Navigation to detailed category pages

### Last Games Widget

This widget will allow users to:

- Input specific crash point values to query
- View the last game that met the criteria
- See how many games have passed since that occurrence
- Compare multiple values side by side

Example UI:

```text
┌─ Last Games Analysis ────────────────────────────┐
│                                                  │
│  [Input: 2.0] [Add Value] [Remove] [Batch]       │
│                                                  │
│  2.0x                                            │
│  Last: Game #12345 (3h 15m ago)                  │
│  Games since: 45                                 │
│                                                  │
│  [View Details]                                  │
└──────────────────────────────────────────────────┘
```

### Occurrence Analysis Widget

This widget will allow users to:

- Select crash point values to analyze
- Choose between game count or time duration modes
- View occurrence statistics with percentage visualization
- Compare multiple values with bar charts

Example UI:

```text
┌─ Crash Point Occurrence Analysis ─────────────┐
│                                               │
│  [Input: 2.0] [Add Value]      [Time ▼]       │
│  [Last: 100 Games ▼]                          │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │         Bar chart visualization         │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  2.0x: 25/100 (25.0%)                         │
│  First: 2024-03-20 10:00                      │
│  Last: 2024-03-20 11:00                       │
│                                               │
│  [View Details]                               │
└───────────────────────────────────────────────┘
```

### Series Analysis Widget

This widget will allow users to:

- Select a crash point threshold value
- View series of games without the specified crash point
- Sort by time or series length
- Visualize series on a timeline

Example UI:

```text
┌─ Non-occurrence Series Analysis ─────────────┐
│                                              │
│  [Input: 3.0]       [Sort by: Length ▼]      │
│  [Last: 1000 Games ▼]                        │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │     Timeline visualization of series   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Longest series without 3.0x or higher:      │
│  - 32 games (Game #1234 to #1265)            │
│  - 28 games (Game #765 to #792)              │
│  - 25 games (Game #432 to #456)              │
│                                              │
│  [View All Series]                           │
└──────────────────────────────────────────────┘
```

### Intervals Analysis Widget

This widget will allow users to:

- Select crash point threshold values
- Choose between time intervals or game set intervals
- View occurrence patterns across intervals
- Identify hot and cold periods

Example UI:

```text
┌─ Intervals Analysis ────────────────────────────┐
│                                                 │
│  [Input: 2.0]        [Interval: 10 min ▼]       │
│  [Last: 24 Hours ▼]                             │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │     Line chart of interval patterns       │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  Peak occurrence:                               │
│  - 13:00-13:10: 6/10 games (60%)                │
│  - 15:30-15:40: 5/8 games (62.5%)               │
│                                                 │
│  [View All Intervals]                           │
└─────────────────────────────────────────────────┘
```

## Testing Strategy

### Unit Testing

- Test all utility functions for data transformation and calculation
- Test hook behavior with mock API responses
- Test component rendering with various data scenarios

### Integration Testing

- Test the interaction between components
- Test API integration with mock servers
- Test navigation and filter interactions

### End-to-End Testing

- Test critical user flows
- Test data visualization accuracy
- Test responsive behavior across device sizes

## Accessibility Considerations

- All components will follow WAI-ARIA guidelines
- Color schemes will maintain sufficient contrast ratios
- Interactive elements will be keyboard navigable
- Charts will have alternative text representations

## Conclusion

This implementation plan provides a comprehensive roadmap for developing the Crash Game Analytics frontend. By following this plan, we will create an intuitive, feature-rich analytics dashboard that helps users extract valuable insights from game data.

The modular approach allows for incremental development and testing, ensuring a robust and maintainable codebase. The use of existing libraries and design system components will ensure consistency with the current application while accelerating the development process.
