'use client';

import React from 'react';
import { GamesTable } from '@/components/games-table';

export default function GamesTableWrapper() {
	return (
		<GamesTable
			initialPage={1}
			initialPerPage={25}
		/>
	);
}
