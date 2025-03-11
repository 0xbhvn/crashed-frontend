# Crashed Frontend

A modern web application built with Next.js for displaying and managing crash instances data in a tabular format.

## Project Overview

This application allows users to view and interact with crash instances data through a responsive table interface. It features:

- Paginated data table
- Sorting functionality
- Search/filter capabilities
- Copy to clipboard functionality
- Responsive design

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Component Library**: Custom UI components with Radix UI primitives
- **Table Management**: [TanStack Table](https://tanstack.com/table/latest)
- **Performance Monitoring**: Vercel Analytics and Speed Insights

## Project Structure

```text
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── hooks/            # Custom React hooks
│   ├── ui/               # UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── checkbox.tsx
│   │   ├── pagination.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   └── table-demo.tsx    # Main table component
├── lib/                  # Utility functions
│   └── utils.ts
├── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20.x or later
- pnpm 8.x.x (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd crashed-frontend
```

1. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

1. Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development

### Available Scripts

- `pnpm dev` - Start the development server (with Turbopack)
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com/new), the platform from the creators of Next.js.

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project into Vercel
3. Vercel will detect Next.js automatically and use the optimal build settings

For more details, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TanStack Table Documentation](https://tanstack.com/table/latest/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
