import { loadFlash } from 'sveltekit-flash-message/server';
import { savedTable } from '../lib/server/database/drizzle-schemas';
import db from '$lib/server/database/drizzle';
import { desc } from 'drizzle-orm';
import type { Saved } from '$lib/types';

export const load = loadFlash(async (event) => {
	const savedFilms: Saved[] = await db
		.selectDistinct()
		.from(savedTable)
		.orderBy(desc(savedTable.createdAt));

	return { user: event.locals.user, savedFilms };
});
