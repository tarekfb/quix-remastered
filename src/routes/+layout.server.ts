import { loadFlash } from 'sveltekit-flash-message/server';
import { savedTable, type Saved } from '../lib/server/database/drizzle-schemas';
import db from '$lib/server/database/drizzle';
import { asc } from 'drizzle-orm';

export const load = loadFlash(async (event) => {
	const savedFilms: Saved[] = await db
		.selectDistinct()
		.from(savedTable)
		.orderBy(asc(savedTable.createdAt));

	return { user: event.locals.user, savedFilms };
});
