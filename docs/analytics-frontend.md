# Crash Game Analytics Frontend Implementation

## Overview

This document outlines the current implementation of the BC Crash Game Analytics features. The frontend provides a comprehensive analytics dashboard that allows users to visualize game patterns, track performance metrics, and make data-driven decisions.

## Technical Architecture

### Libraries and Dependencies

The project utilizes the following key libraries:

| Category | Libraries |
|----------|-----------|
| **Core** | React, Next.js 15.2.1, TypeScript |
| **UI Components** | ShadCN UI (customized) |
| **Data Visualization** | Recharts (for charts), Tanstack React Table (for data tables) |
| **Data Fetching** | Custom hooks for API integration |
| **Real-time Updates** | react-use-websocket |
| **Form Management** | Native form handling with controlled components |
| **Utilities** | date-fns, clsx/tailwind-merge, zod (for validation) |
| **UI Enhancements** | Framer Motion, Sonner (toast notifications) |
| **Theming** | next-themes |

### Project Structure

```text
/app
  /analytics               # Analytics page routes
    page.tsx               # Main analytics dashboard
    layout.tsx             # Analytics layout with provider
  /api                     # API route handlers
    /analytics             # Analytics API routes
      /last-games          # Last games analysis endpoints
      /occurrences         # Occurrences analysis endpoints
      /series              # Series analysis endpoints
    /games                 # Games data API routes

  /components
  /analytics               # Analytics-specific components
    /core                  # Core analytics components
      AnalyticsCard.tsx    # Card component for analytics widgets
      AnalyticsFilters.tsx # Filters for analytics views
      AnalyticsLayout.tsx  # Layout component for analytics sections
    /widgets               # Widget components
      LastGamesTable.tsx   # Table for "Last Games" analytics
      OccurrencesTable.tsx # Table for "Occurrences" analytics
      SeriesWidget.tsx     # Widget for "Series" analytics
  /games-table             # Game table components
  /ui                      # Shared UI components (ShadCN)
  /hooks                   # Legacy hooks folder

/context
  analytics-context.tsx    # Analytics state management
      
  /hooks
  /analytics               # Analytics-specific hooks
    analytics-types.ts     # Type definitions for analytics
    useBatchLastGames.ts   # Hook for batch last games data
    useOccurrenceAnalysis.ts  # Hook for occurrence analysis
    useRealTimeBatchGames.ts  # Real-time batch games updates
    useRealTimeOccurrences.ts # Real-time occurrences updates
    useRealTimeSeriesAnalysis.ts # Real-time series analysis
    useSeriesAnalysis.ts   # Hook for series analysis
  use-games-data.ts        # Hook for fetching games data
  use-websocket-games.ts   # Hook for WebSocket game updates
  use-clipboard.ts         # Utility hook for clipboard operations

/lib
  api-config.ts            # API configuration
  utils.ts                 # Utility functions

/models
  game.ts                  # Game data models and schemas
    
  /utils
  date-utils.ts            # Date formatting utilities
```

## Feature Implementation

The analytics dashboard is implemented as a single-page application with tab-based navigation between different analytics views. The current implementation includes three main features:

### 1. Last Games Analytics

**Implementation:**

- Located in `components/analytics/widgets/LastGamesTable.tsx`
- Data fetching with `hooks/analytics/useBatchLastGames.ts` and `useRealTimeBatchGames.ts`
- Shows when specific crash points last occurred and how many games have passed since
- Supports real-time updates via WebSocket integration

**API Routes:**

- `/api/analytics/last-games/exact-floors`
- `/api/analytics/last-games/min-crash-points`

### 2. Occurrences Analytics

**Implementation:**

- Located in `components/analytics/widgets/OccurrencesTable.tsx`
- Data fetching with `hooks/analytics/useOccurrenceAnalysis.ts` and `useRealTimeOccurrences.ts`
- Provides statistics on how frequently specific crash points occur
- Supports analysis by game count or time period
- Includes comparison mode to see changes between periods

