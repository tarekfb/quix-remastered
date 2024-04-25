import { error } from '@sveltejs/kit';
import db from '$lib/server/database/drizzle';
import { savedTable, type Saved } from '../../../lib/server/database/drizzle-schemas';
import { and, eq } from 'drizzle-orm';
import { fetchFilmByImdbId } from '$lib/_helpers/films';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { userId, imdbId } = await request.json();

	if (!userId || !imdbId) {
		console.error(`Missing value for: ${!userId ? 'userId' : 'imdbId'}`);
		error(400, `Missing value.`);
	}
	try {
		const { title, poster, actors, awards, imdbRating } = await fetchFilmByImdbId(imdbId);

		const dbFilm: Saved = {
			imdbId,
			userId,
			title,
			poster,
			actors,
			awards,
			imdbRating,
			createdAt: new Date()
		};

		const res = await db.insert(savedTable).values(dbFilm).returning();
		const film = JSON.stringify(res[0]);
		return new Response(film, { status: 200 });
	} catch (err) {
		if (err instanceof Error) {
			if (err.message.includes('duplicate key value violates unique constraint')) {
				console.error(err);
				error(409, 'Film already saved.');
				// return new Response('Film already saved.', { status: 409 });
			}
			console.error(err.message);
			error(500, 'Unexpected error occured');
			// return new Response('Unexpected error occured', { status: 500 });
		} else {
			console.error(err);
			error(500, 'Unexpected error occured');
			// return new Response('Unexpected error occured', { status: 500 });
		}
	}
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ url }) {
	const imdbId = url.searchParams.get('imdbId') ?? '';
	const userId = url.searchParams.get('userId') ?? '';

	if (!userId || !imdbId) {
		console.error(`Missing parameter for: ${!userId ? 'userId' : 'imdbId'}`);
		error(400, `Missing parameter.`);
	}

	try {
		const unsavedFilm = await db
			.delete(savedTable)
			.where(and(eq(savedTable.imdbId, imdbId), eq(savedTable.userId, userId)))
			.returning();

		return new Response(JSON.stringify(unsavedFilm), { status: 200 });
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.message);
			error(500, 'Unexpected error occured');
		} else {
			console.error(err);
			error(500, 'Unexpected error occured');
		}
	}
}
