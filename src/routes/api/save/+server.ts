import { error } from '@sveltejs/kit';
import db from '$lib/server/database/drizzle';
import { savedTable, type Saved } from '../../../lib/server/database/drizzle-schemas';
import { OMDB_APIKEY } from '$env/static/private';

const fetchFullMovie = async (imdbID: string) => {
	const url = `https://www.omdbapi.com/?&apikey=${OMDB_APIKEY}&i=${imdbID}`;
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { userId, imdbId } = await request.json();

	if (!userId || !imdbId) {
		console.error(`Missing value for: ${!userId ? 'userId' : 'imdbId'}`);
		error(400, `Missing value.`);
	}

	const { imdbID, Title, Poster, Actors, Awards, imdbRating } = await fetchFullMovie(imdbId);

	const dbFilm: Saved = {
		imdbId: imdbID,
		userId,
		title: Title,
		poster: Poster,
		actors: Actors,
		awards: Awards,
		imdbRating,
		createdAt: new Date()
	};

	const res = await db.insert(savedTable).values(dbFilm).onConflictDoNothing().returning();
	const film = JSON.stringify(res[0]);
	return new Response(film);
}
