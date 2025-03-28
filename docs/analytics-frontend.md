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
        /exact-floors      # Exact floor values endpoints
        /min-crash-points  # Minimum crash points endpoints
      /occurrences         # Occurrences analysis endpoints
      /series              # Series analysis endpoints
      /intervals           # Intervals analysis endpoints
    /games                 # Games data API routes
/components
  /analytics               # Analytics-specific components
    /core                  # Core analytics components
      analytics-card.tsx   # Card wrapper for analytics widgets
      crash-point-cards.tsx # Cards displaying crash point stats (ACTIVE DEVELOPMENT)
    /widgets               # Widget components
      /last-games          # Last games components
        data-table.tsx     # Table component for last games
        excel-export.ts    # Excel export functionality
        utils.ts           # Utility functions
      /occurrences         # Occurrences components
        cell-content.tsx   # Cell content renderer
        excel-export.ts    # Excel export functionality
        utils.ts           # Utility functions
      /series              # Series components
        series-chart.tsx   # Chart for series visualization
        series-table.tsx   # Table for series data
        excel-export.ts    # Excel export functionality
      /intervals           # Intervals components
        intervals-chart.tsx# Chart for intervals visualization
        intervals-table.tsx# Table for intervals data
        excel-export.ts    # Excel export functionality
      index.tsx            # Export barrel file
  /games-table             # Game table components
  /ui                      # Shared UI components (ShadCN)
  copy-button.tsx          # Copy functionality component
  export-button.tsx        # Export functionality component
  games-table-wrapper.tsx  # Wrapper for games table
  theme-toggle.tsx         # Theme toggle component
  react-scan.tsx           # Component for scanning React components

/context
  analytics-context.tsx    # Context provider for analytics state

/hooks
  /analytics               # Analytics-specific hooks
    /last-games            # Last games hooks
    /occurrences           # Occurrences hooks
    /series                # Series hooks
    /intervals             # Intervals hooks
    index.ts               # Export barrel file
  useGamesData.ts          # Hook for fetching games data
  useWebsocketGames.ts     # Hook for WebSocket game updates
  useClipboard.ts          # Utility hook for clipboard operations
  usePagination.tsx        # Hook for pagination functionality

/utils
  analytics-types.ts       # Type definitions for analytics
  export-utils             # Export utility functions and types
  date-utils.ts            # Date formatting utilities

/models
  game.ts                  # Game data models and schemas
```

## Feature Implementation

The analytics dashboard is implemented as a single-page application with tab-based navigation between different analytics views. The current implementation includes the following features:

### 1. Crash Point Cards (ACTIVE DEVELOPMENT)

**Implementation:**

- Located in `components/analytics/core/crash-point-cards.tsx`
- Displays quick-view cards for selected crash points
- Shows real-time streak counts and last seen information
- Supports dynamic editing of displayed crash points
- Updates time information in real-time
- Color-coded indicators for streak status

### 2. Last Games Analytics

**Implementation:**

- Located in `components/analytics/widgets/last-games/` directory
- Data fetching with hooks in `hooks/analytics/last-games/` directory
- Shows when specific crash points last occurred and how many games have passed since
- Supports real-time updates via WebSocket integration
- Offers toggle between current and unique streak types

**API Routes:**

- `/api/analytics/last-games/exact-floors`
- `/api/analytics/last-games/min-crash-points`

### 3. Occurrences Analytics

**Implementation:**

- Located in `components/analytics/widgets/occurrences/` directory
- Data fetching with hooks in `hooks/analytics/occurrences/` directory
- Provides statistics on how frequently specific crash points occur
- Supports analysis by game count or time period
- Includes comparison mode to see changes between periods

**API Routes:**

- `/api/analytics/occurrences/exact-floors`
- `/api/analytics/occurrences/exact-floors/time`
- `/api/analytics/occurrences/min-crash-points`
- `/api/analytics/occurrences/min-crash-points/time`

### 4. Series Analytics

**Implementation:**

- Located in `components/analytics/widgets/series/` directory
- Data fetching with hooks in `hooks/analytics/series/` directory
- Analyzes series of games without specific crash points
- Visualizes series on a timeline chart
- Supports sorting by time or series length

**API Routes:**

- `/api/analytics/series/without-min-crash-point/[value]`
- `/api/analytics/series/without-min-crash-point/[value]/time`

### 5. Intervals Analytics

**Implementation:**

- Located in `components/analytics/widgets/intervals/` directory
- Data fetching with hooks in `hooks/analytics/intervals/` directory
- Analyzes intervals between games with specific crash points
- Visualizes intervals on a timeline chart
- Supports sorting by time or interval length

**API Routes:**

- `/api/analytics/intervals/min-crash-points/[value]`

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
2. **Custom Hooks**: Organized by feature in the `/hooks/analytics/` directory
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
4. **Cards**: Quick-view cards for important metrics (Crash Point Cards)

### Form Controls

User inputs are managed through:

1. **Filters**: Common filters for crash point values
2. **Tabs**: To switch between analysis types
3. **Inputs**: For numeric values and configuration options
4. **Editable Fields**: Interactive editing of crash point values

## API Integration

### API Routes

The frontend uses Next.js API routes as proxies to the backend:

1. **Route Handlers**: Located in `/app/api/`
2. **Error Handling**: Consistent error response format
3. **Request Validation**: Input validation before forwarding to backend

**Last Games API Routes:**
- `/api/analytics/last-games/exact-floors`
- `/api/analytics/last-games/min-crash-points`

**Occurrences API Routes:**
- `/api/analytics/occurrences/exact-floors`
- `/api/analytics/occurrences/min-crash-points`

**Series API Routes:**
- `/api/analytics/series/without-min-crash-point/[value]`

**Intervals API Routes:**
- `/api/analytics/intervals/min-crash-points/[value]`

### Backend Communication

The application communicates with the backend through:

1. **HTTP Requests**: For data fetching and configuration
2. **WebSocket**: For real-time updates
3. **API Config**: Centralized in `lib/api-config.ts` with:
   - `getApiUrl()`: Constructs full API URLs
   - `getApiHeaders()`: Provides common headers including timezone
   - `getApiHeadersWithoutTimezone()`: Provides headers without timezone

## Responsive Design

The application is designed to be responsive across devices:

1. **Fluid Layout**: Adapts to different screen sizes
2. **Mobile-friendly Controls**: Touch-friendly UI elements
3. **Responsive Tables**: Tables adapt to smaller screens
4. **Flexible Cards**: Card layouts that adjust to available space

## Future Improvements

Based on the codebase analysis, potential improvements include:

1. **Enhanced Crash Point Cards**: Complete and refine the active development
2. **Enhanced Visualization**: Add more chart types and visualization options
3. **Performance Optimization**: For handling larger datasets
4. **Export Functionality**: Allow exporting analytics data
5. **User Preferences**: Save and load user filter preferences
6. **More Comparison Options**: Additional comparative analysis tools
