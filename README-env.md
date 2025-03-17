# Environment Configuration

This project uses environment variables to configure connections to backend APIs and other settings. This allows for easy switching between different environments (development, staging, production).

## Available Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for API requests (e.g., "<https://crashed-backend-production.up.railway.app/api>")
- `NEXT_PUBLIC_TIMEZONE`: The timezone to use for date/time formatting (e.g., "Asia/Kolkata")
- `NODE_ENV`: The environment mode (development, production, test)

## Setup

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file to set your desired configuration:

   ```text
   # Production backend
   NEXT_PUBLIC_API_BASE_URL=https://crashed-backend-production.up.railway.app/api
   NEXT_PUBLIC_TIMEZONE=Asia/Kolkata
   NODE_ENV=development
   ```

   For local development with a local backend:

   ```text
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   NEXT_PUBLIC_TIMEZONE=Asia/Kolkata
   NODE_ENV=development
   ```

3. Restart your Next.js development server for changes to take effect:

   ```bash
   npm run dev
   ```

## Environment Files

- `.env`: Local environment variables (not committed to git)
- `.env.example`: Example configuration (committed to git)
- `.env.local`: Override variables locally (not committed to git)
- `.env.development`: Development environment variables (can be committed)
- `.env.production`: Production environment variables (can be committed)

Next.js loads environment variables in the following order:

1. `.env.local`
2. `.env.development` or `.env.production` (depending on `NODE_ENV`)
3. `.env`

## Adding New Environment Variables

When adding new environment variables:

1. Add them to `.env.example` with default or example values
2. Update your local `.env` file
3. Document them in this README
4. Use them in code with `process.env.VARIABLE_NAME`

For client-side access, prefix variables with `NEXT_PUBLIC_`.
