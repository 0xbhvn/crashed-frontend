import type { NextConfig } from 'next';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL ||
	'https://crashed-backend-production.up.railway.app/api';

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${API_BASE_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