**API Routes:**

- `/api/analytics/occurrences/exact-floors`
- `/api/analytics/occurrences/exact-floors/time`
- `/api/analytics/occurrences/min-crash-points`
- `/api/analytics/occurrences/min-crash-points/time`

### 3. Series Analytics

**Implementation:**

- Located in `components/analytics/widgets/SeriesWidget.tsx`
- Data fetching with `hooks/analytics/useSeriesAnalysis.ts` and `useRealTimeSeriesAnalysis.ts`
- Analyzes series of games without specific crash points
- Visualizes series on a timeline chart
- Supports sorting by time or series length

**API Routes:**

- `/api/analytics/series/without-min-crash-point/[value]`
- `/api/analytics/series/without-min-crash-point/[value]/time`

### Planned Features

The "Intervals" tab is present in the UI but marked as "coming soon," indicating planned future development.

## Data Management

### State Management

The application uses a combination of:

1. **Context API**: `context/analytics-context.tsx` provides shared state for analytics components
2. **Custom Hooks**: Encapsulate API fetching logic and state management
3. **Component State**: Local state for UI-specific concerns

### Data Fetching Strategy

The application uses a custom data fetching approach:

1. **API Routes**: Next.js API routes act as proxies to the backend API
2. **Custom Hooks**: Encapsulate fetch logic with loading, error, and data states
3. **Real-time Updates**: WebSocket integration for live data updates

### Real-time Updates

Real-time updates are implemented using:

1. **WebSocket Connection**: Via `react-use-websocket`
2. **Custom Hooks**: `useRealTimeBatchGames.ts`, `useRealTimeOccurrences.ts`, etc.
3. **Data Merging**: New data is merged with existing data for smooth UI updates

## UI Components

### Layout

The analytics dashboard uses a responsive layout with:

1. **Tab Navigation**: Switch between different analytics features
2. **Responsive Grid**: Adapts to different screen sizes
3. **Card-based Widgets**: Each analysis type is presented in card containers

### Data Visualization

Data is presented through:

1. **Tables**: Using Tanstack React Table for sortable, filterable data
2. **Charts**: Using Recharts for interactive data visualization
3. **Badges**: Color-coded indicators for data values and trends

### Form Controls

User inputs are managed through:

1. **Filters**: Common filters for crash point values
2. **Tabs**: To switch between analysis types
3. **Inputs**: For numeric values and configuration options

## API Integration

### API Routes

The frontend uses Next.js API routes as proxies to the backend:

1. **Route Handlers**: Located in `/app/api/`
2. **Error Handling**: Consistent error response format
3. **Request Validation**: Input validation before forwarding to backend

### Backend Communication

The application communicates with the backend through:

1. **HTTP Requests**: For data fetching and configuration
2. **WebSocket**: For real-time updates
3. **API Config**: Centralized in `lib/api-config.ts`

## Responsive Design

The application is designed to be responsive across devices:

1. **Fluid Layout**: Adapts to different screen sizes
2. **Mobile-friendly Controls**: Touch-friendly UI elements
3. **Responsive Tables**: Tables adapt to smaller screens

## Future Improvements

Based on the codebase analysis, potential improvements include:

1. **Complete Intervals Feature**: Implement the planned intervals analysis
2. **Enhanced Visualization**: Add more chart types and visualization options
3. **Performance Optimization**: For handling larger datasets
4. **Export Functionality**: Allow exporting analytics data
5. **User Preferences**: Save and load user filter preferences
6. **More Comparison Options**: Additional comparative analysis tools

## Conclusion

The Crash Game Analytics frontend provides a comprehensive set of tools for analyzing game patterns and trends. The modular architecture allows for easy maintenance and extension with new features. The use of modern React patterns and libraries ensures a responsive and interactive user experience.
